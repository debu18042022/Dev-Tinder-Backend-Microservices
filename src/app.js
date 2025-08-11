const express = require("express");
const { connectDB } = require("./config/database");
const User = require("./models/user");
const { validatSignUpData, validateSkills } = require("./utils/validation");
const bcrypt = require("bcrypt");

const app = express();

app.use(express.json()); // Middleware to parse JSON bodies

/*Api to create a user */
app.post("/signup", async (req, res) => {
  try {
    // validation of data
    validatSignUpData(req);

    const { firstName, lastName, email, password } = req.body;

    // Encrypt the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // creating an new instance of the User Model
    const user = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    await user.save(); // save the document to the database
    res.status(200).send("User added successfully!");
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

/**Api to login*/
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new Error("Email and password are required");
    }
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("Invalid credentials");
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Invalid credentials");
    }
    res.status(200).send("Login successful!!!");
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

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
