const contentRouter = require("express").Router();
const db = require("../db");
const jwt = require("jsonwebtoken");
const path = require("path");
const webpush = require("web-push");

const multer = require("multer");
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "./public/post-images/");
  },
  filename: function(req, file, cb) {
    if ( file.mimetype !== "image/jpeg"
      && file.mimetype !== "image/png"
      && file.mimetype !== "image/svg+xml"
      && file.mimetype !== "image/gif" ) {
        return cb(new Error("Wrong file type, only jpgs/jpegs/pngs/svgs/gifs are supported"))
    };

    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
    cb(null, `${file.fieldname}-${uniqueSuffix}${path.extname(file.originalname)}`);
  }
});
const upload = multer({ storage });

contentRouter.get("/", async (req, res, next) => {

  try {
    const allPosts = await db.query("SELECT post.p_id, post.text, post.likes, post.date, p_pics, users.u_id, users.name, users.username, users.imgloc FROM post JOIN users on users.u_id = post.user_id ORDER BY date desc");
  
    const allBlogs = await db.query("SELECT blog.b_id, blog.text, blog.images, blog.likes, blog.date, users.u_id, users.name, users.username, users.imgloc FROM blog JOIN users on users.u_id = blog.user_id ORDER BY date desc");

    const allContent = { 
      blogs: [...allBlogs.rows], 
      posts: [...allPosts.rows]
    };
    res.json(allContent);
  } catch(err) {
    console.error(err);
    next();
  };
});

contentRouter.get("/post/:id", async (req, res, next) => {
  const post_id = parseInt(req.params.id);

  try {
    const post = await db.query("SELECT * FROM post WHERE p_id = $1", [post_id]);

    res.json(post.rows[0]);
  } catch(err) {
    console.error(err);
    next();
  };
})

contentRouter.get("/post/likes/:id", async (req, res, next) => {

  const post_id = parseInt(req.params.id);

  try {

    const usersThatLiked = await db.query("SELECT like_id, date, p_id_fk, users.u_id, users.name, users.username, users.imgloc FROM likes_post_rel JOIN users ON users.u_id = likes_post_rel.u_id_fk WHERE p_id_fk=$1 ORDER BY date DESC", [post_id]);

    res.json(usersThatLiked.rows);
  } catch(err) {
    console.error(err);
    next();
  }
});

contentRouter.get("/post/liked/:id", async (req, res, next) => {
  const post_id = parseInt(req.params.id);
  const { user_id } = req.query;

  try {

    const likedOrNot = await db.query("SELECT COUNT(*) FROM likes_post_rel WHERE p_id_fk = $1 AND u_id_fk = $2", [post_id, user_id]);
    res.json(likedOrNot.rows);

  } catch(err) {
    console.error(err);
    next();
  }
});

contentRouter.post("/post/like/:id", async (req, res, next) => {
  const post_id = parseInt(req.params.id);
  // const { liked } = req.body;
  
  const decodedToken = jwt.verify(req.token, process.env.SECRET);
  if ( !decodedToken ) {
    return res.status(401).json({ error: "Token missing or invalid" });
  };

  try {

    await db.query("INSERT INTO likes_post_rel (p_id_fk, u_id_fk) VALUES ($1, $2)", [post_id, decodedToken.id]);
    await db.query("UPDATE post SET likes = (SELECT COUNT(*) FROM likes_post_rel WHERE p_id_fk = $1) WHERE p_id = $1", [post_id]);
    
    res.json({ success: true });
  } catch(err) {
    console.error(err);
    next();
  }
});

contentRouter.delete("/post/like/:id", async (req, res, next) => {
  const post_id = parseInt(req.params.id);

  const decodedToken = jwt.verify(req.token, process.env.SECRET);
  if ( !decodedToken ) return res.status(401).json({ error: "Token missing or invalid" });
  
  try {
    await db.query("DELETE FROM likes_post_rel WHERE p_id_fk = $1 AND u_id_fk = $2", [post_id, decodedToken.id]);
    await db.query("UPDATE post SET likes = (SELECT COUNT (*) FROM likes_post_rel WHERE p_id_fk = $1) WHERE p_id = $1", [post_id]);

    res.json({ success: true });
  } catch(err) {
    console.error(err);
    next();
  }
})

contentRouter.post("/createPost", upload.array("photos", 10), async (req, res, next) => {

  const decodedToken = jwt.verify(req.token, process.env.SECRET);
  if ( !decodedToken ) {
    return res.status(401).json({ error: "Token missing or invalid" });
  }

  const { postText } = req.body;

  let imgsPath = [];
  if (req.files) {
    req.files.forEach((file, i) => {
      console.log(i);
      imgsPath[i] = `http://localhost:3500/public/post-images/${file.filename}`;
    });
  };

  // const { username, id } = jwt.verify(token, process.env.SECRET, function(err, decoded) {
  //   console.log("Verified");
  // })

  try {
    const doesExist = await db.query("SELECT * FROM USERS WHERE username = $1", [decodedToken.username]);

    if (doesExist.rows.length === 0) return res.status(401).json({ error: "User doesn't exist" });

    const pstId = await db.query("INSERT INTO post (text, likes, user_id, p_pics) VALUES ($1, $2, $3, $4) RETURNING p_id", [postText, 0, decodedToken.id, imgsPath]);
    const resQ = await db.query("SELECT post.p_id, post.text, post.likes, post.date, p_pics, users.u_id, users.name, users.username, users.imgloc FROM post JOIN users on users.u_id = post.user_id WHERE p_id = $1", [pstId.rows[0].p_id]);

    res.json(resQ.rows);

    const userFlwrsSubKeys = await db.query("SELECT sub_endpoint, sub_pub_key, sub_auth_key FROM users JOIN user_followers ON user_followers.u_flwr_id_fk = users.u_id WHERE user_followers.u_id_fk = $1", [decodedToken.id]);

    userFlwrsSubKeys.rows.forEach(userFlwrSubKeys => {

      const subscription = {
        endpoint: userFlwrSubKeys.sub_endpoint,
        keys: {
          p256dh: userFlwrSubKeys.sub_pub_key,
          auth: userFlwrSubKeys.sub_auth_key
        }
      }

      const payload = JSON.stringify({
        title: `New post by ${doesExist.rows[0].name}`,
        icon: doesExist.rows[0].imgloc,
        url: `http://192.168.42.206:3000/post/${pstId.rows[0].p_id}`,
        primaryKey: pstId.rows[0].p_id
      });

      console.log(subscription, payload);
      webpush.sendNotification(subscription, payload)
        .catch(err => {
          console.error(err);
        })
    })
  } catch(err) {
    console.error(err);
    next();
  };
});

// contentRouter.get("/post/comments/:id", async (req, res, next) => {
//   const post_id = parseInt(req.params.id);

//   const 
// })

module.exports = contentRouter;