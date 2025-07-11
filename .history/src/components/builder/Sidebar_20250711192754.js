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
        <div className="sidebar no-print">
          <aside id="ms-side-nav" class="side-nav fixed ms-aside-scrollable">

<div class="logo-sn ms-d-block-lg">
  <a class="pl-0 ml-0 text-center" href="index.html"> <img src="../../../Nutry_nameLogo.png" alt="NutryLyfe"/> </a>
</div>


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
        <SidebarRow icon="fa-tachometer-alt" label="Dashboard" href="/dashboard" />
        <SidebarRow icon="fa-clipboard-list" label="Orders" href="/orders" />
        <SidebarRow icon="fa-cannabis" label="Products" href="/products" />
        <SidebarRow icon="fa-users" label="Networkers" href="/networkers" />
        <SidebarRow icon="fa-receipt" label="Reports" href="/reports" />
        <SidebarRow icon="fa-user-circle" label="Stockiest" href="/stockiest" />
        <SidebarRow icon="fa-sign-out-alt" label="Log Out" href="/logout" />
        <SidebarRow icon="fa-power-off" label="Log Out" onClick={logOutUser} />
      </ul>
    </div>
    )
}

export default Sidebar



</aside>
            
        </div>
    )
}

export default Sidebar
