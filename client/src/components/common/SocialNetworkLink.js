import React from "react";
import PropTypes from "prop-types";

function SocialNetworkLink({ site, placeholder, name, value }) {
  let socialType = "fab fa-" + site;
  return (
    <div className="input-group mb-3">
      <div className="input-group-prepend">
        <span className="input-group-text">
          <i className={socialType} />
        </span>
      </div>
      <input
        type="text"
        className="form-control form-control-lg"
        placeholder={placeholder}
        name={name}
        value={value}
      />
    </div>
  );
}

export default SocialNetworkLink;
