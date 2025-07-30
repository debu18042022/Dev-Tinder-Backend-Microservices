const express = require("express");
const { connectDB } = require("./config/database");
const User = require("./models/user");

const app = express();

app.post("/signup", async (req, res) => {
  const userObj = {
    firstName: "Devvrat",
    lastName: "Sahu",
    email: "devvrat@gmail.com",
    password: "Devvrat@123",
  };

  // creating an instance of User Model
  const user = new User(userObj);

  try {
    await user.save(); // save the document to the database
    res.status(200).send("User added successfully!");
  } catch (err) {
    res.status(400).send("Error saving the user", err.message);
  }
});

connectDB()
  .then(() => {
    console.log("Database connected successfully");
    app.listen(7777, () => {
      console.log("server is running on port 7777");
    });
  })
  .catch((err) => {
    console.error("Database connection failed:", err.message);
  });
