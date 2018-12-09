const isEmpty = require("./../utility/isEmpty");
const validator = require("validator");

module.exports = data => {
  let errors = {};

  const handle = isEmpty(data.handle) ? "" : data.handle;
  const status = isEmpty(data.status) ? "" : data.status;
  const skills = isEmpty(data.skills) ? "" : data.skills;
  const facebook = isEmpty(data.facebook) ? "" : data.facebook;
  const twitter = isEmpty(data.twitter) ? "" : data.twitter;
  const instagram = isEmpty(data.instagram) ? "" : data.instagram;
  const youtube = isEmpty(data.youtube) ? "" : data.youtube;
  const linkedin = isEmpty(data.linkedin) ? "" : data.linkedin;
  const website = isEmpty(data.website) ? "" : data.website;

  if (!validator.isEmpty(website) && !validator.isURL(website))
    errors.website = "Invalid website URL";

  if (!validator.isEmpty(facebook) && !validator.isURL(facebook))
    errors.facebook = "Invalid facebook URL";

  if (!validator.isEmpty(twitter) && !validator.isURL(twitter))
    errors.twitter = "Invalid twitter URL";

  if (!validator.isEmpty(instagram) && !validator.isURL(instagram))
    errors.instagram = "Invalid instagram URL";

  if (!validator.isEmpty(youtube) && !validator.isURL(youtube))
    errors.youtube = "Invalid youtube URL";

  if (!validator.isEmpty(linkedin) && !validator.isURL(linkedin))
    errors.linkedin = "Invalid linkedin URL";

  if (!validator.isLength(handle, { min: 6, max: 30 }))
    errors.handle = "Handle must be between 6 and 30 characters";

  // Required fields
  if (validator.isEmpty(handle)) errors.handle = "Handle field is required";

  if (validator.isEmpty(status)) errors.status = "Status field is required";

  if (validator.isEmpty(skills)) errors.skills = "Skills field is required";

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
