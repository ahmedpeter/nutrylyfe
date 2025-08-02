// import * as React from "react";
import * as React from "react";
import { useState, useEffect, useMemo } from "react";
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
  const [availableOrders, setAvailableOrders] = useState(null);
  const [networkerOrders, setNetworkerOrders] = useState(null);
  const handleModalClose = () => setUpdateProductModal(false);
  const [userProfile, setUserProfile] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [alertText, setAlert] = useState("");
  const [stockiestList, setStockiestList] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [updateProductModal, setUpdateProductModal] = useState(false);
const [allAccounts, setAllAccounts] = useState(null);
  const userInfo = useSelector((state) => state);


  const priviledgedUser =  userInfo.user.user.user_type === "Admin" ? "/admin/admin-products" : "/stockist/products/get-system-products";
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: selectedProduct?.name || "",
      pv: selectedProduct?.pv || "",
      price: selectedProduct?.price || "",
      available: "",
      quantity: "",
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
      navigate("/");
    }
    const response = await query({
      method: "GET",
      url: "/profile",
      token: userInfo?.user?.user.token,
    });
    console.log(response);
    // getStockiestOrders()
    if (response.success) {
      setLoading(false);
      console.log(response);
      getAllStockiest();
      setUserProfile(response?.data.data.user);
    } else {
      console.log(response);
      setAlert(response?.data?.message);
      setLoading(false);
    }
    console.log(userProfile);
  };

  const getAllStockiest = async () => {
    setLoading(true);
    if (!userInfo.user.user.token) {
      navigate("/");
    }
    // console.log(userType);
    const response = await query({
      method: "GET",
      url: "/networker/stockist/get-all",
      token: userInfo?.user?.user.token,
    });
    console.log(response);
    if (response.success) {
      setLoading(false);
      console.log(response);
      setStockiestList(response?.data?.data.data);
    } else {
      console.log(response);
      setAlert(response?.data?.message);
      setLoading(false);
    }
  };
  const getAvailableProducts = async () => {
    setLoading(true);
    if (!userInfo.user.user.token) {
      navigate("/");
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
  const getStockiestOrders = async () => {
    setLoading(true);
    if (!userInfo.user.user.token) {
      navigate("/");
    }
    // console.log(userType);
    const response = await query({
      method: "GET",
      url: "/stockist/orders/all",
      token: userInfo?.user?.user.token,
    });
    console.log(response);
    if (response.success) {
      setLoading(false);
      console.log(response);
      setAvailableOrders(response?.data?.data);
    } else {
      console.log(response);
      setAlert(response?.data?.message);
      setTimeout(() => setAlert(""), 5000);
      setLoading(false);
    }
  };

  // Admin Function to get all system users
  const getAllUsers = async () => {
    setLoading(true);
    if (!userInfo.user.user.token) {
      navigate("/");
    }
    const response = await query({
      method: "GET",
      url: "/admin/users/all",
      token: userInfo?.user?.user.token,
    });
    console.log(response);
    if (response.success) {
      setLoading(false);
      setAllAccounts(response.data.data);
      console.log(allAccounts);
    } else {
      console.log(response);
      setAlert(response?.data?.message);
      setLoading(false);
    }
   
  }
  const getNetworkerOrders = async () => {
    setLoading(true);
    if (!userInfo.user.user.token) {
      navigate("/");
    }
    // console.log(userType);
    const response = await query({
      method: "GET",
      url: "/networker/orders/all",
      token: userInfo?.user?.user.token,
    });
    console.log(response);
    if (response.success) {
      setLoading(false);
      console.log(response);
      setNetworkerOrders(response?.data?.data);
    } else {
      console.log(response);
      setAlert(response?.data?.message);
      setTimeout(() => setAlert(""), 5000);
      setLoading(false);
    }
  };

  const handleRequeryStatus = async (orderId) => {
    setLoading(true);
    console.log(orderId)

    const response = await query({
      method: "POST",
      url: "/payment/orders/verify-payment",
      bodyData: {reference: orderId},
      token: userInfo?.user?.user.token,
    });
    console.log(response);
    if (response.success) {
      setLoading(false);
      console.log(response);
      
    } else {
      console.log(response);
      setAlert(response?.data?.message);
      setTimeout(() => setAlert(""), 5000);
      setLoading(false);
    }
  }

  const handleStockiestClick = (id) => {
    navigate(`/app/product/stockiest/${id}`);
  };

  const handleAddNewNetworker = () => {
    navigate("/app/networkers");
  }

  const groupedByUser = useMemo(() => {
    if (!availableOrders || !Array.isArray(availableOrders)) return [];
  
    const grouped = availableOrders.reduce((acc, order) => {
      const userId = order.user_id;
  
      if (!acc[userId]) {
        acc[userId] = {
          user: order.user,
          orders: [],
        };
      }
  
      acc[userId].orders.push({
        id: order.id,
        orderID: order.orderID,
        total: order.total,
        status: order.status,
        created_at: order.created_at,
        items: order.items,
        payment: order.payment,
      });
  
      return acc;
    }, {});
  console.log(Object.values(grouped));
    return Object.values(grouped);
  }, [availableOrders]);


  useEffect(() => {
    console.log(userInfo);
    getUserProfile();
    if (userInfo?.user?.user.user_type === "Stockist") {
      getAllProducts();
      getAvailableProducts();
      getStockiestOrders();
    }
    if (userInfo?.user?.user.user_type === "Networker") {
      getNetworkerOrders();
    }
  }, []);

  const getAllProducts = async () => {
    setLoading(true);
    if (!userInfo.user.user.token) {
      navigate("/");
    }
    console.log(priviledgedUser);
    const response = await query({
      method: "GET",
      url: priviledgedUser,
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
    if (userInfo?.user?.user.user_type === "Admin") {
      getAllUsers();
    }
      getAllProducts();
    // }
  }, []);

  return (
    <section>
      <div class="col-md-12">
        <div class="ms-panel">
          <div class="ms-panel-header">
            <div class="d-flex justify-content-between">
              <div class="ms-header-text">
                <h6>Recent Activities</h6>
                <p>
                  Quick Overview on your Nutrylyfe Account{" "}
                  <span class="badge badge-success">
                    {userInfo?.user.user.my_ref_id}
                  </span>{" "}
                </p>
              </div>
            </div>
          </div>

          {userInfo?.user.user.user_type === "Networker" && (
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
                            <i class="material-icons">arrow_upward</i>{" "}
                            {userProfile?.referrals?.length}
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
                  <i class="material-icons">ac_unit</i>
                </div>
              </div>
              <div class="col-xl-4 col-md-6">
                <div class="ms-card card-linkedin ms-widget ms-infographics-widget">
                  <div class="ms-card-body media">
                    <div class="media-body">
                      <h6>My Wallet</h6>
                      <p class="ms-card-change">
                        {" "}
                        <i class="material-icons">arrow_upward</i>{" "}
                        {currency(userInfo?.user.user.wallet)}
                      </p>
                      <p class="fs-9 mt-7">See more</p>
                    </div>
                  </div>
                  <i class="material-icons">beach_access</i>
                  {/*<i class="material-icons">ac_unit</i> */}
                </div>
              </div>
              <div class="col-xl-4 col-md-6">
                <div class="ms-card card-twitter ms-widget ms-infographics-widget">
                  <div class="ms-card-body media">
                    <div class="media-body">
                      <h6>My Point Value</h6>
                      <p class="ms-card-change">
                        {" "}
                        <i class="material-icons">arrow_upward</i>{" "}
                        {userInfo?.user.user.pv}
                      </p>
                      <p class="fs-9 mt-7">See more</p>
                    </div>
                  </div>
                  <i class="material-icons">bubble_chart</i>
                </div>
              </div>
            </div>
          </div>
          )}

        </div>
      </div>

      {userInfo?.user.user.user_type === "Stockist" && (
        <>
          <div class="ms-panel-body pb-0">
            <div class="row">
              <div class="col-xl-4 col-md-6">
                <div class="ms-card card-facebook ms-widget ms-infographics-widget">
                  <div class="ms-card-body media">
                    <div class="media-body">
                      <h6>New Orders</h6>

                      <p class="ms-card-change">
                        {" "}
                        <i class="material-icons">arrow_upward</i>{" "}
                        {groupedByUser?.length}
                      </p>
                      <p class="fs-9 mt-7">See all</p>
                    </div>
                  </div>
                  <i class="material-icons">beach_access</i>
                  {/* <i class="material-icons">ac_unit</i> */}
                </div>
              </div>
              <div class="col-xl-4 col-md-6">
                <div class="ms-card card-linkedin ms-widget ms-infographics-widget">
                  <div class="ms-card-body media">
                    <div class="media-body">
                      <h6>My Wallet</h6>
                      <p class="ms-card-change">
                        {" "}
                        <i class="material-icons">arrow_upward</i>{" "}
                        {currency(userInfo?.user.user.wallet)}
                      </p>
                      <p class="fs-9 mt-7">See more</p>
                    </div>
                  </div>
                 <i class="material-icons">ac_unit</i>
                </div>
              </div>
              <div class="col-xl-4 col-md-6">
                <div class="ms-card card-twitter ms-widget ms-infographics-widget">
                  <div class="ms-card-body media">
                    <div class="media-body">
                      <h6>My Store Products</h6>
                      <p class="ms-card-change">
                        {" "}
                        <i class="material-icons">arrow_upward</i>{" "}
                        {availableProducts?.length}
                      </p>
                      <p class="fs-9 mt-7">See more</p>
                    </div>
                  </div>
                 <i class="material-icons">ac_unit</i>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

{userInfo?.user.user.user_type === "Admin" && (
        <>
          <div class="ms-panel-body pb-0">
            <div class="row">
              <div class="col-xl-4 col-md-6">
                <div class="ms-card card-facebook ms-widget ms-infographics-widget">
                  <div class="ms-card-body media">
                    <div class="media-body">
                      <h6>All Stockiest</h6>

                      <p class="ms-card-change">
                        {" "}
                        <i class="material-icons">arrow_upward</i>{" "}
                        {stockiestList?.length}
                      </p>
                      <p class="fs-9 mt-7">See all</p>
                    </div>
                  </div>
                  <i class="material-icons">beach_access</i>
                  {/* <i class="material-icons">ac_unit</i> */}
                </div>
              </div>
              <div class="col-xl-4 col-md-6">
                <div class="ms-card card-linkedin ms-widget ms-infographics-widget">
                  <div class="ms-card-body media">
                    <div class="media-body">
                      <h6>All Networkers</h6>
                      <p className="ms-card-change">
                          <i className="material-icons">arrow_upward</i>{" "}
                          {allAccounts?.networkers ? Object.keys(allAccounts.networkers).length : 0}
                        </p>

                      <p class="fs-9 mt-7">See more</p>
                    </div>
                  </div>
                 <i class="material-icons">ac_unit</i>
                </div>
              </div>
              <div class="col-xl-4 col-md-6">
                <div class="ms-card card-twitter ms-widget ms-infographics-widget">
                  <div class="ms-card-body media">
                    <div class="media-body">
                      <h6>Available Products</h6>
                      <p class="ms-card-change">
                        {" "}
                        <i class="material-icons">arrow_upward</i>{" "}
                        {productList?.length}
                      </p>
                      <p class="fs-9 mt-7">See more</p>
                    </div>
                  </div>
                  <i class="material-icons">bubble_chart</i>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
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
                          onClick={()=> handleAddNewNetworker()}
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
                              <th scope="col">Position</th>
                              <th scope="col">State</th>
                              <th scope="col">Contact</th>
                              <th scope="col">Reg. Date</th>
                            </tr>
                          </thead>
                          <tbody>
                            {userProfile?.referrals?.map((refer, i) => (
                              <tr key={refer.id}>
                                <td>{refer.name}</td>
                                <td>{refer.my_ref_id}</td>
                                <td>{refer.username}</td>
                                <td><ConvertPackage id={refer.package_id} /></td>
                                <td>{refer.position !== null ? refer.position : "N/A"} </td>
                                <td>{refer.state} </td>
                                <td>{refer.phone} <br/>
                                {refer.email}</td>
                                <td>
                                  {moment(refer.created_at).format("lll")}
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
          {userInfo?.user.user.user_type === "Stockist" &&
            availableProducts?.length > 0 && (
              <div class="col-xl-12 col-md-12">
                <div class="ms-panel ms-panel-fh ms-crypto-orders">
                  <div class="ms-panel-header">
                    <div class="d-flex justify-content-between">
                      <div class="ms-header-text">
                        <h6>Available Products in Store</h6>
                        <p>Products you currently have at your center for pickup</p>
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
                          <table class="table table-hover thead-primary">
                            <thead>
                              <tr>
                                <th scope="col">S/N</th>
                                <th scope="col">Product Name</th>
                                <th scope="col">Product Cost</th>
                                <th scope="col">Product PV</th>
                                <th scope="col">Product Quantity</th>
                                <th scope="col">Product Status</th>
                                {/* <th scope="col">Action</th> */}
                              </tr>
                            </thead>
                            <tbody>
                              {availableProducts?.map((product, i) => (
                                <tr key={product.id}>
                                  <td>{i + 1}</td>
                                  <td className="text-capitalize">{product?.product?.name}</td>
                                  <td>{currency(product?.product?.price)}</td>
                                  <td>{product.pv}</td>
                                  <td>{product.quantity}</td>
                                  <td>
                                    {product.status === "1" ? (
                                      <span class="badge badge-success">
                                        Available
                                      </span>
                                    ) : (
                                      <span class="badge badge-danger">
                                        Not Available
                                      </span>
                                    )}
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

          {(userInfo?.user.user.user_type === "Stockist" || userInfo?.user.user.user_type === "Admin") && (
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
                              {userInfo?.user.user.user_type === "Stockist" && ( 
                              <th scope="col">Action</th>
                              )}
                            </tr>
                          </thead>
                          <tbody>
                            {productList?.map((product, i) => (
                              <tr key={product.id}>
                                <td>{i + 1}</td>
                                <td className="text-capitalize">{product.name}</td>
                                <td>{currency(product.price)}</td>
                                {userInfo?.user.user.user_type === "Stockist" && ( 
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
                                    Update Stock
                                  </div>
                                </td>
                                )}
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
                  {userInfo.user.user.user_type === "Stockist" && (
                  <table class="table table-hover thead-primary ">
                    <thead>
                      <tr>
                        <th scope="col">Order Date</th>
                        <th scope="col">Networker</th>
                        <th scope="col">Order Details</th>
                        <th scope="col">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                    {groupedByUser.map((group) => (
                      <tr>
                        <td>{moment(group.created_at).format("lll")}</td>
                        <td className="text-capitalize">{group.user.name}</td>
                        <td>
                          <ol>
                          {group.orders.map((order)=> (
                            <li className="pointer"> {order.orderID}</li>
                            ))}
                          </ol>

                        </td>
                        <td>
                          <span class="badge badge-success">Completed</span>
                        </td>
                      </tr>
                      ))}
                    </tbody>
                  </table>
                  )}

                {userInfo?.user.user.user_type === "Networker" && (
                  <table class="table table-hover thead-primary ">
                    <thead>
                      <tr>
                        <th scope="col">Order Date</th>
                        <th scope="col">Order ID</th>
                        <th scope="col">Products</th>
                        <th scope="col">Total</th>
                        <th scope="col">Clearing Status</th>
                        <th scope="col">Payment Status</th>
                        <th scope="col">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                    {networkerOrders?.map((order) => (
                      <tr>
                        <td>{moment(order.created_at).format("lll")}</td>
                        <td>{order.orderID}</td>
                        <td>
                          <ul>
                          {order.items?.map((single) => (
                              <li> {single.product.name} <br/> <strong>Price:</strong> {currency(single.product.price)} * {single.qty}pcs
                               </li>
                          ))}
                          </ul>
                        </td>
                        <td> {currency(order.total)} </td>
                        <td>
                          <span class="badge badge-danger">Pending</span>
                        </td>
                        <td>
                          <span class="badge badge-danger text-capitalize">{order.payment.status}</span>
                        </td>
                        <td>
                          <span title="Confirm Order Status" className="pointer" onClick={() => handleRequeryStatus(order.orderID)}><i class="material-icons">cached</i></span>
                        </td>
                      </tr>
                    ))}
                     
                    </tbody>
                  </table>
                  )}
                </div>
              </div>
            </div>
          </div>
          {userInfo?.user.user.user_type === "Networker" && (
          <div class="col-xl-4 col-md-12">
            <div class="ms-panel ms-panel-fh">
              <div class="ms-panel-header spbtw">
                <h6>Stockiest Center(s)</h6>
                <p class="fs-9 mt-7">See all</p>
              </div>
              <div class="ms-panel-body p-0">
            {stockiestList?.length > 0 &&
            Array.from({ length: Math.ceil(stockiestList.length / 2) }, (_, rowIndex) => {
              const start = rowIndex * 2;
              const pair = stockiestList.slice(start, start + 2);

              return (
                <div className="ms-social-media-followers" key={rowIndex}>
                  {pair.map((item, i) => (
                    <div className="ms-social-grid pointer" key={i} onClick={() => handleStockiestClick(item.id)}>
                      <i className="fas fa-shopping-cart bg-linkedin"></i>
                      <p className="ms-text-dark text-capitalize">{item.name}</p>
                      <span>{item.state} ({item.lga})</span>
                    </div>
                  ))}
                </div>
              );
            })
          }  
              </div>
            </div>
          </div>
          )}
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
              <p>
                {isEditMode
                  ? "Update Status of This Product"
                  : "Add New Product"}{" "}
              </p>

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
                      <div className="text-danger">{formik.errors.price}</div>
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
                      <div className="text-danger">{formik.errors.pv}</div>
                    )}
                  </div>

                  {/* Package Type */}
                  <div className="col-xl-4 col-md-12">
                    <label htmlFor="package_id">
                      Select Product Availability
                    </label>
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
                        <option value="Available">
                          Available at my Center
                        </option>
                        <option value="Not Available">Not Available</option>
                      </select>
                    </div>
                    {formik.touched.availability &&
                      formik.errors.availability && (
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
                      <div className="text-danger">
                        {formik.errors.quantity}
                      </div>
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
