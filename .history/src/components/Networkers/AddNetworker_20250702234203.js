import * as React from "react";
import currency from "../../utils/formatCurrency";
import { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import query from "../../helpers/query.ts";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import moment from "moment";

const NewNetworker = () => {
  const [newDriverModal, setNewDriverModal] = useState(false);
  const handleModalClose = () => setNewDriverModal(false);
  const userInfo = useSelector((state) => state);
    const [packageList, setPackageList] = useState([]);
    const [myNetworkList, setMyNetworkList] = useState([]);

    const navigate = useNavigate();
  const [alertText, setAlert] = useState("");
  const [loading, setLoading] = useState(false);




//   Add New Networker

const formik = useFormik({
    initialValues: {
      fullName: "",
      username: "",
      placementId: "",
      binaryPosition: "",
      packageId: "",
      email: "",
      phone: "",
      description: "",
    },
    validationSchema: Yup.object({
      fullName: Yup.string().required("Full name is required"),
      username: Yup.string().required("Username is required"),
      placementId: Yup.string().required("Placement ID is required"),
      binaryPosition: Yup.string().required("Binary position is required"),
      packageId: Yup.string().required("Package type is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
      phone: Yup.string().required("Phone is required"),
      description: Yup.string().required("Description is required"),
    }),
    onSubmit: (values) => {
      console.log("Form data submitted:", values);
      console.log(values);
      values.device_name = "192.168.0.126";
      setLoading(true);
      const response = await query({
        method: "POST",
        url: "/auth/login",
        bodyData: values,
      });
      setLoading(false);
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
      getMyNetworkList();
    } else {
      console.log(response);
      setAlert(response?.data?.message);
      setLoading(false);
    }
  };


  //   Get all Associated Networkers

  const getMyNetworkList = async () => {
    setLoading(true);
    if (!userInfo.user.user.token) {
      navigate("/auth/login");
    }
    // console.log(userType);
    const response = await query({
      method: "GET",
      url: "/v1/profile/hierarchy-all-downline",
      token: userInfo?.user?.user.token,
    });
    console.log(response);
    if (response.success) {
      setLoading(false);
      console.log(response);
    //   setMyNetworkList(response?.data?.data.packages);
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
        <div class="row">
          <div class="col-xl-12 col-md-12">
            <div class="ms-panel-fh ms-crypto-orders">
              <div class="ms-panel-header">
                <div class="d-flex justify-content-between">
                  <div class="ms-header-text">
                    <h6>New Member Application</h6>
                    <p>Add Networkers to your Team and Grow your Net Worth</p>
                  </div>
                  <ul
                    class="btn-group btn-group-toggle nav nav-tabs ms-graph-metrics"
                    role="tablist"
                  >
                    <li role="presentation">
                      <a
                        href="index.html#s-orders"
                        aria-controls="s-orders"
                        class="btn btn-sm"
                        role="tab"
                        data-toggle="tab"
                        aria-selected="false"
                      >
                        {" "}
                        Add a Networker{" "}
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              
            </div>
          </div>
          <div class="col-xl-12 col-md-12">
          <form className="needs-validation clearfix" onSubmit={formik.handleSubmit}>
      <div className="form-row" style={{ marginTop: "5%" }}>
        {/* Full Name */}
        <div className="col-xl-8 col-md-12">
          <label htmlFor="fullName">Member's Full Name</label>
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              id="fullName"
              name="fullName"
              placeholder="Full Name"
              value={formik.values.fullName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
            />
          </div>
          {formik.touched.fullName && formik.errors.fullName && (
            <div className="text-danger">{formik.errors.fullName}</div>
          )}
        </div>

        {/* Username */}
        <div className="col-xl-4 col-md-12">
          <label htmlFor="username">Choose a username</label>
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              id="username"
              name="username"
              placeholder=""
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
            />
          </div>
          {formik.touched.username && formik.errors.username && (
            <div className="text-danger">{formik.errors.username}</div>
          )}
        </div>

        {/* Placement ID */}
        <div className="col-xl-6 col-md-12">
          <label htmlFor="placementId">Placement Member Id</label>
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              id="placementId"
              name="placementId"
              placeholder="NL - 123456"
              value={formik.values.placementId}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
            />
          </div>
          {formik.touched.placementId && formik.errors.placementId && (
            <div className="text-danger">{formik.errors.placementId}</div>
          )}
        </div>

        {/* Binary Position */}
        <div className="col-xl-6 col-md-12">
          <label htmlFor="binaryPosition">Binary Position</label>
          <div className="input-group">
            <select
              className="form-control"
              id="binaryPosition"
              name="binaryPosition"
              value={formik.values.binaryPosition}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
            >
              <option value="">Select position</option>
              <option value="left">Left</option>
              <option value="right">Right</option>
            </select>
          </div>
          {formik.touched.binaryPosition && formik.errors.binaryPosition && (
            <div className="text-danger">{formik.errors.binaryPosition}</div>
          )}
        </div>

        {/* Package Type */}
        <div className="col-xl-4 col-md-12">
          <label htmlFor="packageId">Select Package Type</label>
          <div className="input-group">
            <select
              className="form-control"
              id="packageId"
              name="packageId"
              value={formik.values.packageId}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
            >
              <option value="">Select an option</option>
              {packageList.length > 0 &&
                packageList.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name} - ({currency(item.price)})
                  </option>
                ))}
            </select>
          </div>
          {formik.touched.packageId && formik.errors.packageId && (
            <div className="text-danger">{formik.errors.packageId}</div>
          )}
        </div>

        {/* Email */}
        <div className="col-xl-4 col-md-12">
          <label htmlFor="email">Please provide an Email</label>
          <div className="input-group">
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              placeholder="email@faker.com"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
            />
          </div>
          {formik.touched.email && formik.errors.email && (
            <div className="text-danger">{formik.errors.email}</div>
          )}
        </div>

        {/* Phone */}
        <div className="col-xl-4 col-md-12">
          <label htmlFor="phone">Phone</label>
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              id="phone"
              name="phone"
              placeholder="234 801 234 567 89"
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
            />
          </div>
          {formik.touched.phone && formik.errors.phone && (
            <div className="text-danger">{formik.errors.phone}</div>
          )}
        </div>

        {/* Description */}
        <div className="col-md-12">
          <label htmlFor="description">Description</label>
          <div className="input-group">
            <textarea
              rows="5"
              id="description"
              name="description"
              className="form-control"
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
            ></textarea>
          </div>
          {formik.touched.description && formik.errors.description && (
            <div className="text-danger">{formik.errors.description}</div>
          )}
        </div>

        {/* Footer Buttons */}
        <div className="modal-footer mt-3">
          <button type="button" className="btn btn-light">
            Cancel
          </button>
          <button type="submit" className="btn btn-primary shadow-none">
            Proceed to Payment
          </button>
        </div>
      </div>
    </form>
              </div>
          </div>
      </div>
    </section>
  );
};

export default NewNetworker;
