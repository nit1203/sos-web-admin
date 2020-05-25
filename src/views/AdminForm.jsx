import React, { useState, useEffect, useRef, useCallback } from "react";
import { Grid, Row, Col, FormGroup, ControlLabel } from "react-bootstrap";
import NotificationSystem from "react-notification-system";
import qs from "qs";

import Card from "components/Card/Card.jsx";
import Button from "components/CustomButton/CustomButton.jsx";
import Checkbox from "components/CustomCheckbox/CustomCheckbox.jsx";

import * as _ from 'lodash';
import "./Dashboard.css";
import Password from "./Fields/Password";
import Input from "./Fields/Input";
import Select from "./Fields/Select";
import ReactSelect from 'react-select'
import { fetcher } from "utils/api";

function AdminForm({ match, history }) {
  const initialFormData = {
    email: "",
    password: "",
    cityid: "",
    conf_password: "",
    isUpdatePwd: false,
    selectedPrivileges: []
  };
  const [isEdit, setIsEdit] = useState(false);
  const [cityLookup, setCityLookup] = useState([]);
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    cityid: "",
    conf_password: "",
  });
  const notificationSystem = useRef(null);
  const getCityLookup = useCallback(() => {
    fetcher({
      url: `getCity.php`,
    })
      .then((res) => {
        const lookup = res.map((city) => ({
          label: city.city_name,
          value: city.city_code,
        }));
        setCityLookup(lookup);
        if (match.params.admin_id) {
          getAdminData(match.params.admin_id, lookup);
        }
      })
      .catch((err) => { });
  }, [match.params.admin_id]);
  useEffect(() => {
    getCityLookup();
    if (match.params.admin_id) {
      setIsEdit(true);
    } else {
      setIsEdit(false);
    }
  }, [match.params.admin_id, getCityLookup]);

  const getAdminData = (adminID, lookup) => {
    fetcher({
      url: `getSubAdminbyid.php/${adminID}`,
    })
      .then((resp) => {
        let res = resp[0];
        res = {
          ...res,
          city_code: res.city_code.replace(/\s/g, "").split(","),
        };
        const selectedCities = lookup.filter((city) =>
          res.city_code.includes(city.value.trim())
        );

        const mapPrivilages = (data) => {
          let d = JSON.parse(data).map(d => ({ value: d, label: _.capitalize(d) }))
          return d
        }
        setFormData({ ...formData, email: res.user_email_id, cityid: selectedCities, selectedPrivileges: mapPrivilages(res.user_privileges) });
      })
      .catch((err) => { });
  };
  const handleInputFieldChange = ({ target: { name, value } }) => {
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };
  const handleSelectFieldChange = (option, { name }) => {
    setFormData((prevState) => ({ ...prevState, [name]: option }));
  };

  const checkValidation = () => {
    let isError = false;
    let errors = {
      email: "",
      password: "",
      cityid: "",
      conf_password: "",
    };
    if (!formData.email) {
      errors = { ...errors, email: "Required" };
      isError = true;
    }
    if (!formData.password) {
      if (!isEdit) {
        errors = { ...errors, password: "Required" };
        isError = true;
      } else if (formData.isUpdatePwd) {
        errors = { ...errors, password: "Required" };
        isError = true;
      }
    }
    if (!formData.cityid) {
      errors = { ...errors, cityid: "Required" };
      isError = true;
    }
    if (formData.isUpdatePwd) {
      if (!formData.conf_password) {
        if (!isEdit) {
          errors = { ...errors, conf_password: "Required" };
          isError = true;
        } else if (formData.isUpdatePwd) {
          errors = { ...errors, conf_password: "Required" };
          isError = true;
        }
      } else if (formData.conf_password !== formData.password) {
        errors = { ...errors, conf_password: "Passwords must match" };
        isError = true;
      }
    }
    setErrors((prevState) => ({ ...prevState, ...errors }));
    return { isError };
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const { isError } = checkValidation();
    if (!isError) {
      let bodyData = {
        email: formData.email,
        password: formData.password,
        cityid: formData.cityid.map((city) => city.value).join(),
        privileges: JSON.stringify(formData.selectedPrivileges.map(privilege => privilege['value']))
      };
      if (isEdit) {
        bodyData = {
          cityid: formData.cityid.map((city) => city.value).join(),
          privileges: JSON.stringify(formData.selectedPrivileges.map(privilege => privilege['value']))
        };
        if (formData.isUpdatePwd) {
          bodyData = {
            ...bodyData,
            password: formData.password,
          };
        }
      }
      fetcher({
        url: isEdit
          ? `addSubAdmin.php/${match.params.admin_id}`
          : "addSubAdmin.php",
        method: "post",
        type: isEdit ? "json" : "text",
        body: qs.stringify(bodyData),
      })
        .then((res) => {
          handleNotificationClick({
            level: "success",
            message: isEdit ? res.message : res,
          });
          if (isEdit) {
            setTimeout(() => {
              history.push("/admin/manage-sub-admin");
            }, 1000);
          } else {
            clearFormData();
          }
        })
        .catch((err) => {
          handleNotificationClick({
            level: "error",
            message: err.message | err,
          });
        });
    }
  };

  const handleNotificationClick = (notificationData) => {
    notificationSystem.current.addNotification({
      title: (
        <div style={{ textAlign: "left" }}>{notificationData.message}</div>
      ),
      level: notificationData.level,
      position: "tr",
      autoDismiss: 15,
    });
  };

  const clearFormData = () => {
    setFormData(initialFormData);
  };
  const onCheckChange = (data) => {
    setFormData((prevState) => ({
      ...prevState,
      isUpdatePwd: !prevState.isUpdatePwd,
    }));
  };
  const renderPassword = () => (
    <Password
      required
      name="password"
      label="Password"
      value={formData.password}
      errors={errors}
      onChange={handleInputFieldChange}
    />
  );
  const renderUpdatePassword = () => {
    return (
      <>
        <FormGroup onClick={onCheckChange}>
          <Checkbox isChecked={formData.isUpdatePwd} label="Change Password" />
        </FormGroup>
        {formData.isUpdatePwd ? (
          <>
            <Password
              required
              name="password"
              label="New Password"
              value={formData.password}
              errors={errors}
              onChange={handleInputFieldChange}
            />
            <Password
              required
              name="conf_password"
              label="Confirm Password"
              value={formData.conf_password}
              errors={errors}
              onChange={handleInputFieldChange}
            />
          </>
        ) : null}
      </>
    );
  };

  const options = [

    { value: 'download', label: 'Download' },
    { value: 'archive', label: 'Archive' },
    { value: 'create', label: 'Create' },
  ];

  const handleChange = selectedPrivileges => {
    setFormData({ ...formData, selectedPrivileges });
    console.log(`Option selected:`, selectedPrivileges);
  };
  return (
    <div className="main-content">
      <NotificationSystem ref={notificationSystem} />
      <Grid fluid>
        <Row>
          <Col className="mt-4" md={4} sm={6} mdOffset={4} smOffset={3}>
            <form onSubmit={handleSubmit}>
              <Card
                title={isEdit ? "Edit Admin" : "Create Admin"}
                content={
                  <>
                    <Input
                      required
                      name="email"
                      label="Email"
                      disabled={isEdit}
                      value={formData.email}
                      errors={errors}
                      onChange={handleInputFieldChange}
                    />
                    {!isEdit ? renderPassword() : null}
                    <Select
                      isMulti
                      required
                      name="cityid"
                      value={formData.cityid}
                      errors={errors}
                      onChange={handleSelectFieldChange}
                      placeholder="Choose City"
                      dataSource={cityLookup}
                    />
                    <FormGroup>
                      <ControlLabel>
                        Set Privileges
                      </ControlLabel>
                      <ReactSelect
                        isMulti={true}
                        value={formData.selectedPrivileges}
                        onChange={handleChange}
                        options={options}
                      />
                    </FormGroup>


                    {isEdit ? renderUpdatePassword() : null}
                  </>

                  // <Button type="submit" fill pullRight bsStyle="primary">
                  //   <i className="fa fa-save" /> Save
                  // </Button>
                }
                legend={
                  <Button type="submit" bsStyle="info" fill wd>
                    <i className="fa fa-save" /> {isEdit ? "Update" : "Create"}
                  </Button>
                }
                ftTextCenter
              />
            </form>
          </Col>
        </Row>
      </Grid>
    </div>
  );
}

export default AdminForm;
