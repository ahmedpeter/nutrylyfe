// import * as React from "react";
import * as React from "react";
import { useState, useEffect } from "react";
import currency from "../../utils/formatCurrency";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import moment from "moment";
import Modal from "@mui/material/Modal";
import { useFormik } from "formik";
import { statesAndLgas } from '../../helpers/states';
import * as Yup from "yup";
import query from "../../helpers/query.ts";


const Stockiest = () => {
  const [newStockiestModal, setNewStockiestModal] = useState(false);
  const handleModalClose = () => setNewStockiestModal(false);
  const [packageList, setPackageList] = useState([]);
  const [selectedState, setSelectedState] = useState('');
  const [lgas, setLgas] = useState([]);
  const userInfo = useSelector((state) => state);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [alertText, setAlert] = useState("");

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
      city: "",
      package_id: "",
      email: "",
      phone: "",
      address: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Full name is required"),
      lga: Yup.string().required("LGA is required"),
      ref_id: Yup.string().required("Ref ID is required"),
      state: Yup.string().required("Stockiest Location is required"),
      city: Yup.string().required("Stockiest City is required"),
      package_id: Yup.string().required("Package type is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
      phone: Yup.string().required("Phone is required"),
      address: Yup.string().required("Address is required"),
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
        <div class="row">
          <div class="col-xl-12 col-md-12">
            <div class="ms-panel ms-panel-fh ms-crypto-orders">
              <div class="ms-panel-header">
                <div class="d-flex justify-content-between">
                  <div class="ms-header-text">
                    <h6>All Stockiest Centers</h6>
                    <p>See and Manage all Stockiest centers within the platform</p>
                  </div>
                  <ul
                    class="btn-group btn-group-toggle nav nav-tabs ms-graph-metrics"
                    role="tablist"
                  >
                    {/* <li role="presentation">
                      <a
                        href="index.html#b-orders"
                        aria-controls="b-orders"
                        class="btn btn-sm active show"
                        role="tab"
                        data-toggle="tab"
                        aria-selected="true"
                      >
                        {" "}
                        Add a Networker{" "}
                      </a>
                    </li> */}
                    <li role="presentation">
                      <a
                        class="btn btn-sm"
                        role="tab"
                        data-toggle="tab"
                        aria-selected="false"
                        onClick={() => setNewStockiestModal(true)}
                      >
                        {" "}
                        Add a Stockiest{" "}
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
                      <table class="table table-hover thead-primary">
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
                          <tr>
                            <td>Daniel Bwala</td>
                            <td>
                            #TR34351
                            </td>
                            <td>bwala</td>
                            <td>Gold</td>
                            <td>234 80 123 456 789

                            </td>
                            <td>12.01.2020</td>
                          </tr>
                          <tr>
                            <td>Daniel Bwala</td>
                            <td>
                            #TR34351
                            </td>
                            <td>bwala</td>
                            <td>Gold</td>
                            <td>234 80 123 456 789

                            </td>
                            <td>12.01.2020</td>
                          </tr>
                          <tr>
                            <td>Daniel Bwala</td>
                            <td>
                            #TR34351
                            </td>
                            <td>bwala</td>
                            <td>Gold</td>
                            <td>234 80 123 456 789

                            </td>
                            <td>12.01.2020</td>
                          </tr>
                          <tr>
                            <td>Daniel Bwala</td>
                            <td>
                            #TR34351
                            </td>
                            <td>bwala</td>
                            <td>Gold</td>
                            <td>234 80 123 456 789

                            </td>
                            <td>12.01.2020</td>
                          </tr>
                          <tr>
                            <td>Daniel Bwala</td>
                            <td>
                            #TR34351
                            </td>
                            <td>bwala</td>
                            <td>Gold</td>
                            <td>234 80 123 456 789

                            </td>
                            <td>12.01.2020</td>
                          </tr>
                          
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div role="tabpanel" class="tab-pane fade" id="s-orders">
                    <div class="table-responsive">
                      <table class="table table-hover">
                        <thead>
                          <tr>
                            <th scope="col">Price ($)</th>
                            <th scope="col">Amount</th>
                            <th scope="col">Track ID</th>
                            <th scope="col">Date</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>$7860.24</td>
                            <td>
                              <i class="fas fa-dollar-sign BTC"></i>0.528
                            </td>
                            <td>#TR34351</td>
                            <td>12.01.2020</td>
                          </tr>
                          <tr>
                            <td>$5813.44</td>
                            <td>
                              <i class="fas fa-pound-sign ETH"></i>0.345
                            </td>
                            <td>#TR34351</td>
                            <td>12.01.2020</td>
                          </tr>
                          <tr>
                            <td>$1264.99</td>
                            <td>
                              <i class="fas fa-dollar-sign BTC"></i> 0.117
                            </td>
                            <td>#TR34351</td>
                            <td>12.01.2020</td>
                          </tr>
                          <tr>
                            <td>$3789.31</td>
                            <td>
                              <i class="fas fa-euro-sign PPC-alt"></i>0.217
                            </td>
                            <td>#TR34351</td>
                            <td>12.01.2020</td>
                          </tr>
                          <tr>
                            <td>$7860.24</td>
                            <td>
                              <i class="fas fa-dollar-sign BTC"></i>0.528
                            </td>
                            <td>#TR34351</td>
                            <td>12.01.2020</td>
                          </tr>
                          <tr>
                            <td>$7860.24</td>
                            <td>
                              <i class="fas fa-dollar-sign BTC"></i>0.528
                            </td>
                            <td>#TR34351</td>
                            <td>12.01.2020</td>
                          </tr>
                          <tr>
                            <td>$7860.24</td>
                            <td>
                              <i class="fas fa-dollar-sign BTC"></i>0.528
                            </td>
                            <td>#TR34351</td>
                            <td>12.01.2020</td>
                          </tr>
                          <tr>
                            <td>$5813.44</td>
                            <td>
                              <i class="fas fa-pound-sign ETH"></i>0.345
                            </td>
                            <td>#TR34351</td>
                            <td>12.01.2020</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          </div>
      </div>

      <Modal
        open={newStockiestModal}
        onClose={handleModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
                    <div className="modal-content">
                      <div className="modal-body">
                        <button type="button" className="close" onClick={handleModalClose} ><span aria-hidden="true">&times;</span></button>
                        <i className="flaticon-secure-shield d-block"></i>
                        <h1>New Stockiest Application</h1>
                        <p>Add Stockiest to your Platform and sell unlimited products</p>

                        <form className="needs-validation clearfix" onSubmit={formik.handleSubmit}>
      <div className="form-row" style={{ marginTop: "5%" }}>
        {/* Full Name */}
        <div className="col-xl-8 col-md-12">
          <label htmlFor="name">Full Name</label>
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              placeholder="Full Name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
            />
          </div>
          {formik.touched.name && formik.errors.name && (
            <div className="text-danger">{formik.errors.name}</div>
          )}
        </div>

        {/* Store Location (State) */}
        <div className="col-xl-4 col-md-12">
        <label htmlFor="state">Store Location (State)</label>
          <div className="input-group">
            <select
              className="form-control"
              id="state"
              name="state"
              onChange={handleStateChange} value={selectedState}
              onBlur={formik.handleBlur}
              required
            > 
            <option value="">Select State</option>
                {statesAndLgas.map(({ state }) => (
                    <option key={state} value={state}>{state}</option>
                ))}

            </select>
          </div>
          {formik.touched.state && formik.errors.state && (
            <div className="text-danger">{formik.errors.state}</div>
          )}
        </div>

{/* LGA */}
<div className="col-xl-6 col-md-12">
          <label htmlFor="lga">Select LGA</label>
          <div className="input-group">
            <select
              className="form-control"
              name="lga"
              value={formik.values.lga}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
              id="lga" disabled={!lgas.length}
            >
              <option value="">Select LGA</option>
              {lgas.map((lga) => (
          <option key={lga} value={lga}>{lga}</option>
        ))}
            </select>
          </div>
          {formik.touched.lga && formik.errors.lga && (
            <div className="text-danger">{formik.errors.lga}</div>
          )}
        </div>
        {/* Placement ID */}
        <div className="col-xl-3 col-md-12">
          <label htmlFor="ref_id">City</label>
          <div className="input-group">
          <input
              type="text"
              className="form-control"
              id="city"
              name="city"
              placeholder=""
              value={formik.values.city}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
            />
            
          </div>
          {formik.touched.ref_id && formik.errors.ref_id && (
            <div className="text-danger">{formik.errors.ref_id}</div>
          )}
        </div>
        <div className="col-xl-3 col-md-12">
          <label htmlFor="ref_id">Reference ID</label>
          <div className="input-group">
          <input
              type="text"
              className="form-control"
              id="ref_id"
              name="ref_id"
              placeholder="NL-123456"
              value={formik.values.ref_id}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
            />
            
          </div>
          {formik.touched.ref_id && formik.errors.ref_id && (
            <div className="text-danger">{formik.errors.ref_id}</div>
          )}
        </div>

        

        {/* Package Type */}
        <div className="col-xl-4 col-md-12">
          <label htmlFor="package_id">Select Package Type</label>
          <div className="input-group">
            <select
              className="form-control"
              id="package_id"
              name="package_id"
              value={formik.values.package_id}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
            >
              <option value="">Select an option</option>
              {packageList?.length > 0 &&
                packageList?.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name} - ({currency(item.price)})
                  </option>
                ))}
            </select>
          </div>
          {formik.touched.package_id && formik.errors.package_id && (
            <div className="text-danger">{formik.errors.package_id}</div>
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

        {/* address */}
        <div className="col-md-12">
          <label htmlFor="address">address</label>
          <div className="input-group">
            <textarea
              rows="5"
              id="address"
              name="address"
              className="form-control"
              value={formik.values.address}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
            ></textarea>
          </div>
          {formik.touched.address && formik.errors.address && (
            <div className="text-danger">{formik.errors.address}</div>
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
      </Modal>
     






    </section>
  );
};

export default Stockiest;
