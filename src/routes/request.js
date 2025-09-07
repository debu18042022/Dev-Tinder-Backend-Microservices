const express = require('express');

const { userAuth } = require("../middlewares/auth");

const requestRouter = express.Router();

requestRouter.post("/request/send/interested/:userId", userAuth, async (req, res) => {
  try {
    const { user } = req;
    res
      .status(200)
      .send(
        `New connection request sent by ${user.firstName} ${user.lastName}`
      );
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

module.exports = {requestRouter};