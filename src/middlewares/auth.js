const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      throw new Error("invalid token, please login first");
    }

    const decoded = jwt.verify(token, "ThisIsASecretKey#98@91");
    const { _id } = decoded;
    const user = await User.findById(_id);

    if (!user) {
      throw new Error("User not found");
    }
    
    req.user = user;
    next();
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
};

module.exports = { userAuth };
