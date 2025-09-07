const express = require("express");
const bcrypt = require("bcrypt");

const { validatSignUpData, validateSkills } = require("../utils/validation");
const User = require("../models/user");


const authRouter = express.Router();


authRouter.post("/signup", async (req, res) => {
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

authRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new Error("Email and password are required");
    }
    
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("Invalid credentials");
    }

    const isPasswordValid = await user.validatePassword(password);
    if (!isPasswordValid) {
      throw new Error("Invalid credentials");
    }

    const token = user.getJWT();

    res.cookie("token", token, {
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // Cookie expires in 7 days
    });

    res.status(200).send("Login successful!!!");
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});


module.exports = { authRouter };
