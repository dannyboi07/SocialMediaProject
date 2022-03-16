const userRouter = require("express").Router();
const db = require("../db");
const jwt = require("jsonwebtoken");

userRouter.get("/", async (req, res, next) => {
    const { uname } = req.query;

    let decodedToken = null;
    if (req.token) {
        decodedToken = jwt.verify(req.token, process.env.SECRET);
        if (!decodedToken) return res.status(401).json({ error: "Token missing or invalid" });
    };
    // console.log(req.token);

    try {
        const foundUser = await db.query("SELECT u_id, name, username, imgloc, email FROM users WHERE username = $1", [uname]);

        if (foundUser.rows.length === 1) {
            const userPosts = await db.query("SELECT * from post WHERE user_id = $1", [foundUser.rows[0].u_id]);

            if (decodedToken) {
                const followsOrNot = await db.query("SELECT COUNT(*) from user_followers WHERE u_id_fk = $1 AND u_flwr_id_fk = $2", [foundUser.rows[0].u_id, decodedToken.id]);

                if (followsOrNot.rows[0].count === "1") {

                    const response = {
                        ...foundUser.rows[0],
                        follows: true,
                        posts: [
                            ...userPosts.rows
                        ]
                    };

                    return res.status(200).json(response);
                } else {

                    const response = {
                        ...foundUser.rows[0],
                        follows: false,
                        posts: [
                            ...userPosts.rows
                        ]
                    }

                    return res.status(200).json(response);
                }
            }
            const response = {
                ...foundUser.rows[0],
                posts: [
                    ...userPosts.rows
                ],
            };

            return res.status(200).json(response);
        } else return res.status(404).json({ error: "No user found" });
    } catch (err) {
        console.error(err);
        next();
    }; 
});

userRouter.get("/follows/:uid", async (req, res, next) => {
    const decodedToken = jwt.verify(req.token, process.env.SECRET);
    if (!decodedToken) return res.status(401).json({ error: "Token missing or invalid" });

    const userToCheck = parseInt(req.params.uid);

    try {
        const followsOrNot = await db.query("SELECT COUNT(*) FROM user_followers WHERE u_id_fk = $1 AND u_flwr_id_fk = $2", [userToCheck, decodedToken.id]);
        console.log(followsOrNot.rows[0]);

        if (followsOrNot.rows[0].count === "1") return res.status(200).json({ follows: true });
        else return res.status(404).json({ follows: false });
    } catch(err) {
        console.error(err);
        next();
    };
});

userRouter.post("/follow/:uid", async (req, res, next) => {
    const decodedToken = jwt.verify(req.token, process.env.SECRET);
    if (!decodedToken) return res.status(401).json({ error: "Token missing or invalid" });

    const userToFollowId = parseInt(req.params.uid);

    if (parseInt(decodedToken.id) === userToFollowId) return res.status(400).json({ success: false, error: "Cannot follow your own account" });

    try {
        const foundUserToFollow = await db.query("SELECT COUNT(*) FROM users WHERE u_id = $1", [userToFollowId]);

        if (foundUserToFollow.rows.length === 1) {
            await db.query("INSERT INTO user_followers (u_id_fk, u_flwr_id_fk) VALUES ($1, $2)", [userToFollowId, decodedToken.id]);
            // await db.query("INSERT INTO user_following (u_id_fk, u_flwng_id_fk) VALUES ($1, $2)", [decodedToken.id, userToFollowId]);

            return res.status(200).json({ success: true });
        } else return res.status(404).json({ success: false, error: "User not found" });
    } catch(err) {
        console.error(err);
        next();
    };
});

userRouter.delete("/follow/:uid", async (req, res, next) => {
    const decodedToken = jwt.verify(req.token, process.env.SECRET);
    if (!decodedToken) return res.status(401).json({ error: "Token missing or invalid" });

    const userToUnfollowId = parseInt(req.params.uid);

    try {
        // const foundUserToUnfollow = await db.query("SELECT COUNT(*) FROM users WHERE u_id = $1", [userToUnfollowId]);
        // await db.query("DELETE FROM user_following WHERE u_id_fk = $1", [decodedToken.id]);
        await db.query("DELETE FROM user_followers WHERE u_id_fk = $1 AND u_flwr_id_fk = $2", [userToUnfollowId, decodedToken.id]);

        return res.status(200).json({ success: true });

    } catch (err) {
        console.error(err);
        next();
    };
});

module.exports = userRouter;