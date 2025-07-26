const express = require("express");

const app = express();

app.get("/user", (req, res) => {
  res.send({
    firstName: "Debu",
    lastName: "Sahu",
  });
});

app.post("/user", (req, res) => {
  res.send({
    "setting the user": "Debu Sahu",
  });
});

app.delete("/user", (req, res) => {
  res.send("User deleted successfully");
});

app.patch("/user", (req, res) => {
  res.send("User updated successfully");
});

app.use("/test", (req, res) => {
  res.send("Hello from the server");
});

app.listen(7777, () => {
  console.log("server is running on port 7777");
});
