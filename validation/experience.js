const isEmpty = require("./../utility/isEmpty");
const validator = require("validator");

module.exports = data => {
  let errors = {};

  const title = isEmpty(data.title) ? "" : data.title;
  const company = isEmpty(data.company) ? "" : data.company;
  const from = isEmpty(data.from) ? "" : data.from;

  // Required fields
  if (validator.isEmpty(title)) errors.title = "Title field is required";

  if (validator.isEmpty(company)) errors.company = "Company field is required";

  if (validator.isEmpty(from)) errors.from = "From field is required";

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
