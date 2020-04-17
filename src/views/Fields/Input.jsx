import React from "react";
import { FormGroup, ControlLabel, FormControl } from "react-bootstrap";

function Input({
  name,
  onChange,
  errors,
  label,
  value,
  disabled = false,
  novalidate = false,
  required = false,
  ...restData
}) {
  return (
    <FormGroup
      validationState={
        errors && errors[name]
          ? "error"
          : value && !novalidate
          ? "success"
          : null
      }
    >
      <ControlLabel>
        {label} {required ? <span className="text-danger">*</span> : null}
      </ControlLabel>
      <FormControl
        type="text"
        name={name}
        autoComplete="off"
        placeholder={label}
        value={value}
        disabled={disabled}
        onChange={onChange}
        {...restData}
      />
      <FormControl.Feedback />
      {errors && errors[name] ? (
        <small className="text-danger">{errors[name]}</small>
      ) : null}
      {/* <FormControl.Feedback type="invalid"><>asd</></FormControl.Feedback> */}
    </FormGroup>
  );
}

export default Input;
