import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

function SelectGroup({ options, name, value, info, errors, onChange }) {
  let optionsField = options.map(opt => (
    <option key={opt.label} value={opt.value}>
      {" "}
      {opt.label}
    </option>
  ));

  return (
    <div className="form-group">
      <select
        className={classnames("form-control form-control-lg", {
          "is-invalid": errors
        })}
        name={name}
        value={value}
        onChange={onChange}
      >
        {optionsField}
      </select>
      {errors && <small className="invalid-feedback">{errors}</small>}
      {info && <small className="form-text text-muted">{info}</small>}
    </div>
  );
}

SelectGroup.proptypes = {
  options: PropTypes.array.isRequired,
  value: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.string,
  info: PropTypes.string
};

export default SelectGroup;
