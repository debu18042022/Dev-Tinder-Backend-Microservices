const express = require("express");

const app = express();

const { adminAuth } = require("./middlewares/auth");
const { userAuth } = require("./middlewares/auth");

app.use("/admin", adminAuth);
// app.use("/user", userAuth);

app.post("/user/login", (req, res, next) => {
  res.status(200).send("user has been logged in");
});

app.get("/user/getdata", userAuth, (req, res, next) => {
  res.status(200).send("data has been received");
});

app.get("/admin/getalldata", (req, res, next) => {
  res.status(200).send("all the data has been received");
});

app.delete("/admin/deletealldata", (req, res, next) => {
  res.status(200).send("all the data has been deleted");
});

app.listen(7777, () => {
  console.log("server is running on port 7777");
});
