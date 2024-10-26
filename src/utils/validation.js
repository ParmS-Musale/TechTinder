const validator = require("validator");

// Validation function for signup data

const validateSignUpData = (req) => {
  const { firstName, lastName, emailId, password } = req.body;

  if (!firstName || !lastName) {
    return { error: "First name and Last name are required" };
  }

  if (!emailId || !validator.isEmail(emailId)) {
    return { error: "Valid email is required" };
  }

  if (!password || password.length < 8) {
    return { error: "Password must be at least 8 characters long" };
  }

  return { success: true }; // Return success if no errors
};

// Validation function for editing profile data

const vaildateEditProfileData = (req) => {
  const allowedEditFields = [
    "firstName",
    "lastName",
    "emailId",
    "photoUrl",
    "about",
    "skills",
    "gender",
  ];

  // Check if all fields in req.body are allowed to be edited
  const isEditAllowed = Object.keys(req.body).every((field) =>
    allowedEditFields.includes(field)
  );

  if (!isEditAllowed) {
    return { error: "Invalid fields in edit profile data" };
  }

  return { success: true };
};

module.exports = { validateSignUpData, vaildateEditProfileData };
