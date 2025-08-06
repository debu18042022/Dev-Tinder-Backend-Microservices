const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true, // This will remove any leading or trailing whitespace
      maxLength: 100,
      minLength: 3,
    },
    lastName: {
      type: String,
      maxLength: 100,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      min: 18,
    },
    gender: {
      type: String,
      // validate: {
      //   validator: (value) => {
      //     return ["male", "female", "other"].includes(value);
      //   },
      // },
      enum: ["male", "female", "other"], // Mongoose supports an even simpler way to validate against a fixed set of values:
    },
    skills: {
      type: [String],
      default: ["javascript"],
    },
    photoUrl: {
      type: String,
      default:
        "https://tamilnaducouncil.ac.in/wp-content/uploads/2020/04/dummy-avatar.jpg",
    },
  },
  { timestamps: true } // This will automatically add createdAt and updatedAt fields
);

const User = mongoose.model("User", userSchema);

module.exports = User;
