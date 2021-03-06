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

  let decodedToken = null;
  if (req.token) decodedToken = jwt.verify(req.token, process.env.SECRET);
  
  if (!decodedToken && req.token) return res.status(401).json({ error: "Token missing or invalid" });

  try {
    let allPosts;
    if (decodedToken) {
      allPosts = await db.query("SELECT post.p_id, post.text, (SELECT COUNT(*) FROM likes_post_rel WHERE p_id_fk = post.p_id) as likes, (SELECT TRUE FROM likes_post_rel WHERE p_id_fk = post.p_id AND u_id_fk = $1) AS liked, (SELECT COUNT(*) FROM comments_post_rel WHERE p_id_fk = post.p_id) AS no_comments, (SELECT EXISTS (SELECT TRUE FROM user_followers WHERE u_id_fk = $1 AND u_flwr_id_fk = users.u_id OR u_id_fk = users.u_id AND u_flwr_id_fk = $1)) AS friends, post.date, p_pics, users.u_id, users.name, users.username, users.imgloc FROM post JOIN users on users.u_id = post.user_id ORDER BY date desc", [decodedToken.id]);
    } else {
      allPosts = await db.query("SELECT post.p_id, post.text, (SELECT COUNT(*) FROM likes_post_rel WHERE p_id_fk = post.p_id) as likes, (SELECT COUNT(*) FROM comments_post_rel WHERE p_id_fk = post.p_id) as no_comments, post.date, p_pics, users.u_id, users.name, users.username, users.imgloc FROM post JOIN users on users.u_id = post.user_id ORDER BY date desc");
    }
  
    const allBlogs = await db.query("SELECT blog.b_id, blog.text, blog.images, blog.likes, blog.date, users.u_id, users.name, users.username, users.imgloc FROM blog JOIN users on users.u_id = blog.user_id ORDER BY date desc");

    const allContent = { 
      // blogs: [...allBlogs.rows], 
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
    const post = await db.query("SELECT post.p_id, post.text, post.likes, post.date, p_pics, users.u_id, users.name, users.username, users.imgloc FROM post JOIN users on users.u_id = post.user_id WHERE post.p_id = $1", [post_id]);

    if (post.rows.length === 0) {
      res.status(404).json(post.rows[0]);
      return;
    }
    res.json(post.rows[0]);
  } catch(err) {
    console.error(err);
    next();
  };
});

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
  if (!req.token) return res.status(400).json({ error: "Missing token" });

  const decodedToken = jwt.verify(req.token, process.env.SECRET);
  if ( !decodedToken ) {
    return res.status(401).json({ error: "Token missing or invalid" });
  };

  try {

    await db.query("INSERT INTO likes_post_rel (p_id_fk, u_id_fk) VALUES ($1, $2)", [post_id, decodedToken.id]);
    // await db.query("UPDATE post SET likes = (SELECT COUNT(*) FROM likes_post_rel WHERE p_id_fk = $1) WHERE p_id = $1", [post_id]);
    
    res.json({ success: true });
    const userThatLiked = await db.query("SELECT name, imgloc FROM users WHERE u_id = $1", [decodedToken.id]);
    const userToNotify = await db.query("SELECT u_id, sub_endpoint, sub_pub_key, sub_auth_key FROM users WHERE u_id = (SELECT user_id FROM post WHERE p_id = $1)", [post_id]);

    if (userToNotify.rows[0].sub_endpoint) {

      const payload = {
        title: `${userThatLiked.rows[0].name} liked your post!`,
        icon: userThatLiked.rows[0].imgloc,
        url: `http://192.168.42.206:3000/post/${post_id}`,
        // primaryKey: post_id
      };

      const notifId = await db.query("INSERT INTO notification (u_id_fk, title, icon, url) VALUES ($1, $2, $3, $4, $5) RETURNING notif_id", 
        [userToNotify.rows[0].u_id, payload.title, payload.icon, payload.url]);
      
      const subscription = {
        endpoint: userToNotify.rows[0].sub_endpoint,
        keys: {
          p256dh: userToNotify.rows[0].sub_pub_key,
          auth: userToNotify.rows[0].sub_auth_key
        }
      };

      webpush.sendNotification(subscription, JSON.stringify({ ...payload, primaryKey: notifId.rows[0].notif_id }))
        .catch(err => console.error(err));
    }

  } catch(err) {
    console.error(err);
    next();
  }
});

