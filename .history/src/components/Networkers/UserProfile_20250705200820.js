import * as React from "react";
import currency from "../../utils/formatCurrency";
import { useState, useEffect } from "react";
import { useFormik } from "formik";
import { statesAndLgas } from '../../helpers/states';
import * as Yup from "yup";
import query from "../../helpers/query.ts";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import moment from "moment";

const UserProfile = () => {
  const [newDriverModal, setNewDriverModal] = useState(false);
  const handleModalClose = () => setNewDriverModal(false);
  const userInfo = useSelector((state) => state);
    const [packageList, setPackageList] = useState([]);
    const [myNetworkList, setMyNetworkList] = useState([]);
    const [selectedState, setSelectedState] = useState('');
  const [lgas, setLgas] = useState([]);

    const navigate = useNavigate();
  const [alertText, setAlert] = useState("");
  const [loading, setLoading] = useState(false);


  const handleStateChange = (e) => {
    const stateName = e.target.value;
    setSelectedState(stateName);
    formik.setFieldValue("state", stateName);
    formik.setFieldValue("lga", ""); // Clear LGA
    const found = statesAndLgas.find((s) => s.state === stateName);
    setLgas(found ? found.lgas : []);
  };


//   Add New Stockiest

const formik = useFormik({
    initialValues: {
      name: "",
      lga: "",
      ref_id: "",
      state: "",
      package_id: "",
      email: "",
      phone: "",
      address: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Full name is required"),
      lga: Yup.string().required("LGA is required"),
      ref_id: Yup.string().required("Ref ID is required"),
      state: Yup.string().required("Stockiest location is required"),
      package_id: Yup.string().required("Package type is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
      phone: Yup.string().required("Phone is required"),
      address: Yup.string().required("address is required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      console.log("Form data submitted:", values);
      setLoading(true);
      const response = await query({
        method: "POST",
        url: "/auth/register/stockist",
        bodyData: values,
      });
      setLoading(false);
      setAlert(response.data.message);
        resetForm();
      console.log(response);
    },
  });
//   Get all Packages

  const getAllPackages = async () => {
    setLoading(true);
    if (!userInfo.user.user.token) {
      navigate("/auth/login");
    }
    // console.log(userType);
    const response = await query({
      method: "GET",
      url: "/account-packages/all",
      token: userInfo?.user?.user.token,
    });
    console.log(response);
    if (response.success) {
      setLoading(false);
      console.log(response);
      setPackageList(response?.data?.data.packages);
    } else {
      console.log(response);
      setAlert(response?.data?.message);
      setLoading(false);
    }
  };

  


  useEffect(() => {
    getAllPackages();
  }, []);


  return (
    <section>
    <div class="ms-content-wrapper">

<div class="ms-profile-overview">
  <div class="ms-profile-cover">
    <img class="ms-profile-img" src="../../assets/img/dashboard/rakhan-potik-1.jpg" alt="people"/>
    <div class="ms-profile-user-info">
      <h1 class="ms-profile-username">Chihoo Hwang</h1>
      <h2 class="ms-profile-role">Professional UX Manager</h2>
    </div>
    <div class="ms-profile-user-buttons">
      <a href="user-profile.html#" class="btn btn-primary"> <i class="material-icons">person_add</i> Follow</a>
      <a href="user-profile.html#" class="btn btn-light"> <i class="material-icons">file_download</i> Download Resume</a>
    </div>
  </div>
  <ul class="ms-profile-navigation nav nav-tabs tabs-bordered" role="tablist">
    <li role="presentation"><a href="user-profile.html#tab1" aria-controls="tab1" class="active show" role="tab" data-toggle="tab"> Overview </a></li>
    <li role="presentation"><a href="user-profile.html#tab2" aria-controls="tab2" role="tab" data-toggle="tab"> Professional Skills </a></li>
    <li role="presentation"><a href="user-profile.html#tab3" aria-controls="tab3" role="tab" data-toggle="tab"> Portfolio </a></li>
  </ul>
  <div class="tab-content">
    <div class="tab-pane" id="tab1">

    </div>
    <div class="tab-pane" id="tab2">

    </div>
    <div class="tab-pane" id="tab3">

    </div>
  </div>
</div>

<div class="row">

  <div class="col-xl-7 col-md-12">
    <div class="ms-panel ms-panel-fh">
      <div class="ms-panel-body">
        <h2 class="section-title">About Me</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean non elit nisl. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.
          Aenean luctus, justo id pellentesque imperdiet, augue metus ornare quam, in pulvinar massa erat nec dui. Nam at facilisis nulla.
        </p>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean non elit nisl. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.
          Aenean luctus, justo id pellentesque imperdiet, augue metus ornare quam, in pulvinar massa erat nec dui. Nam at facilisis nulla.
        </p>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean non elit nisl. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.
          Aenean luctus, justo id pellentesque imperdiet, augue metus ornare quam, in pulvinar massa erat nec dui. Nam at facilisis nulla.
        </p>

        <div class="ms-profile-skills">
          <h2 class="section-title">Professional Skills</h2>
          <ul class="ms-skill-list">
            <li class="ms-skill">Web Design</li>
            <li class="ms-skill">Development</li>
            <li class="ms-skill">Interface Design</li>
            <li class="ms-skill">Illustration</li>
            <li class="ms-skill">Brand Design</li>
            <li class="ms-skill">Adobe</li>
          </ul>
        </div>

      </div>

    </div>
  </div>
  <div class="col-xl-5 col-md-12">
    <div class="ms-panel ms-panel-fh">
      <div class="ms-panel-body">
        <ul class="ms-profile-stats">
          <li>
            <h3 class="ms-count">5790</h3>
            <span>Followers</span>
          </li>
          <li>
            <h3 class="ms-count">4.8</h3>
            <span>User Rating</span>
          </li>
        </ul>
        <h2 class="section-title">Basic Information</h2>
        <table class="table ms-profile-information">
          <tbody>
            <tr>
              <th scope="row">Full Name</th>
              <td>Chihoo Hwang</td>
            </tr>
            <tr>
              <th scope="row">Birthday</th>
              <td>January 25th, 1996</td>
            </tr>
            <tr>
              <th scope="row">Language</th>
              <td>English (US)</td>
            </tr>
            <tr>
              <th scope="row">Website</th>
              <td>www.example.com</td>
            </tr>
            <tr>
              <th scope="row">Phone Number</th>
              <td>+123 456 789</td>
            </tr>
            <tr>
              <th scope="row">Email Address</th>
              <td>example@mail.com</td>
            </tr>
            <tr>
              <th scope="row">Location</th>
              <td>New York, USA</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>

  <div class="col-md-12">
    <div class="ms-panel">
      <div class="ms-panel-body">
        <h2 class="section-title">Work Experience</h2>
        <div class="row">
          <div class="col-xl-4 col-md-6 col-sm-12">
            <div class="media ms-profile-experience">
              <div class="mr-2 align-self-center">
                <img src="../../assets/img/dashboard/rakhan-potik-1.jpg" class="ms-img-round ms-img-small" alt="people"/>
              </div>
              <div class="media-body">
                <h4>User Research Hub</h4>
                <p>January 2013 to Present</p>
                <p>UX Manager</p>
              </div>
            </div>
          </div>
          <div class="col-xl-4 col-md-6 col-sm-12">
            <div class="media ms-profile-experience">
              <div class="mr-2 align-self-center">
                <img src="../../assets/img/dashboard/rakhan-potik-2.jpg" class="ms-img-round ms-img-small" alt="people"/>
              </div>
              <div class="media-body">
                <h4>User Research Hub</h4>
                <p>January 2013 to Present</p>
                <p>UX Manager</p>
              </div>
            </div>
          </div>
          <div class="col-xl-4 col-md-6 col-sm-12">
            <div class="media ms-profile-experience">
              <div class="mr-2 align-self-center">
                <img src="../../assets/img/dashboard/rakhan-potik-3.jpg" class="ms-img-round ms-img-small" alt="people"/>
              </div>
              <div class="media-body">
                <h4>User Research Hub</h4>
                <p>January 2013 to Present</p>
                <p>UX Manager</p>
              </div>
            </div>
          </div>
          <div class="col-xl-4 col-md-6 col-sm-12">
            <div class="media ms-profile-experience">
              <div class="mr-2 align-self-center">
                <img src="../../assets/img/dashboard/rakhan-potik-3.jpg" class="ms-img-round ms-img-small" alt="people"/>
              </div>
              <div class="media-body">
                <h4>User Research Hub</h4>
                <p>January 2013 to Present</p>
                <p>UX Manager</p>
              </div>
            </div>
          </div>
          <div class="col-xl-4 col-md-6 col-sm-12">
            <div class="media ms-profile-experience">
              <div class="mr-2 align-self-center">
                <img src="../../assets/img/dashboard/rakhan-potik-4.jpg" class="ms-img-round ms-img-small" alt="people"/>
              </div>
              <div class="media-body">
                <h4>User Research Hub</h4>
                <p>January 2013 to Present</p>
                <p>UX Manager</p>
              </div>
            </div>
          </div>
          <div class="col-xl-4 col-md-6 col-sm-12">
            <div class="media ms-profile-experience">
              <div class="mr-2 align-self-center">
                <img src="../../assets/img/dashboard/rakhan-potik-5.jpg" class="ms-img-round ms-img-small" alt="people"/>
              </div>
              <div class="media-body">
                <h4>User Research Hub</h4>
                <p>January 2013 to Present</p>
                <p>UX Manager</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="col-xl-6 col-md-12">
    <div class="ms-panel ms-panel-fh">
      <div class="ms-panel-body">
        <h2 class="section-title">Skill level</h2>
        <span class="progress-label">Web Design</span><span class="progress-status">83%</span>
        <div class="progress progress-tiny">
          <div class="progress-bar bg-primary" role="progressbar" style={{width: "83%"}} ></div>
        </div>
        <span class="progress-label">Development</span><span class="progress-status">50%</span>
        <div class="progress progress-tiny">
          <div class="progress-bar bg-primary" role="progressbar" style={{width: "50%"}}></div>
        </div>
        <span class="progress-label">Interface Design</span><span class="progress-status">75%</span>
        <div class="progress progress-tiny">
          <div class="progress-bar bg-primary" role="progressbar" style="width: 75%" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
        </div>
        <span class="progress-label">Illustration</span><span class="progress-status">92%</span>
        <div class="progress progress-tiny">
          <div class="progress-bar bg-primary" role="progressbar" style="width: 92%" aria-valuenow="92" aria-valuemin="0" aria-valuemax="100"></div>
        </div>
        <span class="progress-label">Brand Design</span><span class="progress-status">97%</span>
        <div class="progress progress-tiny">
          <div class="progress-bar bg-primary" role="progressbar" style="width: 97%" aria-valuenow="97" aria-valuemin="0" aria-valuemax="100"></div>
        </div>
        <span class="progress-label">Adobe</span><span class="progress-status">90%</span>
        <div class="progress progress-tiny">
          <div class="progress-bar bg-primary" role="progressbar" style="width: 90%" aria-valuenow="90" aria-valuemin="0" aria-valuemax="100"></div>
        </div>
      </div>
    </div>
  </div>
  <div class="col-xl-6 col-md-12">
    <div class="ms-panel">
      <div class="ms-panel-body">
        <h2 class="section-title">My Timeline</h2>
        <ul class="ms-activity-log">
          <li>
            <div class="ms-btn-icon btn-pill icon btn-success">
              <i class="flaticon-tick-inside-circle"></i>
            </div>
            <h6>Computer Science Degree</h6>
            <span> <i class="material-icons">event</i>1 January, 2018</span>
            <p class="fs-14">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque scelerisque diam non nisi semper, ula in sodales vehicula....</p>
          </li>
          <li>
            <div class="ms-btn-icon btn-pill icon btn-info">
              <i class="flaticon-information"></i>
            </div>
            <h6>Landed first Job</h6>
            <span> <i class="material-icons">event</i>4 March, 2018</span>
            <p class="fs-14">Curabitur purus sem, malesuada eu luctus eget, suscipit sed turpis. Nam pellentesque felis vitae justo accumsan, sed semper nisi sollicitudin...</p>
          </li>
          <li>
            <div class="ms-btn-icon btn-pill icon btn-success">
              <i class="flaticon-tick-inside-circle"></i>
            </div>
            <h6>Started my own Company</h6>
            <span> <i class="material-icons">event</i>1 March, 2020</span>
            <p class="fs-14">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque scelerisque diam non nisi semper, ula in sodales vehicula....</p>
          </li>
        </ul>
      </div>
    </div>
  </div>

  <div class="col-md-12">
    <div class="ms-panel">
      <div class="ms-panel-body">
        <h2 class="section-title">Your Latest Posts</h2>
        <div class="row">
          <div class="col-lg-4 col-md-6 col-sm-6">
            <div class="ms-card">
              <div class="ms-card-body">
                <div class="media fs-14">
                  <div class="mr-2 align-self-center">
                    <img src="../../assets/img/dashboard/rakhan-potik-1.jpg" class="ms-img-round" alt="people"/>
                  </div>
                  <div class="media-body">
                    <h6>John Doe </h6>
                    <div class="dropdown float-right">
                      <a href="user-profile.html#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <i class="material-icons">more_vert</i>
                      </a>
                      <ul class="dropdown-menu dropdown-menu-right">
                        <li class="ms-dropdown-list">
                          <a class="media p-2" href="user-profile.html#">
                            <div class="media-body">
                              <span>Comment</span>
                            </div>
                          </a>
                          <a class="media p-2" href="user-profile.html#">
                            <div class="media-body">
                              <span>Share</span>
                            </div>
                          </a>
                          <a class="media p-2" href="user-profile.html#">
                            <div class="media-body">
                              <span>Favorite</span>
                            </div>
                          </a>
                        </li>
                      </ul>
                    </div>
                    <p class="fs-12 my-1 text-disabled">30 seconds ago</p>
                  </div>

                </div>
                <h6>This is a card Title</h6>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nunc velit, dictum eget nulla a, sollicitudin rhoncus orci. Vivamus nec commodo turpis.</p>
              </div>
              <div class="ms-card-img">
                <img src="../../assets/img/dashboard/product-2-530x240.jpg" alt="card_img"/>
              </div>
              <div class="ms-card-footer text-disabled d-flex">
                <div class="ms-card-options">
                  <i class="material-icons">favorite</i> 982
                </div>
                <div class="ms-card-options">
                  <i class="material-icons">comment</i> 785
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-4 col-md-6 col-sm-6">
            <div class="ms-card">
              <div class="ms-card-body">
                <div class="media fs-14">
                  <div class="mr-2 align-self-center">
                    <img src="../../assets/img/dashboard/rakhan-potik-2.jpg" class="ms-img-round" alt="people"/>
                  </div>
                  <div class="media-body">
                    <h6>John Doe </h6>
                    <div class="dropdown float-right">
                      <a href="user-profile.html#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <i class="material-icons">more_vert</i>
                      </a>
                      <ul class="dropdown-menu dropdown-menu-right">
                        <li class="ms-dropdown-list">
                          <a class="media p-2" href="user-profile.html#">
                            <div class="media-body">
                              <span>Comment</span>
                            </div>
                          </a>
                          <a class="media p-2" href="user-profile.html#">
                            <div class="media-body">
                              <span>Share</span>
                            </div>
                          </a>
                          <a class="media p-2" href="user-profile.html#">
                            <div class="media-body">
                              <span>Favorite</span>
                            </div>
                          </a>
                        </li>
                      </ul>
                    </div>
                    <p class="fs-12 my-1 text-disabled">30 seconds ago</p>
                  </div>

                </div>
                <h6>This is a card Title</h6>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nunc velit, dictum eget nulla a, sollicitudin rhoncus orci. Vivamus nec commodo turpis.</p>
              </div>
              <div class="ms-card-img">
                <img src="../../assets/img/dashboard/product-1-530x240.jpg" alt="card_img"/>
              </div>
              <div class="ms-card-footer text-disabled d-flex">
                <div class="ms-card-options">
                  <i class="material-icons">favorite</i> 982
                </div>
                <div class="ms-card-options">
                  <i class="material-icons">comment</i> 785
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-4 col-md-6 col-sm-6">
            <div class="ms-card">
              <div class="ms-card-body">
                <div class="media fs-14">
                  <div class="mr-2 align-self-center">
                    <img src="../../assets/img/dashboard/rakhan-potik-3.jpg" class="ms-img-round" alt="people"/>
                  </div>
                  <div class="media-body">
                    <h6>John Doe </h6>
                    <div class="dropdown float-right">
                      <a href="user-profile.html#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <i class="material-icons">more_vert</i>
                      </a>
                      <ul class="dropdown-menu dropdown-menu-right">
                        <li class="ms-dropdown-list">
                          <a class="media p-2" href="user-profile.html#">
                            <div class="media-body">
                              <span>Comment</span>
                            </div>
                          </a>
                          <a class="media p-2" href="user-profile.html#">
                            <div class="media-body">
                              <span>Share</span>
                            </div>
                          </a>
                          <a class="media p-2" href="user-profile.html#">
                            <div class="media-body">
                              <span>Favorite</span>
                            </div>
                          </a>
                        </li>
                      </ul>
                    </div>
                    <p class="fs-12 my-1 text-disabled">30 seconds ago</p>
                  </div>

                </div>
                <h6>This is a card Title</h6>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nunc velit, dictum eget nulla a, sollicitudin rhoncus orci. Vivamus nec commodo turpis.</p>
              </div>
              <div class="ms-card-img">
                <img src="../../assets/img/dashboard/product-3-530x240.jpg" alt="card_img"/>
              </div>
              <div class="ms-card-footer text-disabled d-flex">
                <div class="ms-card-options">
                  <i class="material-icons">favorite</i> 982
                </div>
                <div class="ms-card-options">
                  <i class="material-icons">comment</i> 785
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

</div>


</div>
    </section>
  );
};

export default UserProfile;
