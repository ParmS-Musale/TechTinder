const express = require("express");
const profileRouter = express.Router();
const jwt = require("jsonwebtoken");

profileRouter.get("/profile", async (req, res) => {
  try {
    const cookie = req.cookie;

    const { token } = cookie;

    if (!token) {
      throw new Error("Invalid token");
    }

    const decodeMessage = await jwt.verify(token, "Dev@tinder$21");
    const _id = decodeMessage;

    const user = new User.findById(_id);
    if (!user) {
      throw new Error("Invalid user");
    }
    res.send(user);
  } catch (error) {
    res.status(400).send("Error: " + error.message);
  }
});

module.exports = profileRouter;
