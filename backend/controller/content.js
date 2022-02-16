const contentRouter = require("express").Router();
const db = require("../db");
const jwt = require("jsonwebtoken");

contentRouter.get("/", async (req, res, next) => {
  const allPosts = await db.query("SELECT post.p_id, post.text, post.likes, post.date, users.u_id, users.name, users.username, users.imgloc FROM post JOIN users on users.u_id = post.user_id ORDER BY date desc");
  const allBlogs = await db.query("SELECT blog.b_id, blog.text, blog.images, blog.likes, blog.date, users.u_id, users.name, users.username, users.imgloc FROM blog JOIN users on users.u_id = blog.user_id ORDER BY date desc");
  const allContent = { blogs: [...allBlogs.rows], posts: [...allPosts.rows] };
  console.log(allContent);
  res.json(allContent);
});

module.exports = contentRouter;