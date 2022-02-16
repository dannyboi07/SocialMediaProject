const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const middleware = require("./utils/middleware");
const registerRouter = require("./controller/register");
const loginRouter = require("./controller/login");
const contentRouter = require("./controller/content");

dotenv.config();

app.use(cors());
app.use(express.json());

app.use(middleware.requestLogger);

app.use("/api/register", registerRouter);
app.use("/api/login", loginRouter);
app.use("/api/content", contentRouter);

app.use("/images", express.static("images"));

app.get("/", (req, res) => {
    res.send("<h1>Hello world</h1>");
});

module.exports = app;