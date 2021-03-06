/*!

=========================================================
* Light Bootstrap Dashboard PRO React - v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-pro-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { useEffect, useState } from "react";
import { Grid, Row, Col } from "react-bootstrap";
import qs from "qs";

import Card from "components/Card/Card.jsx";

import Button from "components/CustomButton/CustomButton.jsx";
import Input from "views/Fields/Input";
import Password from "views/Fields/Password";
import { fetcher } from "utils/api";
import Dashboard from "views/Dashboard";
import { login } from "utils/auth";
import { isLoggedIn } from "utils/auth";

function LoginPage(props) {
  const [cardHidden, setCardHidden] = useState(true);
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLogError, setIsLogError] = useState(false);
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const clearFormData = () => {
    setFormData({ email: "", password: "" });
  };
  useEffect(() => {

    const { auth: login } = isLoggedIn();

    console.log({ login })
    if (login) {
      return props.history.push('/admin/dashboard')
    }
    setTimeout(() => {
      setCardHidden(false);
    }, 700);
    const isAuth = localStorage.getItem("isAuth");
    if (isAuth) {
      //  setIsLoggedIn(true);
    }
  }, []);
  const handleInputFieldChange = ({ target: { name, value } }) => {
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const checkValidation = () => {
    const fields = ["email", "password"];
    let isError = false;
    fields.forEach((field) => {
      if (!formData[field]) {
        isError = true;
        setErrors((prevState) => ({ ...prevState, [field]: "Required" }));
      } else if (formData[field]) {
        setErrors((prevState) => ({ ...prevState, [field]: "" }));
      }
    });
    return { isError };
  };

  const onLogin = (event) => {
    // event.preventDefault();
    setIsLogError(false);
    const { isError } = checkValidation();
    if (!isError) {
      fetcher({
        url: `login.php`,
        method: "post",
        body: qs.stringify(formData),
      })
        .then((res) => {
          if (res.status) {
            //  setIsLoggedIn(true);

            console.log(res)
            window.localStorage.setItem('_auth', JSON.stringify({
              username: res.collection[0].user_email_id,
              token: `${formData.email}${Date.now()}`,
              privileges: res.collection[0].user_privileges
            }))


            clearFormData();
            props.history.push('/admin/dashboard')
            // localStorage.setItem("isAuth", JSON.str(res.collection[0]));
          } else {
            setIsLogError(true);
          }
        })
        .catch((err) => { });
    }
  };



  const customLogin = () => {
    const response = login(formData.email, formData.password)
    console.log(response)
    if (response.auth) {
      props.history.push('/admin/dashboard')
    } else {
      alert(response.message)
    }
  }

  const onSignOut = () => {
    // setIsLoggedIn(false);
    localStorage.removeItem("isAuth");
  };
  const renderLoginContainer = () => (
    <Col className="mt-4" md={4} sm={6} mdOffset={4} smOffset={3}>
      <form >
        <Card
          hidden={cardHidden}
          textCenter
          title="Login"
          content={
            <div>
              <Input
                required
                name="email"
                label="Email"
                placeholder="Enter email"
                errors={errors}
                onChange={handleInputFieldChange}
              />
              <Password
                required
                name="password"
                label="Password"
                errors={errors}
                onChange={handleInputFieldChange}
              />
              {isLogError ? (
                <div className="text-danger">Unauthorized Resource</div>
              ) : (
                  false
                )}
            </div>
          }
          legend={
            <Button type="button"
              onClick={() => {
                onLogin()
              }}
              bsStyle="info" fill wd>
              Login
              <i className="fa fa-sign-in" />
            </Button>
          }
          ftTextCenter
        />
      </form>
    </Col>
  );
  const renderVideos = () => (
    <>
      <Button fill pullRight bsStyle="primary" onClick={onSignOut}>
        <i className="fa fa-sign-out" /> Sign Out
      </Button>
      <Dashboard />
    </>
  );
  return (
    <Grid>
      <Row>{isLoggedIn().auth ? renderVideos() : renderLoginContainer()}</Row>
    </Grid>
  );
}

export default LoginPage;
