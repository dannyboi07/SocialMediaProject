const contentRouter = require("express").Router();
const db = require("../db");
const jwt = require("jsonwebtoken");

contentRouter.get("/", async (req, res, next) => {

  const allPosts = await db.query("SELECT post.p_id, post.text, post.likes, post.date, users.u_id, users.name, users.username, users.imgloc FROM post JOIN users on users.u_id = post.user_id ORDER BY date desc");
  
  const allBlogs = await db.query("SELECT blog.b_id, blog.text, blog.images, blog.likes, blog.date, users.u_id, users.name, users.username, users.imgloc FROM blog JOIN users on users.u_id = blog.user_id ORDER BY date desc");

  // let postsLikes = [];
  // for (let i = 0; i < allPosts.rows.length; i++) {
  //   let temp;
  //   db.query("SELECT COUNT(*) FROM likes_post_rel WHERE p_id_fk=$1", [allPosts.rows[i].p_id]).then(res => {
  //     temp = res.rows[0].count;
  //     console.log("count",res.rows[0].count);
  //   });
  //   console.log(temp)
  //   // allPosts.rows[i].likes = temp;
  //   // console.log("loop",allPosts.rows[i])
  // }
  
  const allContent = { blogs: [...allBlogs.rows], posts: [...allPosts.rows] };
  console.log("done");
  res.json(allContent);
});

contentRouter.get("/post/likes/:id", async (req, res, next) => {
  const post_id = parseInt(req.params.id);

  const usersThatLiked = await db.query("SELECT like_id, date, p_id_fk, users.u_id, users.name, users.username, users.imgloc FROM likes_post_rel JOIN users ON users.u_id = likes_post_rel.u_id_fk WHERE p_id_fk=$1 ORDER BY date DESC", [post_id]);

  res.json(usersThatLiked.rows);
});

// contentRouter.get("/post/comments/:id", async (req, res, next) => {
//   const post_id = parseInt(req.params.id);

//   const 
// })

module.exports = contentRouter;