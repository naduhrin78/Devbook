const isEmpty = require("./../utility/isEmpty");
const validator = require("validator");

module.exports = data => {
  let errors = {};

  const email = isEmpty(data.email) ? "" : data.email;
  const password = isEmpty(data.password) ? "" : data.password;

  if (!validator.isEmail(email)) errors.email = "Invalid email";

  if (validator.isEmpty(email)) errors.email = "Email field is required";

  if (!validator.isLength(password, { min: 6, max: 30 }))
    errors.password1 = "Password must be between 6 and 30 characters";

  if (validator.isEmpty(password))
    errors.password1 = "Password field is required";

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
