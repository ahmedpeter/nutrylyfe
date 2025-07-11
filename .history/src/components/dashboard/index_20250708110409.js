// import * as React from "react";
import * as React from "react";
import { useState, useEffect } from "react";
import currency from "../../utils/formatCurrency";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import moment from "moment";
import * as Yup from "yup";
import Modal from "@mui/material/Modal";
import { useFormik } from "formik";
import query from "../../helpers/query.ts";
import ConvertPackage from "../../helpers/convertPackages";

const Dashboard = () => {
  const [productList, setProductList] = useState(null);
  const [availableProducts, setAvailableProducts] = useState(null);
  const handleModalClose = () => setUpdateProductModal(false);
  const [userProfile, setUserProfile] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [alertText, setAlert] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [updateProductModal, setUpdateProductModal] = useState(false);
  
  const userInfo = useSelector((state) => state);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: selectedProduct?.name || "",
      pv: selectedProduct?.pv || "",
      price: selectedProduct?.price || "",
      available:  "",
      quantity:  "",
    },
    validationSchema: Yup.object({
      quantity: Yup.string().required("Quantity available is required"),
      availability: Yup.string().required("Availability status is required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      setLoading(true);
      const response = await query({
        method: "POST",
        url: `/stockist/products/update-quantity/${selectedProduct.id}`,
        bodyData: values,
        token: userInfo?.user?.user.token,
      });
      setLoading(false);

      if (response.success) {
        console.log(response);
        resetForm();
        getAvailableProducts(); 
        setUpdateProductModal(false);
        setIsEditMode(false);
      } else {
        setAlert(response?.data?.message);
      }
    },
  });


  const getUserProfile = async () => {
    setLoading(true);
    if (!userInfo.user.user.token) {
      navigate("/auth/login");
    }
    const response = await query({
      method: "GET",
      url: "/profile",
      token: userInfo?.user?.user.token,
    });
    console.log(response);
    if (response.success) {
      setLoading(false);
      console.log(response);
      setUserProfile(response?.data.data.user);
    } else {
      console.log(response);
      setAlert(response?.data?.message);
      setLoading(false);
    }
    console.log(userProfile);
  };

  const getAvailableProducts = async () => {
    setLoading(true);
    if (!userInfo.user.user.token) {
      navigate("/auth/login");
    }
    // console.log(userType);
    const response = await query({
      method: "GET",
      // url: "/stockist/products/get-system-products",
      url: "/stockist/products/get-all-my-products",
      token: userInfo?.user?.user.token,
    });
    console.log(response);
    if (response.success) {
      setLoading(false);
      console.log(response);
      setAvailableProducts(response?.data?.data);
    } else {
      console.log(response);
      setAlert(response?.data?.message);
      setTimeout(() => setAlert(""), 5000);
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log(userInfo);
    getUserProfile();
    if(userInfo?.user?.user.user_type === "Stockist") {
      getAllProducts();
      getAvailableProducts();
    }
  }, []);


  const getAllProducts = async () => {
    setLoading(true);
    if (!userInfo.user.user.token) {
      navigate("/auth/login");
    }
    // console.log(userType);
    const response = await query({
      method: "GET",
      url: "/stockist/products/get-system-products",
      token: userInfo?.user?.user.token,
    });
    console.log(response);
    if (response.success) {
      setLoading(false);
      console.log(response);
      setProductList(response?.data?.data.data);
    } else {
      console.log(response);
      setAlert(response?.data?.message);
      setTimeout(() => setAlert(""), 5000);
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log(userInfo);
    getUserProfile();
    if(userInfo?.user?.user.user_type === "Stockist") {
      getAllProducts();
    }
  }, []);

  return (
    <section>
      <div class="col-md-12">
        <div class="ms-panel">
          <div class="ms-panel-header">
            <div class="d-flex justify-content-between">
              <div class="ms-header-text">
                <h6>Recent Activities</h6>
                <p>Quick Overview on your Nutrylyfe Account <span class="badge badge-success">{userInfo?.user.user.my_ref_id}</span> </p>
              </div>
            </div>
          </div>
          <div class="ms-panel-body pb-0">
            <div class="row">
 <div class="col-xl-4 col-md-6">
                <div class="ms-card card-facebook ms-widget ms-infographics-widget">
                  <div class="ms-card-body media">
                    <div class="media-body">
                      <h6>Downlines</h6>
                      <section className="flex__downlines">
                      <div>
                         <p class="ms-card-change">
                        {" "}
                        <i class="material-icons">arrow_upward</i> { userProfile?.referrals?.length }
                      </p>
                      <p class="fs-9 mt-7">Direct Referral</p>
                      </div>
                      <div>
                         <p class="ms-card-change">
                        {" "}
                        <i class="material-icons">arrow_upward</i> 9,289
                      </p>
                      <p class="fs-9 mt-7">Indirect Referral</p>
                      </div>
                     </section>
                    </div>
                  </div>
                  <i class="fab fa-facebook"></i>
                </div>
              </div>
              <div class="col-xl-4 col-md-6">
                  <div class="ms-card card-linkedin ms-widget ms-infographics-widget">
                    <div class="ms-card-body media">
                      <div class="media-body">
                        <h6>My Wallet</h6>
                        <p class="ms-card-change"> <i class="material-icons">arrow_upward</i> {currency(userInfo?.user.user.wallet)}</p>
                        <p class="fs-9 mt-7">See more</p>
                      </div>
                    </div>
                    <i class="fab fa-twitter-square"></i>
                  </div>
                </div>
              <div class="col-xl-4 col-md-6">
                  <div class="ms-card card-twitter ms-widget ms-infographics-widget">
                    <div class="ms-card-body media">
                      <div class="media-body">
                        <h6>My Point Value</h6>
                        <p class="ms-card-change"> <i class="material-icons">arrow_upward</i> {userInfo?.user.user.pv}</p>
                        <p class="fs-9 mt-7">See more</p>
                      </div>
                    </div>
                    <i class="fab fa-twitter-square"></i>
                  </div>
                </div>
            </div>
          </div>
        </div>
      </div>
      <div class="ms-content-wrapper">
        <div class="row">
        {userInfo?.user.user.user_type === "Networker" && (
          <div class="col-xl-12 col-md-12">
            <div class="ms-panel ms-panel-fh ms-crypto-orders">
              <div class="ms-panel-header">
                <div class="d-flex justify-content-between">
                  <div class="ms-header-text">
                    <h6>Recent Downlines</h6>
                    <p>See how you and your team are doing</p>
                  </div>
                  <ul
                    class="btn-group btn-group-toggle nav nav-tabs ms-graph-metrics"
                    role="tablist"
                  >
                    <li role="presentation">
                      <a
                        class="btn btn-sm active show"
                        role="tab"
                        data-toggle="tab"
                        aria-selected="true"
                      >
                        Add Networker
                      </a>
                    </li>
                    <li role="presentation">
                      <a
                        class="btn btn-sm"
                        role="tab"
                        data-toggle="tab"
                        aria-selected="false"
                      >
                        See Genealogy
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="ms-panel-body p-0">
                <div class="tab-content">
                  <div
                    role="tabpanel"
                    class="tab-pane fade in active show"
                    id="b-orders"
                  >
                    <div class="table-responsive">
                      <table class="table table-hover thead-light">
                        <thead>
                          <tr>
                            <th scope="col">Account Name</th>
                            <th scope="col">Ref ID</th>
                            <th scope="col">Username</th>
                            <th scope="col">Package</th>
                            <th scope="col">Contact</th>
                            <th scope="col">Reg. Date</th>
                          </tr>
                        </thead>
                        <tbody>
                        {userProfile?.referrals?.map((refer, i) => (
                          <tr key={refer.id}>
                            <td>{refer.name}</td>
                            <td>
                            {refer.my_ref_id}
                            </td>
                            <td>{refer.username}</td>
                            <td>{refer.package_id}</td>
                            <td>{refer.phone}
                            </td>
                            <td>{moment(refer.created_at).format("lll")}</td>
                          </tr>
                        ))}
                         
                        </tbody>
                      </table>
                    </div>
                  </div>
                  
                </div>
              </div>
            </div>
          </div>

)}
{userInfo?.user.user.user_type === "Stockist" && (
          <div class="col-xl-12 col-md-12">
            <div class="ms-panel ms-panel-fh ms-crypto-orders">
              <div class="ms-panel-header">
                <div class="d-flex justify-content-between">
                  <div class="ms-header-text">
                    <h6>Available Products in Store</h6>
                    <p>Update Your Product Status and Availability</p>
                  </div>
                </div>
              </div>
              <div class="ms-panel-body p-0">
                <div class="tab-content">
                  <div
                    role="tabpanel"
                    class="tab-pane fade in active show"
                    id="b-orders"
                  >
                    <div class="table-responsive">
                      <table class="table table-hover thead-light">
                        <thead>
                          <tr>
                            <th scope="col">S/N</th>
                            <th scope="col">Product Name</th>
                            <th scope="col">Product Cost</th>
                            <th scope="col">Product PV</th>
                            <th scope="col">Product Quantity</th>
                            <th scope="col">Product Status</th>
                            <th scope="col">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                        {availableProducts?.map((product, i) => (
                          <tr key={product.id}>
                            <td>{ i + 1 }</td>
                            <td>{product.product.name}</td>
                            <td>
                            {currency(product.product.price)}
                            </td>
                            <td>{product.pv}</td>
                            <td>{product.quantity}</td>
                            <td>{product.status}</td>
                            <td> 
                              
                            <div
                                  className="pointer"
                                  onClick={() => {
                                    console.log(product);
                                    setUpdateProductModal(true);
                                    setSelectedProduct(product);
                                    setIsEditMode(true);
                                  }}
                                >
                                  <i class="fas fa-pencil-alt"></i>
                                </div>
                                
                                 </td>
                          </tr>
                        ))}
                         
                        </tbody>
                      </table>
                    </div>
                  </div>
                  
                </div>
              </div>
            </div>
          </div>
)}


{userInfo?.user.user.user_type === "Stockist" && (
          <div class="col-xl-12 col-md-12">
            <div class="ms-panel ms-panel-fh ms-crypto-orders">
              <div class="ms-panel-header">
                <div class="d-flex justify-content-between">
                  <div class="ms-header-text">
                    <h6>Nutrylyfe Products</h6>
                    <p>Update Your Product Status and Availability</p>
                  </div>
                </div>
              </div>
              <div class="ms-panel-body p-0">
                <div class="tab-content">
                  <div
                    role="tabpanel"
                    class="tab-pane fade in active show"
                    id="b-orders"
                  >
                    <div class="table-responsive">
                      <table class="table table-hover thead-light">
                        <thead>
                          <tr>
                            <th scope="col">S/N</th>
                            <th scope="col">Product Name</th>
                            <th scope="col">Product Cost</th>
                            <th scope="col">Product PV</th>
                            <th scope="col">Product Quantity</th>
                            <th scope="col">Product Status</th>
                            <th scope="col">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                        {productList?.map((product, i) => (
                          <tr key={product.id}>
                            <td>{ i + 1 }</td>
                            <td>{product.product.name}</td>
                            <td>
                            {currency(product.product.price)}
                            </td>
                            <td>{product.pv}</td>
                            <td>{product.quantity}</td>
                            <td>{product.status}</td>
                            <td> 
                              
                            <div
                                  className="pointer"
                                  onClick={() => {
                                    console.log(product);
                                    setUpdateProductModal(true);
                                    setSelectedProduct(product);
                                    setIsEditMode(true);
                                  }}
                                >
                                  <i class="fas fa-pencil-alt"></i>
                                </div>
                                
                                 </td>
                          </tr>
                        ))}
                         
                        </tbody>
                      </table>
                    </div>
                  </div>
                  
                </div>
              </div>
            </div>
          </div>
)}
           <div class="col-xl-8 col-md-12">
           <div class="ms-panel ms-crypto-orders-expanded">
              <div class="ms-panel-header">
                <div class="d-flex justify-content-between">
                  <div class="ms-header-text">
                    <h6>Order History</h6>
                    <p>Track your active orders</p>
                  </div>
                </div>
              </div>
              <div class="ms-panel-body p-0">
                <div class="table-responsive">
                  <table class="table table-hover thead-primary ">
                    <thead>
                      <tr>
                        <th scope="col">Order Date</th>
                        <th scope="col">Networker</th>
                        <th scope="col">User ID</th>
                        <th scope="col">Amount</th>
                        <th scope="col">Category</th>
                        <th scope="col">Orders</th>
                        <th scope="col">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>12.01.2020</td>
                        <td>Hemp Oil</td>
                        <td>#TR137381</td>
                        <td>$900.50</td>
                        <td> Oil </td>

                        <td>$5.85</td>
                        <td>
                        <span class="badge badge-success">Completed</span>
                        </td>
                      </tr>
                      <tr>
                        <td>11.01.2020</td>
                        <td>Gummy Bears</td>
                        <td>#TR371893</td>
                        <td>$335.50</td>
                        <td> Edibles </td>

                        <td>$5.85</td>
                        <td><span class="badge badge-danger">Pending</span></td>
                      </tr>
                      <tr>
                        <td>10.01.2020</td>
                        <td>Mango Kush</td>
                        <td>#TR137381</td>
                        <td>$378.50</td>
                        <td> Plants </td>

                        <td>$5.85</td>
                        <td><span class="badge badge-danger">Pending</span></td>
                      </tr>
                      <tr>
                        <td>09.01.2020</td>
                        <td>Purple Haze</td>
                        <td>#TR371893</td>
                        <td>$219.30</td>
                        <td> FLowers</td>

                        <td>$5.85</td>
                        <td>
                        <span class="badge badge-success">Completed</span>
                        </td>
                      </tr>
                      <tr>
                        <td>08.01.2020</td>
                        <td>UK Cheese</td>
                        <td>#TR137381</td>
                        <td>$438.50</td>
                        <td>Leafs</td>

                        <td>$5.85</td>
                        <td><span class="badge badge-danger">Pending</span></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
         
             </div>
          <div class="col-xl-4 col-md-12">
            <div class="ms-panel ms-panel-fh">
              <div class="ms-panel-header spbtw">
                <h6>Stockiest Center(s)</h6>
                <p class="fs-9 mt-7">See all</p>
              </div>
              <div class="ms-panel-body p-0">
                <div class="ms-social-media-followers">
                  <div class="ms-social-grid">
                    <i class="fas fa-shopping-cart bg-linkedin"></i>
                    <p class="ms-text-dark">Stacey Stores</p>
                    <span>Abuja (Kubwa)</span>
                  </div>
                  <div class="ms-social-grid">
                  <i class="fas fa-shopping-cart bg-linkedin"></i>
                    <p class="ms-text-dark">Fortune's Warehouse</p>
                    <span>Lagos (Ikoyi)</span>
                  </div>
                </div>
                <div class="ms-social-media-followers">
                  <div class="ms-social-grid">
                  <i class="fas fa-shopping-cart bg-linkedin"></i>
                    <p class="ms-text-dark">Shantel's Mall</p>
                    <span>Edo (Benin)</span>
                  </div>
                  <div class="ms-social-grid">
                  <i class="fas fa-shopping-cart bg-linkedin"></i>
                    <p class="ms-text-dark">Lois' Stores</p>
                    <span>Cross River (Calabar)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

         </div>
      </div>

      <Modal
        open={updateProductModal}
        onClose={handleModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-address"
      >
        <div
          className="modal-dialog modal-dialog-centered modal-lg"
          role="document"
        >
          <div className="modal-content">
            <div className="modal-body">
              <button
                type="button"
                className="close"
                onClick={handleModalClose}
              >
                <span aria-hidden="true">&times;</span>
              </button>
              <i className="flaticon-secure-shield d-block"></i>
              <h1> {isEditMode ? "Update Product" : "New Product"}</h1>
              <p>{isEditMode ? "Update Status of This Product" : "Add New Product"} </p>

              <form
                className="needs-validation clearfix"
                onSubmit={formik.handleSubmit}
              >
                <div className="form-row" style={{ marginTop: "5%" }}>
                  {/* Full Name */}
                  <div className="col-xl-6 col-md-12">
                    <label htmlFor="name">Product Name</label>
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        required
                        disabled={isEditMode}
                      />
                    </div>
                    {formik.touched.name && formik.errors.name && (
                      <div className="text-danger">{formik.errors.name}</div>
                    )}
                  </div>
                  <div className="col-xl-3 col-md-12">
                    <label htmlFor="package_id">Product Cost</label>
                    <div className="input-group">
                    <input
                        type="text"
                        className="form-control"
                        id="price"
                        name="price"
                        value={formik.values.price}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        required
                        disabled
                      />
                    </div>
                    {formik.touched.price && formik.errors.price && (
                      <div className="text-danger">
                        {formik.errors.price}
                      </div>
                    )}
                  </div>
                  <div className="col-xl-3 col-md-12">
                    <label htmlFor="package_id">Product Point Value</label>
                    <div className="input-group">
                    <input
                        type="text"
                        className="form-control"
                        id="pv"
                        name="pv"
                        value={formik.values.pv}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        required
                        disabled
                      />
                    </div>
                    {formik.touched.pv && formik.errors.pv && (
                      <div className="text-danger">
                        {formik.errors.pv}
                      </div>
                    )}
                  </div>

                  {/* Package Type */}
                  <div className="col-xl-4 col-md-12">
                    <label htmlFor="package_id">Select Product Availability</label>
                    <div className="input-group">
                      <select
                        className="form-control"
                        id="availability"
                        name="availability"
                        value={formik.values.package_id}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        required
                      >
                        <option value="">Select an option</option>
                        <option value="Available">Available at my Center</option>
                        <option value="Not Available">Not Available</option>
                      </select>
                    </div>
                    {formik.touched.availability && formik.errors.availability && (
                      <div className="text-danger">
                        {formik.errors.availability}
                      </div>
                    )}
                  </div>

                  {/* Email */}
                  <div className="col-xl-4 col-md-12">
                    <label htmlFor="quantity">Quantity Available</label>
                    <div className="input-group">
                      <input
                        type="number"
                        className="form-control"
                        id="quantity"
                        name="quantity"
                        value={formik.values.quantity}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        required
                      />
                    </div>
                    {formik.touched.quantity && formik.errors.quantity && (
                      <div className="text-danger">{formik.errors.quantity}</div>
                    )}
                  </div>

                  {/* Phone */}
                  

                  
                  {/* Footer Buttons */}
                  <div className="modal-footer mt-3">
                    <button
                      type="button"
                      className="btn btn-light"
                      onClick={handleModalClose}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="btn btn-primary shadow-none"
                      disabled={loading}
                    >
                      {loading
                        ? "Processing..."
                        : isEditMode
                        ? "Update Account"
                        : "Proceed to Payment"}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Modal>
    </section>
  );
};

export default Dashboard;
