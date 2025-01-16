const express = require("express");
const authRouter = express.Router();
const { validateSignUpData } = require("../utils/validation");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// SignUp API
authRouter.post("/signup", async (req, res) => {
  try {
    validateSignUpData(req); // Validate signup data from the request body

    const { firstName, lastName, emailId, password } = req.body;

    // Encrypt the password
    const hashedPassword = await bcrypt.hash(password, 10); // Password encryption using bcrypt
    console.log(hashedPassword);

    // Creating a new instance of the user model
    const user = new User({
      // Changed "user" to "User" as it's a model, model should start with an uppercase
      firstName,
      lastName,
      emailId,
      password: hashedPassword,
    });

    // Save user to the database
    const savedUser = await user.save();
    const token = await savedUser.getJWT();
    const tokenOption = {
      httpOnly: true,
      secure: true, // Set true if using HTTPS
      sameSite: "None",
    };
    res.cookie("token", token, {
      expires: new Date(Date.now() + 8 * 3600000),
    });
    res.json({ message: "User Added successfully!", data: savedUser });
  } catch (error) {
    res.status(500).send("ERROR: " + error.message); // Updated error handling with status code
  }
});

// Login API
authRouter.post("/login", async (req, res) => {
  // Changed from GET to POST
  try {
    const { emailId, password } = req.body;

    // Check if the user exists
    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      return res.status(400).send("Invalid Credentials"); // Returning response instead of throwing error
    }

    // Check if the password matches
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (isPasswordValid) {
      // Create a JWT token
      const token = await user.getJWT();
      const tokenOption = {
        httpOnly: true,
        secure: true, // Set true if using HTTPS
        sameSite: "None",
      };
      res.cookie("token", token, {
        expires: new Date(Date.now() + 8 * 360000),
      });

      res.send({ message: "Logged in successfully", user });
    } else {
      return res.status(400).send("Invalid Credentials");
    }
  } catch (error) {
    res.status(500).send("Something went wrong: " + error.message);
  }
});

// Logout API
authRouter.post("/logout", (req, res) => {
  try {
    const tokenOption = {
      httpOnly: true,
      secure: true, // Set true if using HTTPS
      sameSite: "None",
    };
    const token = "";
    // storing token inside the cookies
    res
      .cookie("token", token, tokenOption)
      .json({ message: "logout successfull" });
  } catch (error) {
    res.status(404).send(error.message);
  }
});
module.exports = authRouter;