contentRouter.delete("/post/like/:id", async (req, res, next) => {
  const post_id = parseInt(req.params.id);

  if (!req.token) return res.status(400).json({ error: "Missing token" });

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

  if (!req.token) return res.status(400).json({ error: "Missing token" });

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
  }

  try {
    const doesExist = await db.query("SELECT * FROM USERS WHERE username = $1", [decodedToken.username]);

    if (doesExist.rows.length === 0) return res.status(401).json({ error: "User doesn't exist" });

    const pstId = await db.query("INSERT INTO post (text, likes, user_id, p_pics) VALUES ($1, $2, $3, $4) RETURNING p_id", [postText, 0, decodedToken.id, imgsPath]);
    const resQ = await db.query("SELECT post.p_id, post.text, post.likes, post.date, p_pics, users.u_id, users.name, users.username, users.imgloc FROM post JOIN users on users.u_id = post.user_id WHERE p_id = $1", [pstId.rows[0].p_id]);

    res.json(resQ.rows);

    const userFlwrsSubKeys = await db.query("SELECT u_id, sub_endpoint, sub_pub_key, sub_auth_key FROM users JOIN user_followers ON user_followers.u_flwr_id_fk = users.u_id WHERE user_followers.u_id_fk = $1", [decodedToken.id]);

    userFlwrsSubKeys.rows.forEach(async userFlwrSubKeys => {

      const subscription = {
        endpoint: userFlwrSubKeys.sub_endpoint,
        keys: {
          p256dh: userFlwrSubKeys.sub_pub_key,
          auth: userFlwrSubKeys.sub_auth_key
        }
      }

      const payload = {
        title: `${doesExist.rows[0].name} posted`,
        body: postText.slice(51),
        icon: doesExist.rows[0].imgloc,
        url: `http://localhost:3000/post/${pstId.rows[0].p_id}`
      };

      const primKey = await db.query("INSERT INTO notification (u_id_fk, title, body, icon, url) VALUES ($1, $2, $3, $4, $5) RETURNING notif_id", [userFlwrSubKeys.u_id, payload.title, payload.body, payload.icon, payload.url]);

      webpush.sendNotification(subscription, JSON.stringify({ ...payload, primaryKey: primKey.rows[0].notif_id }))
        .catch(err => {
          console.error(err);
        })

      // console.log(subscription, payload);
    })
  } catch(err) {
    console.error(err);
    next();
  };
});

contentRouter.get("/post/:id/comments", async (req, res, next) => {

  const postId = parseInt(req.params.id);

  try {
    const postComments = await db.query("SELECT comments_post_rel.comment_id, comments_post_rel.p_id_fk, comments_post_rel.comment, comments_post_rel.date, users.u_id, users.name, users.username, users.imgloc FROM comments_post_rel JOIN users ON users.u_id = u_id_fk WHERE comments_post_rel.p_id_fk = $1", [postId]);
    
    res.json(postComments.rows);
  } catch (err) {
    console.log(err);
    next();
  };
});

contentRouter.post("/post/:id/comment", (req, res, next) => {
  if (!req.token) return res.status(400).json({ error: "Missing token" });

  const decodedToken = jwt.verify(req.token, process.env.SECRET);
  if (!decodedToken) return res.status(401).json({ error: "Unauthorized: Invalid token" });

  const postId = parseInt(req.params.id);

  db.query("INSERT INTO comments_post_rel (comment, p_id_fk, u_id_fk) VALUES ($1, $2, $3) RETURNING *", [req.body.comment, postId, decodedToken.id])
    .then(comPostRes => {

      db.query("SELECT u_id, name, username, imgloc FROM USERS WHERE u_id = $1", [decodedToken.id])
        .then(async userDetails => {

          res.status(200).json({
            ...comPostRes.rows[0],
            ...userDetails.rows[0]
          });

          const userToNotify = await db.query("SELECT u_id, sub_endpoint, sub_pub_key, sub_auth_key FROM users WHERE u_id = (SELECT user_id FROM post WHERE p_id = $1)", [postId]);

          const payload = {
            title: `${userDetails.rows[0].name} commented`,
            body: req.body.comment.slice(51),
            icon: userDetails.rows[0].imgloc,
            url: `http://192.168.42.206:3000/post/${postId}`,
          };

          const notif_id = await db.query("INSERT INTO notification (u_id_fk, title, body, icon, url) VALUES ($1, $2, $3, $4, $5) RETURNING notif_id", 
            [userToNotify.rows[0].u_id, payload.title, payload.body, payload.icon, payload.url]);

          const subscription = {
            endpoint: userToNotify.rows[0].sub_endpoint,
            keys: {
              p256dh: userToNotify.rows[0].sub_pub_key,
              auth: userToNotify.rows[0].sub_auth_key
            }
          };

          webpush.sendNotification(subscription, JSON.stringify({ ...payload, primaryKey: notif_id.rows[0].notif_id }))
            .catch(err => console.error(err));

        }).catch(err => {

          console.error(err);
          next();
        })
    }).catch(err => {
      
      console.error(err);
      next();
    });
  // try {
  //   const comPostRes = await db.query("INSERT INTO comments_post_rel (comment, p_id_fk, u_id_fk) VALUES ($1, $2, $3) RETURNING *", [req.body.comment, postId, decodedToken.id]);
  //   const userDetails = await db.query("SELECT u_id, name, username, imgloc FROM USERS WHERE u_id = $1", [decodedToken.id]);
    
  //   res.status(200).json({
  //      ...comPostRes.rows[0],
  //      ...userDetails[0]
  //   });

  // } catch (err) {
  //   console.error(err);
  //   next();
  // }
});



module.exports = contentRouter;