import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import ConvertPackage from "../../helpers/convertPackages";
import {getInitials} from "../../helpers/getInitials";



const Header = () => {

  const userData = useSelector((state) => state);
  console.log(userData.user);
  return (
    <>
      <nav class="navbar ms-navbar">
        <div
          class="ms-aside-toggler ms-toggler pl-0"
          data-target="#ms-side-nav"
          data-toggle="slideLeft"
        >
          <span class="ms-toggler-bar bg-primary"></span>
          <span class="ms-toggler-bar bg-primary"></span>
          <span class="ms-toggler-bar bg-primary"></span>
        </div>

        <div class="logo-sn logo-sm ms-d-block-sm">
          <a class="pl-0 ml-0 text-center navbar-brand mr-0" href="index.html">
            <img
              src="assets/img/dashboard/greendash-logo-84x41.png"
              alt="logo"
            />{" "}
          </a>
        </div>

        <ul class="ms-nav-list ms-inline mb-0" id="ms-nav-options">
          <li class="ms-nav-item ms-search-form pb-0 py-0">
            <form class="ms-form" method="post">
              <div class="ms-form-group my-0 mb-0 has-icon fs-14">
                <input
                  type="search"
                  class="ms-form-input fs-12"
                  name="search"
                  placeholder="Search here..."
                  value=""
                />
                <i class="flaticon-search text-disabled"></i>
              </div>
            </form>
          </li>
          <li class="ms-nav-item dropdown">
            <a
              href="index.html#"
              class="text-disabled ms-has-notification"
              id="mailDropdown"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <i class="fa fa-envelope fa-15x"></i>
            </a>
            <ul
              class="dropdown-menu dropdown-menu-right"
              aria-labelledby="mailDropdown"
            >
              <li class="dropdown-menu-header">
                <h6 class="dropdown-header ms-inline m-0">
                  <span class="text-disabled">Mail</span>
                </h6>
                <span class="badge badge-pill badge-success">3 New</span>
              </li>
              <li class="dropdown-divider"></li>
              <li class="ms-scrollable ms-dropdown-list">
                <a class="media p-2" href="index.html#">
                  <div class="ms-chat-status ms-status-offline ms-chat-img mr-2 align-self-center">
                    <img
                      src="assets/img/dashboard/rakhan-potik-1.jpg"
                      class="ms-img-round"
                      alt="people"
                    />
                  </div>
                  <div class="media-body">
                    <span>Hey man, looking forward to your new project.</span>
                    <p class="fs-10 my-1 text-disabled">
                      <i class="material-icons">access_time</i> 30 seconds ago
                    </p>
                  </div>
                </a>
                <a class="media p-2" href="index.html#">
                  <div class="ms-chat-status ms-status-online ms-chat-img mr-2 align-self-center">
                    <img
                      src="assets/img/dashboard/rakhan-potik-2.jpg"
                      class="ms-img-round"
                      alt="people"
                    />
                  </div>
                  <div class="media-body">
                    <span>
                      Dear John, I was told you bought Weedo! Send me your
                      feedback
                    </span>
                    <p class="fs-10 my-1 text-disabled">
                      <i class="material-icons">access_time</i> 28 minutes ago
                    </p>
                  </div>
                </a>
                <a class="media p-2" href="index.html#">
                  <div class="ms-chat-status ms-status-offline ms-chat-img mr-2 align-self-center">
                    <img
                      src="assets/img/dashboard/rakhan-potik-3.jpg"
                      class="ms-img-round"
                      alt="people"
                    />
                  </div>
                  <div class="media-body">
                    <span>
                      How many people are we inviting to the dashboard?
                    </span>
                    <p class="fs-10 my-1 text-disabled">
                      <i class="material-icons">access_time</i> 6 hours ago
                    </p>
                  </div>
                </a>
              </li>
              <li class="dropdown-divider"></li>
              <li class="dropdown-menu-footer text-center">
                <a href="pages/apps/email.html">Go to Inbox</a>
              </li>
            </ul>
          </li>
         

          <li class="ms-nav-item ms-nav-user">
          <div className="header__info">
          <div className="user__avatar bg-warning">
            <h3>{getInitials(userData)} </h3>
          </div>
          <h4 className="title-case text-light">
            {" "}
            {userData?.user.user.fname}  {userData?.user.user.lname} <br />
            <span className="summary__label font-9 role">{userData?.user.user.user_type} ({
               <ConvertPackage id={userData?.user.user.package_id} type={userData?.user.user.user_type} />
            })</span>
          </h4>
        </div>
            
          </li>
        </ul>

        <div
          class="ms-toggler ms-d-block-sm pr-0 ms-nav-toggler"
          data-toggle="slideDown"
          data-target="#ms-nav-options">
          <span class="ms-toggler-bar bg-primary"></span>
          <span class="ms-toggler-bar bg-primary"></span>
          <span class="ms-toggler-bar bg-primary"></span>
        </div>
      </nav>
    </>
  );
}
export default Header;
