const express = require("express");
const profileRouter = express.Router();
const jwt = require("jsonwebtoken");
const { vaildateEditProfileData } = require("../utils/validation");
const { userAuth } = require("../middlewares/auth");

// Profile-view
profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user; // `req.user` is set by `userAuth` middleware
    res.send(user);
  } catch (error) {
    res.status(400).send("Error: " + error.message);
  }
});

// Profile-Edit
profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    const validationResult = vaildateEditProfileData(req);
    if (validationResult.error) {
      throw new Error(validationResult.error);
    }

    const loggedInUser = req.user; // `req.user` is set by `userAuth` middleware

    // Update fields that exist in req.body and are allowed
    Object.keys(req.body).forEach((key) => {
      if (loggedInUser[key] !== undefined) {
        loggedInUser[key] = req.body[key];
      }
    });

    await loggedInUser.save();
    res.send(`${loggedInUser.firstName} Your Profile Edit Successfully`);
  } catch (error) {
    res.status(400).send("Error: " + error.message);
  }
});

module.exports = profileRouter;
