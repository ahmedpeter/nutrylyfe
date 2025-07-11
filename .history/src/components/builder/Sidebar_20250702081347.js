import React from "react";
import SidebarRow from './SidebarRow';
import SpeedIcon from '@material-ui/icons/Speed';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import GroupsIcon from '@mui/icons-material/Groups';
import AccessibleIcon from '@mui/icons-material/Accessible';
import AssignmentIcon from '@mui/icons-material/Assignment';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import BuildIcon from '@mui/icons-material/Build';
import AltRouteIcon from '@mui/icons-material/AltRoute';
import LuggageIcon from '@mui/icons-material/Luggage';
import BookOnlineIcon from '@mui/icons-material/BookOnline';
import useLogout from "../../hooks/useLogout";
import PendingActionsIcon from '@mui/icons-material/PendingActions';
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
      <span><i class="fas fa-clipboard-list"></i>Order</span>
    </a>
    
  </li>
  <li class="menu-item">
    <a href="index.html#"  data-target="#product-page" aria-expanded="false" aria-controls="product-page">
      <span><i class="fas fa-cannabis"></i>Products</span>
    </a>
    
  </li>
  <li class="menu-item">
    <a href="index.html#"  data-target="#customer" aria-expanded="false" aria-controls="customer">
      <span><i class="fas fa-users"></i>Customers</span>
    </a>
    <ul id="customer" class="collapse" aria-labelledby="customer" data-parent="#side-nav-accordion">
      <li> <a href="pages/customer/customer.html">Customers-list</a> </li>
      <li> <a href="pages/customer/reviews.html">Reviwes</a> </li>



    </ul>
  </li>
  <li class="menu-item">
    <a href="index.html#"  data-target="#invoice" aria-expanded="false" aria-controls="invoice">
      <span><i class="fas fa-receipt"></i>Invoice</span>
    </a>
    <ul id="invoice" class="collapse" aria-labelledby="invoice" data-parent="#side-nav-accordion">
      <li> <a href="pages/invoice/invoice.html">Invoice</a> </li>
      <li> <a href="pages/invoice/invoice-list.html">Invoice-List</a> </li>



    </ul>
  </li>
  <li class="menu-item">
    <a href="pages/add-product.html">
      <span><i class="far fa-plus-square"></i>Add Product</span>
    </a>
  </li>

  <li class="menu-item">
    <a href="pages/pricing.html">
      <span><i class="fas fa-dollar-sign"></i>Pricing</span>
    </a>
  </li>
  <li class="menu-item">
    <a href="pages/shipment.html">
      <span><i class="fas fa-truck"></i>Shipment</span>
    </a>
  </li>
  <li class="menu-item">
    <a href="pages/shipment.html">
      <span><i class="fas fa-power"></i>Log Out</span>
    </a>
  </li>
  
  
  
</ul>


</aside>
            
        </div>
    )
}

export default Sidebar
