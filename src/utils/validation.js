const validator = require("validator");

const validatSignUpData = (req) => {
  const { firstName, lastName, email, password } = req.body;
  if (!firstName || !lastName) {
    throw new Error("Name fields are required");
  } else if (!validator.isEmail(email)) {
    throw new Error("Invalid email address");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error(
      "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one symbol."
    );
  }
};

const validateSkills = (req) => {
  const { skills } = req.body;
  if (skills.length > 50) {
    throw new Error("skills should not be more than 50");
  }
};

module.exports = { validatSignUpData, validateSkills };
