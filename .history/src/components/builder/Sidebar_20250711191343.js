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


<ul class="accordion ms-main-aside fs-14" id="side-nav-accordion">
 
  <li class="menu-item">
    <a href="index.html#"  data-target="#order-page" aria-expanded="false" aria-controls="order-page">
      <span><i class="fa-solid fa-gauge"></i>Dashboard</span>
    </a>
    
  </li>
  <li class="menu-item">
    <a href="index.html#"  data-target="#order-page" aria-expanded="false" aria-controls="order-page">
      <span><i class="fas fa-clipboard-list"></i>Orders</span>
    </a>
    
  </li>
  <li class="menu-item">
    <a href="index.html#"  data-target="#product-page" aria-expanded="false" aria-controls="product-page">
      <span><i class="fas fa-cannabis"></i>Products</span>
    </a>
    
  </li>
  <li class="menu-item">
    <a href="index.html#"  data-target="#customer" aria-expanded="false" aria-controls="customer">
      <span><i class="fas fa-users"></i>Networkers</span>
    </a>
  </li>
  <li class="menu-item">
    <a href="index.html#"  data-target="#invoice" aria-expanded="false" aria-controls="invoice">
      <span><i class="fas fa-receipt"></i>Reports</span>
    </a>
  </li>
  <li class="menu-item">
    <a href="pages/add-product.html">
      <span><i class="far fa-plus-square"></i>Stockiest</span>
    </a>
  </li>

  <li class="menu-item">
    <a href="pages/add-product.html">
      <span><i class="far fa-plus-square"></i>Stockiest</span>
    </a>
  </li>
  <li class="menu-item" onClick={logOutUser}>
    <p>
      <span><i class="fas fa-power"></i>Log Out</span>
    </p>
  </li>
  
  
  
</ul>


</aside>
            
        </div>
    )
}

export default Sidebar
