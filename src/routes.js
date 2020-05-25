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
import Dashboard from "views/Dashboard.jsx";
import History from "views/History.jsx";
import ManageUsers from "views/ManageUsers.jsx";
import AdminForm from "views/AdminForm";
import LoginPage from "views/Pages/LoginPage";
import Archive from "views/Archive";

console.log(localStorage.getItem('_auth'))
var routes = [
  {
    path: "/dashboard",
    layout: "/admin",
    name: "Dashboard",
    icon: "pe-7s-graph",
    component: Dashboard
  },
  {
    path: "/history",
    layout: "/admin",
    name: "History",
    icon: "pe-7s-graph",
    component: History
  },
  {
    path: "/archive",
    layout: "/admin",
    name: "Archive",
    icon: "pe-7s-graph",
    component: Archive
  },
  {
    path: "/manage-sub-admin",
    layout: "/admin",
    name: "Manage Sub Admin",
    icon: "pe-7s-users",
    component: ManageUsers
  },
  {
    path: "/admin-form/:admin_id?",
    layout: "/admin",
    name: "Admin Update",
    icon: "pe-7s-graph",
    redirect: true,
    component: AdminForm
  },
  {
    path: "/sub-admin-login",
    layout: "/admin",
    name: "Sub Admin Login",
    icon: "pe-7s-door-lock",
    component: LoginPage
  }
].filter(route => {
  // const _auth = JSON.parse(localStorage.getItem('_auth'))
  // console.log(_auth)
  // if (_auth && _auth.privileges) {
  //   let roles = JSON.parse(_auth.privileges);

  //   if (roles.includes('download') && roles.includes('create') && roles.includes('archive')) {
  //     return true
  //   } else if (!roles.includes('create')) {
  //     return route.path !== '/manage-sub-admin'
  //   }
  // } else 
  {
    return true
  }
});
export default routes;
