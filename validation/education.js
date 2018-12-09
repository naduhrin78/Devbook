const isEmpty = require("./../utility/isEmpty");
const validator = require("validator");

module.exports = data => {
  let errors = {};

  const school = isEmpty(data.school) ? "" : data.school;
  const degree = isEmpty(data.degree) ? "" : data.degree;
  const fieldOfStudy = isEmpty(data.fieldOfStudy) ? "" : data.fieldOfStudy;
  const from = isEmpty(data.from) ? "" : data.from;

  // Required fields
  if (validator.isEmpty(school)) errors.school = "School field is required";

  if (validator.isEmpty(degree)) errors.degree = "Degree field is required";

  if (validator.isEmpty(fieldOfStudy))
    errors.fieldOfStudy = "Field of study field is required";

  if (validator.isEmpty(from)) errors.from = "From field is required";

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
