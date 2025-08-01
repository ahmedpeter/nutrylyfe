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
            <a class="pl-0 ml-0 text-center" > <img src="../../../nutry_lyfelogo.png" alt="NutryLyfe"/> </a>
          </div>

      <ul className="accordion ms-main-aside fs-14" id="side-nav-accordion">
        <SidebarRow icon="fa-tachometer-alt" label="Dashboard" href="/app/dashboard" />
        <SidebarRow icon="fa-clipboard-list" label="Orders" href="/app/orders" />
        <SidebarRow icon="fa-cannabis" label="Products" href="/app/products" />
        <SidebarRow icon="fa-users" label="Networkers" href="/app/networkers" />
        <SidebarRow icon="fa-address-book" label="Accounts" href="/app/accounts" />
        <SidebarRow icon="fa-cube" label="Packages" href="/app/packages" />
        <SidebarRow icon="fa-receipt" label="Reports" href="/app/reports" />
        <SidebarRow icon="fa-briefcase" label="Stockiest" href="/app/stockiest" />
        <SidebarRow icon="fa-power-off" label="Log Out" onClick={logOutUser} />
      </ul>
   
   {/* <span className="copyright">
     &copy; 2025. All Rights Reserved
   </span> */}
</aside>
            
        </div>
    )
}

export default Sidebar
