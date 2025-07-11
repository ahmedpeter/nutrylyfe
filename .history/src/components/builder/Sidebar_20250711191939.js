import React from "react";
import { Link } from "react-router-dom";
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


<ul className="accordion ms-main-aside fs-14" id="side-nav-accordion">
      <Sidebar icon="fa-tachometer-alt" label="Dashboard" href="/dashboard" />
      <Sidebar icon="fa-clipboard-list" label="Orders" href="/orders" />
      <Sidebar icon="fa-cannabis" label="Products" href="/products" />
      <Sidebar icon="fa-users" label="Networkers" href="/networkers" />
      <Sidebar icon="fa-receipt" label="Reports" href="/reports" />
      <Sidebar icon="fa-user-circle" label="Stockiest" href="/stockiest" />
      <Sidebar icon="fa-sign-out-alt" label="Log Out" href="/logout" />
      <Sidebar icon="fa-power" label="Log Out" onClick={logOutUser} />
    </ul>


</aside>
            
        </div>
    )
}

export default Sidebar
