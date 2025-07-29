const express = require("express");

const app = express();

app.get("/user/getdata", (req, res, next) => {
  try {
    throw new Error("this is a test error");
    res.status(200).send("data has been received");
  } catch (err) {
    res.status(500).send("An error occurred while processing your request.");
  }
});

//wild card error handling middleware
app.use("/", (err, req, res, next) => {
  console.error("Error occurred:", err.message);
  res.status(500).send("An error occurred, please try again later.");
});

app.listen(7777, () => {
  console.log("server is running on port 7777");
});
