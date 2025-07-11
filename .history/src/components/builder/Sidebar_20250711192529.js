import React from "react";
import { Link } from "react-router-dom";
import SidebarRow from "./SidebarRow";
import { useDispatch, useSelector } from "react-redux";
import useLogout from "../../hooks/useLogout";
// import './Builder.css'

function Sidebar() {
  const userInfo = useSelector((state) => state);
  const { logOutUser } = useLogout(userInfo);

    return (
      <div className="side-nav">
      <ul className="accordion ms-main-aside fs-14" id="side-nav-accordion">
        <SidebarMenuItem icon="fa-tachometer-alt" label="Dashboard" href="/dashboard" />
        <SidebarMenuItem icon="fa-clipboard-list" label="Orders" href="/orders" />
        <SidebarMenuItem icon="fa-cannabis" label="Products" href="/products" />
        <SidebarMenuItem icon="fa-users" label="Networkers" href="/networkers" />
        <SidebarMenuItem icon="fa-receipt" label="Reports" href="/reports" />
        <SidebarMenuItem icon="fa-user-circle" label="Stockiest" href="/stockiest" />
        <SidebarMenuItem icon="fa-sign-out-alt" label="Log Out" href="/logout" />
        <SidebarMenuItem icon="fa-power-off" label="Log Out" onClick={logOutUser} />
      </ul>
    </div>
    )
}

export default Sidebar
