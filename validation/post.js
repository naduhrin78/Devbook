const isEmpty = require("./../utility/isEmpty");
const validator = require("validator");

module.exports = data => {
  let errors = {};

  const text = isEmpty(data.text) ? "" : data.text;

  if (validator.isEmpty(text)) errors.text = "Text field is required";

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
