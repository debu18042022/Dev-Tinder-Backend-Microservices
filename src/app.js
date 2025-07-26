const express = require("express");

const app = express();

/**here :means it a dynamic route */
app.get("/user/:userId/:Fname/:Lname", (req, res) => {
  console.log("req.query", req.query);
  console.log("req.params", req.params);
  res.send({
    firstName: "Debu",
    lastName: "Sahu",
  });
});

app.listen(7777, () => {
  console.log("server is running on port 7777");
});
