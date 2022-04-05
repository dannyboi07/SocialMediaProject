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
const commsRouter = require("./controller/comms");
const db = require("./db");

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
app.use("/api/comms", middleware.extractToken, commsRouter);
app.use("/api/search", searchRouter);
app.use("/api/user", middleware.extractToken, userRouter);

app.use("/public", express.static("public"));
app.use("/images", express.static("images"));

app.use("/api/login", loginRouter);
app.use("/api/register", registerRouter);

app.get("/testpush", (req, res, next) => {
    const subscription = {
        endpoint: "https://fcm.googleapis.com/fcm/send/d5A8SuvKqQ4:APA91bHxXcxTGJTzNYD8emFkm893TeXsYVCcVz5PLh77wFYxTxI1_aXPaL0AhbcqKHGGQbY_WG4B2CU1j_LN1JgdgLMvSRPbKfphDVdKdRexhZRpkCtIeeYZn0y57xdlhF2K63ObGhow",
        keys: {
            p256dh: "BEmjNMQWVKH2nDlha4ut7cyXl4i8Y3r2LUlhb7dDLsB8yg7BMH9TDzqFqYqR8hDVCQ05CgcQEZ_E3c_nkmKts7M",
            auth: "6VxiW5rtMTeZuHRAuvy1yA"
        }
    };

    const payload = {
        title: "Test push",
        icon: "http://localhost:3500/images/profile-pics/profileimg-1645003992638-711595105.jpg",
        body: "Testing service workers push to notif and push to clientMessage",
        url: "http://localhost:3000/home",
        primaryKey: 5
    };

    webpush.sendNotification(subscription, JSON.stringify(payload))
        .catch(err => console.error(err));
    res.end();
});

app.get("/testq", async (req, res, next) => {
    try {
        const resu = await db.query("INSERT INTO message (u_id_from, u_id_to, msg_text) VALUES ($1, $2, $3) RETURNING msg_id, u_id_from, u_id_to, msg_text,to_char(date, 'HH12:MI AM') as time, to_char(date, 'Month DD, YYYY') as date", [36, 39, "test"]);

        res.json(resu.rows)
    } catch(err) {
        console.error(err);
        next();
    }
})

app.use("/api/subscribe", middleware.extractToken, subscriptionRouter);

app.get("/", (req, res) => {
    res.send("<h1>Hello world</h1>");
});

app.use(middleware.unknownEndpoint);

module.exports = app;