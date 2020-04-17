import React, { useState } from "react";
import {
  FormGroup,
  ControlLabel,
  InputGroup,
  FormControl,
} from "react-bootstrap";

function Password({ name, label, value, onChange, errors, required = false }) {
  const [pwdShow, setPwdShow] = useState(false);
  const togglePwdShow = () => {
    setPwdShow((prevState) => !prevState);
  };
  return (
    <FormGroup
      validationState={
        errors && errors[name] ? "error" : value ? "success" : null
      }
    >
      <ControlLabel>
        {label}
        {required ? <span className="text-danger">*</span> : null}
      </ControlLabel>
      <InputGroup className="error">
        <FormControl
          type={pwdShow ? "text" : "password"}
          name={name}
          value={value}
          autoComplete="new-password"
          placeholder={pwdShow ? name : "********"}
          onChange={onChange}
        />
        <InputGroup.Addon onClick={togglePwdShow}>
          {pwdShow ? (
            <i className="fa fa-eye" />
          ) : (
            <i className="fa fa-eye-slash" />
          )}
        </InputGroup.Addon>
      </InputGroup>
      {errors && errors[name] ? (
        <small className="text-danger">{errors[name]}</small>
      ) : null}
    </FormGroup>
  );
}

export default Password;
