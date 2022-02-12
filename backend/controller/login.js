const loginRouter = require("express").Router();
const db = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

loginRouter.post("/", async(req, res, next) => {
  const body = req.body;
  try {
    const doesExist = await db.query("SELECT * FROM users where username = $1 LIMIT 1", [body.username]);
    if (doesExist.rows.length === 0) return res.status(401).json({ error: "User doesn't exist" });
    console.log(body, doesExist.rows[0].password_hash.length);

    const pwCorrect = await bcrypt.compare(body.password, doesExist.rows[0].password_hash);
    console.log(pwCorrect);
    if (!pwCorrect) return res.status(401).json({ error: "Incorrect password" });

    const preToken = {
      username: doesExist.rows[0].username,
      id: doesExist.rows[0].id
    };

    const token = jwt.sign(preToken, process.env.SECRET);
    res.status(200).json({ 
      token, username: doesExist.rows[0].username, 
      name: doesExist.rows[0].name, 
      profImgSrc: doesExist.rows[0].imgloc });
  } catch(err) {
    console.error(err);
    next(err);
  };
});

module.exports = loginRouter;