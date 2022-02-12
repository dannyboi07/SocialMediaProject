const registerRouter = require("express").Router();
const db = require("../db");
const bcrypt = require("bcrypt");
const fs = require("fs");

registerRouter.get("/", async (req ,res, next) => {
  try {
    const users = await db.query("SELECT * FROM USERS")
    res.json(users.rows);
  } catch(err) {
    console.error(err);
    next(err);
  }
});

registerRouter.post("/", async(req, res, next) => {
  const body = req.body;

  if (body.username.length < 3) {
    return res.status(400).json({ 
      error: "Username must be at least 3 characters long"
    });
  } else if (body.password.length < 8) {
    return res.status(400).json({
      error: "Password must be at least 8 characters long"
    });
  };

  let profImgPath = "http://localhost:3500/images/profile-pics/default-prof-img/user-default.svg";
  // if (body.profileimg) {
    
  // }

  try {
    const doesExist = await db.query("SELECT * FROM users WHERE username = $1 LIMIT 1", [body.username]);
    if (doesExist.rows.length > 0) return res.status(400).json({ error: "User already exists" });

    const pwHash = await bcrypt.hash(body.password, 10);
    const result = await db.query("INSERT INTO USERS (name, username, password_hash, imgloc) VALUES ($1, $2, $3, $4) RETURNING *", [body.name, body.username, pwHash, profImgPath]);
    return res.json(result.rows);
  } catch(err) {
    next(err);
  };
});

module.exports = registerRouter;