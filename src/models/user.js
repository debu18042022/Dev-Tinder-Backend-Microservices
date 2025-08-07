const mongoose = require("mongoose");
const validator = require("validator");

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
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid email address");
        }
      },
    },
    password: {
      type: String,
      required: true,
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error(
            "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one symbol."
          );
        }
      },
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
      validate(value) {
        if (!validator.isURL(value)) {
          throw new Error("Invalid URL for photo");
        }
      },
    },
  },
  { timestamps: true } // This will automatically add createdAt and updatedAt fields
);

const User = mongoose.model("User", userSchema);

module.exports = User;
