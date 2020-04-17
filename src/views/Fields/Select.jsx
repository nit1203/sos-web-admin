import React from "react";
import ReactSelect from "react-select";
import { FormGroup, ControlLabel } from "react-bootstrap";

function Select({
  name,
  dataSource,
  placeholder,
  isMulti = false,
  errors,
  required = false,
  ...restData
}) {
  return (
    <FormGroup validationState={errors && errors[name] ? "error" : "success"}>
      <ControlLabel>
        Cities {required ? <span className="text-danger">*</span> : null}
      </ControlLabel>
      <ReactSelect
        name={name}
        isMulti={isMulti}
        options={dataSource}
        placeholder={placeholder}
        closeMenuOnSelect={false}
        className="react-select info"
        classNamePrefix="react-select"
        {...restData}
      />
      {errors && errors[name] ? (
        <small className="text-danger">{errors[name]}</small>
      ) : null}
    </FormGroup>
  );
}

export default Select;
