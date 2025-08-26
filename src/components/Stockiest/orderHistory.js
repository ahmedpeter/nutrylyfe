// import * as React from "react";
import * as React from "react";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import currency from "../../utils/formatCurrency";
import query from "../../helpers/query.ts";
import { useNavigate } from "react-router";
import * as Yup from "yup";
import { statesAndLgas } from "../../helpers/states";
import { allBanks } from "../../helpers/banks";
import Modal from "@mui/material/Modal";
import { useFormik } from "formik";
import Loader from "../../utils/loader";
import { useSelector } from "react-redux";
import ConvertPackage from "../../helpers/convertPackages";
import moment from "moment";

const OrderHistory = () => {
  const [loading, setLoading] = useState(false);
  const [alertText, setAlert] = useState("");
  const [verifyNetworkerModal, setVerifyNetworkerModal] = useState(false);
  const userInfo = useSelector((state) => state);
  const navigate = useNavigate();
  const [thisRef, setThisRef] = useState("");
  const [orderReference, setOrderReference] = useState(null);
  const handleModalClose = () => setVerifyNetworkerModal(false);
  const [allAccounts, setAllAccounts] = useState([]);
  const [otp, setOTP] = useState(false);
  const location = useLocation();

  const networkerOrder = location?.state;


  
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      otp: "",
    },
    onSubmit: async (values, { resetForm }) => {
      setLoading(true);
      const response = await query({
        method: "POST",
        url: `/stockist/orders/verify-otp/${thisRef}`,
        bodyData: values,
        token: userInfo?.user?.user.token,
      });
      setLoading(false);

      if (response.success) {
        resetForm();
        setVerifyNetworkerModal(false);
      } else {
        setAlert(response?.data?.message);
      }
    },
  });
  //   Get all Packages

  const verifyNetworkerOrder = async (orderRef) => {
    setLoading(true);
    console.log(orderRef);
    if (!userInfo.user.user.token) {
      navigate("/");
    }
    const response = await query({
      method: "POST",
      url: `/stockist/orders/verify-networker/${orderRef}`,
      token: userInfo?.user?.user.token,
    });
    console.log(response);
    if (response.success) {
      setLoading(false);
      setOTP(true);
      setThisRef(orderRef);
    } else {
      console.log(response);
      setAlert(response?.data?.message);
      setLoading(false);
    }
  };

   

  return (
    <section>
      <div class="ms-content-wrapper">
        <div class="row">
          <div class="col-xl-12 col-md-12">
            <div class="ms-panel ms-panel-fh ms-crypto-orders">
              <div class="ms-panel-header">
                <div class="d-flex justify-content-between">
                  <div class="ms-header-text">
                    <h6>
                      All Account{" "}
                      <span class="badge badge-danger">
                        {allAccounts?.length}
                      </span>
                    </h6>
                    <p>See all users in Nutrylyfe irrespective of their account types</p>
                  </div>
                  <ul
                    class="btn-group btn-group-toggle nav nav-tabs ms-graph-metrics"
                    role="tablist"
                  >
                    <li role="presentation">
                      <a
                        class="btn btn-sm"
                        role="tab"
                        data-toggle="tab"
                        aria-selected="false"
                        onClick={() => setVerifyNetworkerModal(true)}
                      >
                        {" "}
                        New Account{" "}
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              {loading && <Loader/>}


              <div class="ms-panel ms-email-panel">
        <div class="ms-panel-body p-0">
          

          
          <div class="ms-email-main">
            {/* <div class="ms-panel-header">
              <h6>All Account 4</h6>
              <p>You have 17 Unread Messages</p>
              
            </div> */}
            <div class="ms-email-content">
            <div class="table-responsive">
                      <table class="table table-hover thead-primary">
                        <thead>
                          <tr>
                            <th scope="col">S/N</th>
                            <th scope="col">Date</th>
                            <th scope="col">Order ID</th>
                            <th scope="col">Payment Type</th>
                            <th scope="col">Amount</th>
                            <th scope="col"> Payment Status</th>
                            <th scope="col">Order Status</th>
                            <th scope="col">Items</th>
                            <th scope="col">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {networkerOrder?.order?.map((order, i) => (
                            <tr key={order?.id}>
                              <td>{i + 1}</td>
                              <td>{moment(order?.created_at).format("lll")}</td>
                              <td>{order?.orderID}</td>
                              <td className="text-capitalize">{order?.payment?.payment_method}</td>
                              <td> { order?.total}</td>
                              <td className="text-capitalize">{order?.payment?.status}</td>
                              <td className="text-capitalize">{order?.status}</td>
                              <td>
                                <ol>
                                {order?.items?.map((item)=>(
                                    <>
                                    <li> 
                                    {item?.product?.name} - {item?.product.price} *  {item?.qty} = {item?.product.price * item?.qty} 
                                    </li>
                                        </>
                                ))}
                                </ol>
                              </td>
                             
                              <td>
                                <div
                                  className="pointer"
                                  onClick={() => {
                                    setVerifyNetworkerModal(true);
                                    setOrderReference(order?.orderID)
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



              { !loading && (
              <div class="ms-panel-body p-0">
                <div class="tab-content">
                  <div
                    role="tabpanel"
                    class="tab-pane fade in active show"
                    id="b-orders"
                  >
                    
                  </div>
                </div>
              </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Modal
        open={verifyNetworkerModal}
        onClose={handleModalClose}
        onClose={(event, reason) => {
          if (reason === 'backdropClick') return;
          handleModalClose();
        }}
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
              <h1> { !otp ? "Verify Account" : "Validate OTP" } </h1>
              <p> {!otp ? "Click the Button Below to Request an OTP to the Networker's Registered Email" : "Provide the OTP to Confirm and Validate Networker"} </p>

              <form
                className="needs-validation clearfix"
                onSubmit={formik.handleSubmit}
              >
                <div className="form-row" style={{ marginTop: "5%" }}>
                  {/* Full Name */}
                  <div className="col-xl-6 col-md-12">
                    <label htmlFor="name">Provide OTP</label>
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control"
                        id="otp"
                        name="otp"
                        value={formik.values.otp}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        required
                        disabled={!otp}
                      />
                    </div>
                    {formik.touched.otp && formik.errors.otp && (
                      <div className="text-danger">{formik.errors.otp}</div>
                    )}
                  </div>

                  {/* Footer Buttons */}
                  <div className="mt-3">
                    <button
                      type="button"
                      className="btn btn-light"
                      onClick={handleModalClose}
                    >
                      Cancel
                    </button>
                    {!otp && (
                    <button
                      type="button"
                      className="btn btn-primary shadow-none"
                      onClick={() => verifyNetworkerOrder(orderReference)}
                    >
                      Request OTP
                    </button>
                    )}
                    {otp && (
                    <button
                      type="submit"
                      className="btn btn-primary shadow-none"
                      disabled={loading} >
                      {loading
                        ? "Processing..."
                        : "Validate OTP" }
                    </button>
                    )}
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

export default OrderHistory;
