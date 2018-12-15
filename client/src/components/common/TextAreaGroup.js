import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";

function TextAreaGroup({
  type,
  value,
  placeholder,
  name,
  onChange,
  errors,
  info
}) {
  return (
    <div className="form-group">
      <textarea
        value={value}
        onChange={onChange}
        className={classnames("form-control form-control-lg", {
          "is-invalid": errors
        })}
        placeholder={placeholder}
        name={name}
      />

      {errors && <div className="invalid-feedback">{errors}</div>}
      {info && <small className="form-text text-muted">{info}</small>}
    </div>
  );
}

TextAreaGroup.proptypes = {
  value: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.string,
  info: PropTypes.string,
  placeholder: PropTypes.string
};

export default TextAreaGroup;
