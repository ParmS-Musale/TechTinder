const express = require("express");
const userRouter = express.Router();

const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");

const SAFE_FIELDS = "firstName lastName photoUrl age  skills";

userRouter.get("/user/request/received", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const connectionRequest = await ConnectionRequest.find({
      toUserId: loggedInUser._id,
      status: "interested",
    }).populate("fromUserId", "firstName lastName photoUrl age gender");
    res.json({ message: "Received requests", data: connectionRequest });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

userRouter.get("/user/connection", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const connectionRequest = await ConnectionRequest.find({
      $or: [
        { toUserId: loggedInUser._id, status: "accepted" },
        { fromUserId: loggedInUser._id, status: "accepted" },
      ],
    })
      .populate("fromUserId toUserId", SAFE_FIELDS)
      .populate("toUserId", SAFE_FIELDS);

    const data = connectionRequest.map((row) => {
      if (row.fromUserId._id.toString() === loggedInUser._id.toString()) {
        return row.toUserId;
      } else {
        return row.fromUserId;
      }
    });
    res.json({ message: "Connections", data });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = userRouter;
