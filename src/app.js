const express = require("express");

const app = express();

app.use(
  "/user",
  (req, res, next) => {
    console.log("route hander 1");
    // res.send("User route handler 1");
    next();
  },
  (req, res, next) => {
    console.log("route hander 2");
    // res.send("User route handler 2");
    next();
  },
  [
    (req, res, next) => {
      console.log("route hander 3");
      // res.send("User route handler 3");
      next();
    },
    (req, res, next) => {
      console.log("route hander 4");
      // res.send("User route handler 4");
      next();
    },
  ],
  (req, res, next) => {
    console.log("route hander 5");
    res.send("User route handler 5");
    next();
  }
);

app.listen(7777, () => {
  console.log("server is running on port 7777");
});
