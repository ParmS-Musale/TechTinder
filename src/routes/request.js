const express = require("express");
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");
const nodemailer = require("nodemailer");


const requestRouter = express.Router();

requestRouter.post(
  "/request/send/:status/:toUserId",
  userAuth,
  async (req, res) => {
    try {
      const fromUserId = req.user._id;
      const toUserId = req.params.toUserId;
      const status = req.params.status;
      const allowedStatus = ["ignored", "interested"];
      
      // Validate status
      if (!allowedStatus.includes(status)) {
        return res
          .status(400)
          .json({ message: "Invalid status type: " + status });
      }
      // Check if the recipient exists
      const toUser = await User.findById(toUserId);
      if (!toUser) {
        return res.status(404).json({ message: "User not found!" });
      }
      // Check for existing connection request
      const existingConnectionRequest = await ConnectionRequest.findOne({
        $or: [
          { fromUserId, toUserId },
          { fromUserId: toUserId, toUserId: fromUserId },
        ],
      });
      if (existingConnectionRequest) {
        return res
          .status(400)
          .send({ message: "Connection Request Already Exists!!" });
      }
      // Create a new connection request
      const connectionRequest = new ConnectionRequest({
        fromUserId,
        toUserId,
        status,
      });
      console.log(connectionRequest);

      //  // Email Notification Functionality
      //  const transporter = nodemailer.createTransport({
      //   service: "smtp.gmail.com", // or your email provider
      //   auth: {
      //     user: process.env.EMAIL_USER, // Your email address
      //     pass: process.env.EMAIL_PASS, // Your app password
      //   },
      // });

      // const mailOptions = {
      //   from: process.env.EMAIL_USER,
      //   to: toUser.email, // Sending to the recipient's email
      //   subject: "New Connection Request",
      //   text: `${req.user.firstName} has sent you a connection request. Status: ${status}`,
      //   html: `<p><strong>${req.user.firstName}</strong> has sent you a connection request.</p><p>Status: <strong>${status}</strong></p>`,
      // };

      // Send the email
      await transporter.sendMail(mailOptions);
      console.log("Email sent successfully!");
      
      const data = await connectionRequest.save();
      res.json({
        message:
          req.user.firstName + " is " + status + " in " + toUser.firstName,
        data,
      });
    } catch (err) {
      res.status(400).send("ERROR: " + err.message);
    }
  }
);

requestRouter.post(
  "/request/review/:status/:requestId",
  userAuth,
  async (req, res) => {
    try {
      const loggedInUser = req.user;        
      const { status, requestId } = req.params;   

      const allowedStatus = ["accepted", "rejected"];
      if (!allowedStatus.includes(status)) {
        return res
          .status(400)
          .json({ message: "Invalid status type: " + status });
      }

      const connectionRequest = await ConnectionRequest.findOne({
        _id: requestId,
        toUserId: loggedInUser._id,
        status: "interested",
      });
      
      if (!connectionRequest) {
        return res
          .status(404)
          .json({ message: "Connection request not found!" });
      }

      connectionRequest.status = status;

      const data = await connectionRequest.save();
      
      res.json({
        message: "Connection request has been " + status,
        data,
      });
    } catch (err) {
      res.status(400).send("ERROR: " + err.message);
    }
  }
);
module.exports = requestRouter;


