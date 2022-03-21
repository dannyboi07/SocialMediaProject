const express = require("express");
const app = express();
const webpush = require("web-push");
const cors = require("cors");
const dotenv = require("dotenv");
const middleware = require("./utils/middleware");
const registerRouter = require("./controller/register");
const loginRouter = require("./controller/login");
const contentRouter = require("./controller/content");
const userRouter = require("./controller/user");
const searchRouter = require("./controller/search");
const subscriptionRouter = require("./controller/subscribe");

dotenv.config();
// console.log(process.env.PUBLIC_VAPID_KEY)
// const publicVapidKey = process.env.PUBLIC_VAPID_KEY, privateVapidKey = process.env.PRIVATE_VAPID_KEY;

// const publicVapidKey ="BMvqlc4V9Z1P2ktFvoE3V45_qCRkREuNWCbbaoZeJRiUyVb7GKg-IbiBhCL3fEejYby1EPDuuRQJbdY7Cv0GFUw"
// const privateVapidKey="swkcvXe0xn3YxGbh4j5Y3-oti_wqrs0MUDbZlKgKdR8"
webpush.setVapidDetails("mailto:test@test.com", process.env.PUBLIC_VAPID_KEY, process.env.PRIVATE_VAPID_KEY);

app.use(cors());
app.use(express.json());

app.use(middleware.requestLogger);

app.use("/api/content", middleware.extractToken, contentRouter);
app.use("/api/search", searchRouter);
app.use("/api/user", middleware.extractToken, userRouter);

app.use("/public", express.static("public"));
app.use("/images", express.static("images"));

app.use("/api/login", loginRouter);
app.use("/api/register", registerRouter);

app.use("/api/subscribe", middleware.extractToken, subscriptionRouter);

app.get("/", (req, res) => {
    res.send("<h1>Hello world</h1>");
});

app.use(middleware.unknownEndpoint);

module.exports = app;