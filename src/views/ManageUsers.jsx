import React, { useState, useEffect, useRef, Suspense } from "react";
import {
  Grid,
  Row,
  Col,
  Table,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import { NavLink } from "react-router-dom";
import SweetAlert from "react-bootstrap-sweetalert";
import NotificationSystem from "react-notification-system";

import Card from "components/Card/Card.jsx";
import Input from "./Fields/Input";
import Button from "components/CustomButton/CustomButton.jsx";
import { fetcher } from "../utils/api";
import { isLoggedIn } from "utils/auth";

const edit = <Tooltip id="edit">Edit Profile</Tooltip>;
const remove = <Tooltip id="remove">Remove</Tooltip>;

function ManageUsers(props) {
  const [deleteAlert, setDeleteAlert] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [adminUsers, setAdminUsers] = useState([]);
  const [auth, setAuth] = useState(false);
  const [filterAdminUsers, setFilterAdminUsers] = useState([]);
  const notificationSystem = useRef(null);
  useEffect(() => {
    const { auth: loggedIn } = isLoggedIn()
    console.log(loggedIn)
    if (!loggedIn) {
      return props.history.push('/admin/sub-admin-login')
    } else {
      setAuth(auth)
      getUsers();
    }

  }, []);
  /* Get Sub admin List */
  const getUsers = () => {
    fetcher({
      url: `getSubAdmin.php`,
    })
      .then((res) => {
        setAdminUsers(res);
        setFilterAdminUsers(res);
      })
      .catch((err) => { });
  };
  /* Delete Sub admin */
  const deleteAdmin = async (adminID) => {
    fetcher({
      url: `delete_sub_admin.php/${adminID}`,
      method: "post",
      type: "text",
    })
      .then((res) => {
        getUsers();
        hideAlert();
        handleNotificationClick({ level: "success", message: res });
      })
      .catch((err) => {
        hideAlert();
        handleNotificationClick({ level: "error", message: err.message | err });
      });
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
  const actions = (admin) => (
    <td className="td-actions text-right">
      <NotificationSystem ref={notificationSystem} />
      <OverlayTrigger placement="top" overlay={edit}>
        <NavLink to={`/admin/admin-form/${admin.id}`} className="nav-link">
          <Button simple bsStyle="success" bsSize="xs">
            <i className="fa fa-edit" />
          </Button>
        </NavLink>
      </OverlayTrigger>
      <OverlayTrigger placement="top" overlay={remove}>
        <Button
          simple
          bsStyle="danger"
          bsSize="xs"
          onClick={() => onDeleteAlert(admin.id)}
        >
          <i className="fa fa-times" />
        </Button>
      </OverlayTrigger>
    </td>
  );

  const hideAlert = () => {
    setDeleteAlert(null);
  };
  const onDeleteAlert = (adminId) => {
    setDeleteAlert(
      <SweetAlert
        warning
        style={{ display: "block", marginTop: "-100px" }}
        title="Are you sure?"
        onConfirm={() => deleteAdmin(adminId)}
        onCancel={hideAlert}
        confirmBtnBsStyle="info"
        cancelBtnBsStyle="danger"
        confirmBtnText="Yes, delete it!"
        cancelBtnText="Cancel"
        showCancel
      >
        This can't be undone & data will be lost
      </SweetAlert>
    );
  };
  const handleInputFieldChange = ({ target: { value } }) => {
    setSearchText(value);
    const filtered = adminUsers.filter((admin) =>
      admin.user_email_id.includes(value)
    );
    setFilterAdminUsers(filtered);
  };
  return (
    <div>
      <Suspense fallback={<h1>Loading...</h1>}>
        {
          <div className="main-content">
            {deleteAlert}
            <Grid fluid>
              <Row>
                <Col md={12}>
                  <Card
                    title={
                      <>
                        Manage Sub Admin
                    <NavLink to={"/admin/admin-form"} className="nav-link">
                          <Button round fill pullRight bsStyle="primary">
                            <i className="fa fa-user-plus" /> Add Sub Admin
                      </Button>
                        </NavLink>
                      </>
                    }
                    tableFullWidth
                    content={
                      <>
                        <Row className="ml-2">
                          <Col md={5}>
                            <Input
                              name="searchText"
                              placeholder="Search by email"
                              novalidate={true}
                              value={searchText}
                              onChange={handleInputFieldChange}
                            />
                          </Col>
                        </Row>
                        {filterAdminUsers.length ? (
                          <Table responsive>
                            <thead>
                              <tr>
                                <th className="text-center">#</th>
                                <th>Email</th>
                                <th>Cities</th>
                                <th className="text-right">Actions</th>
                              </tr>
                            </thead>
                            <tbody>
                              {filterAdminUsers.map((admin, idx) => (
                                <tr key={idx}>
                                  <td className="text-center">{idx + 1}</td>
                                  <td>{admin.user_email_id}</td>
                                  <td>{admin.city_code}</td>
                                  {actions(admin)}
                                </tr>
                              ))}
                            </tbody>
                          </Table>
                        ) : (
                            <h5 className="mx-4">No admin available</h5>
                          )}
                      </>
                    }
                  />
                </Col>
              </Row>
            </Grid>
          </div>
        }
      </Suspense>

    </div>
  );
}

export default ManageUsers;
