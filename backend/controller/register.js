const registerRouter = require("express").Router();
const db = require("../db");
const bcrypt = require("bcrypt");
const path = require("path");

const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./images/profile-pics/")
  },
  filename: function (req, file, cb) {
    // let filetype;
    // if (file.mimetype === "image/jpeg") filetype = ".jpeg"
    // else if (file.mimetype === "image/png") filetype = ".png"
    // else if (file.mimetype === "image/svg+xml") filetype = ".svg"
    // else return cb(null, new Error ("Wrong file type, only jpg/jpeg/png/svg are supported"));
    if (file.mimetype !== "image/jpeg" && file.mimetype !== "image/png" && file.mimetype !== "image/svg+xml") {
      return cb(null, new Error("Wrong file type, only jpg/jpeg/png/svg are supported"));
    }

    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname));
  }
})
const upload = multer({ storage: storage });



registerRouter.get("/", async (req ,res, next) => {
  try {
    const users = await db.query("SELECT * FROM USERS");
    res.json(users.rows);
  } catch(err) {
    console.error(err);
    next(err);
  }
});

registerRouter.post("/", upload.single("profileimg"), async(req, res, next) => {
  const { name, username, password } = req.body;

  if (username.length < 3) {
    return res.status(400).json({ 
      error: "Username must be at least 3 characters long"
    });
  } else if (password.length < 8) {
    return res.status(400).json({
      error: "Password must be at least 8 characters long"
    });
  };

  let profImgPath = "http://localhost:3500/images/profile-pics/default-prof-img/user-default.svg";
  if (req.file) {
    profImgPath = `http://localhost:3500/images/profile-pics/${req.file.filename}`;
  }

  try {
    const doesExist = await db.query("SELECT * FROM users WHERE username = $1 LIMIT 1", [username]);
    if (doesExist.rows.length > 0) return res.status(400).json({ error: "User already exists" });

    const pwHash = await bcrypt.hash(password, 10);
    const result = await db.query("INSERT INTO USERS (name, username, password_hash, imgloc) VALUES ($1, $2, $3, $4) RETURNING *", [name, username, pwHash, profImgPath]);
    return res.json(result.rows);
  } catch(err) {
    console.error(err);
    next(err);
  };
});

registerRouter.post("/test", upload.single("testimg"), async(req, res, next) => {
  console.log(req.file);
  console.log(req.body);
  res.json({ status: "Success" });
})

module.exports = registerRouter;