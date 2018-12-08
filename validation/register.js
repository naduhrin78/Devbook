const isEmpty = require("./../utility/isEmpty");
const validator = require("validator");

module.exports = data => {
  var errors = {};

  const name = isEmpty(data.name) ? "" : data.name;
  const email = isEmpty(data.email) ? "" : data.email;
  const password1 = isEmpty(data.password1) ? "" : data.password1;
  const password2 = isEmpty(data.password2) ? "" : data.password2;

  if (!validator.isLength(name, { min: 2, max: 30 }))
    errors.name = "Name must be between 2 and 30 characters";

  if (validator.isEmpty(name)) errors.name = "Name field is required";

  if (!validator.isEmail(email)) errors.email = "Invalid email";

  if (validator.isEmpty(email)) errors.email = "Email field is required";

  if (!validator.isLength(password1, { min: 6, max: 30 }))
    errors.password1 = "Password must be between 6 and 30 characters";

  if (validator.isEmpty(password1))
    errors.password1 = "Password field is required";

  if (!validator.equals(password1, password2) && !errors.password1)
    errors.password2 = "Passwords don't match";

  if (validator.isEmpty(password2))
    errors.password2 = "Password field is required";

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
