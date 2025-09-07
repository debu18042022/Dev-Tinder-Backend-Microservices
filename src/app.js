const express = require("express");
const { connectDB } = require("./config/database");
const User = require("./models/user");
const jwt = require("jsonwebtoken");

const app = express();
const cookieParser = require("cookie-parser");

app.use(express.json()); // Middleware to parse JSON bodies
app.use(cookieParser()); // Middleware to parse cookies

const { authRouter } = require("./routes/auth");
const { profileRouter } = require("./routes/profile");
const { requestRouter } = require("./routes/request");

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);

/**Api to get all the users */
app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    if (users.length === 0) {
      res.status(404).send("No users found");
    } else {
      res.status(200).send(users);
    }
  } catch (err) {
    res.status(400).send("something went wrong" + err.message);
  }
});

/**APi to get single user */
app.get("/user", async (req, res) => {
  try {
    const user = await User.findOne(req.query);
    if (!user) {
      res.status(404).send("No user found with this email");
    } else {
      res.status(200).send(user);
    }
  } catch (err) {
    res.status(400).send("Something went wrong" + err.message);
  }
});

/**API to delete a user */
app.delete("/user", async (req, res) => {
  try {
    const userId = req.query.userId;
    const user = await User.findByIdAndDelete(userId);
    // const user = await User.findOneAndDelete({ _id: userId });
    if (!user) {
      res.status(404).send("No user found with this ID");
    }
    res.status(200).send("User deleted successfully");
  } catch (err) {
    res.status(400).send("Something went wrong" + err.message);
  }
});

/**API to update the user*/
app.patch("/user/:userId", async (req, res) => {
  try {
    const allowedFields = [
      "firstName",
      "lastName",
      "age",
      "gender",
      "skills",
      "photoUrl",
    ];
    const userId = req.params.userId;
    const dataToUpdate = req.body;

    Object.keys(dataToUpdate).forEach((key) => {
      if (!allowedFields.includes(key)) {
        throw new Error(`Invalid field: ${key}  to update`);
      }
    });

    const updatedUser = await User.findByIdAndUpdate(userId, dataToUpdate, {
      new: true,
    });

    if (!updatedUser) {
      res.status(404).send("No user found with this ID");
    }
    res.status(200).send(updatedUser);
  } catch (err) {
    res.status(400).send("Something went wrong " + err.message);
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
