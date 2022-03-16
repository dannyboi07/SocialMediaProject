const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const middleware = require("./utils/middleware");
const registerRouter = require("./controller/register");
const loginRouter = require("./controller/login");
const contentRouter = require("./controller/content");
const userRouter = require("./controller/user");
const searchRouter = require("./controller/search");

dotenv.config();

app.use(cors());
app.use(express.json());

app.use(middleware.requestLogger);

app.use("/api/content", middleware.extractToken, contentRouter);
app.use("/api/search", searchRouter);
app.use("/api/user", middleware.extractToken, userRouter);
app.use("/api/login", loginRouter);
app.use("/api/register", registerRouter);

app.use("/public", express.static("public"));
app.use("/images", express.static("images"));

app.get("/", (req, res) => {
    res.send("<h1>Hello world</h1>");
});

app.use(middleware.unknownEndpoint);

module.exports = app;