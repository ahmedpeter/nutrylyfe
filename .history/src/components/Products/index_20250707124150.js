// import * as React from "react";
import * as React from "react";
import { useState, useEffect } from "react";
import currency from "../../utils/formatCurrency";
import Modal from "@mui/material/Modal";
import { useFormik } from "formik";
import query from "../../helpers/query.ts";

import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import * as Yup from "yup";


const Products = () => {

  const [loading, setLoading] = useState(false);
  const [alertText, setAlert] = useState("");
  const [addProductModal, setAddProductModal] = useState(false);
  const userInfo = useSelector((state) => state);
  const navigate = useNavigate();
  const handleModalClose = () => setAddProductModal(false);
const [productList, setProductList] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null); 
const [isEditMode, setIsEditMode] = useState(false);



  const getAllProducts = async () => {
    setLoading(true);
    if (!userInfo.user.user.token) {
      navigate("/auth/login");
    }
    // console.log(userType);
    const response = await query({
      method: "GET",
      url: "/admin/admin-products",
      token: userInfo?.user?.user.token,
    });
    console.log(response);
    if (response.success) {
      setLoading(false);
      console.log(response);
      setProductList(response?.data?.data.data);
      console.log(`http://api.nutry-lyfe.pmall.com.ng`+response?.data?.data.data[0].image);
    } else {
      console.log(response);
      setAlert(response?.data?.message);
      setLoading(false);
    }
  };


  useEffect(() => {
    getAllProducts();
    
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
                    <h6>All Products</h6>
                    <p>Manage all System Products  <span class="badge badge-danger">401</span></p>
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
                        Add New Product{" "}
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
                            <th scope="col">S/N</th>
                            <th scope="col">Product Image</th>
                            <th scope="col">Product Name</th>
                            <th scope="col">Price</th>
                            <th scope="col">Benefits</th>
                            <th scope="col">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                        {productList?.map((product, i) => (
                          <tr key={product.id}>
                            <td>{i + 1 }</td>
                            <td>
                            {product.name}
                            </td>
                            <td>
                              <img src={`http://api.nutry-lyfe.pmall.com.ng/api$`+product.image} />
                            </td>
                            <td>{currency(product.price)}</td>
                            <td>{product.benefits}</td>
                            <td>
                            <div className="pointer" onClick={() => {
                                setSelectedProduct(product); 
                                setIsEditMode(true);
                                setAddProductModal(true);
                              }}>
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

          </div>
      </div>


      <Modal
        open={addNetworkerModal}
        onClose={handleModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-address">
        <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
                    <div className="modal-content">
                      <div className="modal-body">
                        <button type="button" className="close" onClick={handleModalClose} ><span aria-hidden="true">&times;</span></button>
                        <i className="flaticon-secure-shield d-block"></i>
                        <h1>New Networker</h1>
                        <p>Add Networkers to your Team and Grow your Net Worth</p>

                        <form className="needs-validation clearfix" onSubmit={formik.handleSubmit}>
      <div className="form-row" style={{ marginTop: "5%" }}>
        {/* Full Name */}
        <div className="col-xl-8 col-md-12">
          <label htmlFor="name">Member's Full Name</label>
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
              disabled={isEditMode}
            />
          </div>
          {formik.touched.name && formik.errors.name && (
            <div className="text-danger">{formik.errors.name}</div>
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
              disabled={isEditMode}
            />
          </div>
          {formik.touched.username && formik.errors.username && (
            <div className="text-danger">{formik.errors.username}</div>
          )}
        </div>

        {/* Placement ID */}
        <div className="col-xl-6 col-md-12">
          <label htmlFor="ref_id">Placement Member Id</label>
          <div className="input-group">

          <select
              className="form-control"
              id="ref_id"
              name="ref_id"
              value={formik.values.ref_id}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
              disabled={isEditMode}
            >
              <option value="">Select an option</option>
              {myNetworkList?.length > 0 &&
                myNetworkList?.map((netlist) => (
                  <option key={netlist.id} value={netlist.id}>
                    {netlist.name} - {netlist.my_ref_id}
                  </option>
                ))}
            </select>
          </div>
          {formik.touched.ref_id && formik.errors.ref_id && (
            <div className="text-danger">{formik.errors.ref_id}</div>
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
              disabled={isEditMode}
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
              disabled={isEditMode}
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

        {/* Optional Profile */}
{isEditMode && (
  <>
        <div className="col-xl-6 col-md-12">
          <label htmlFor="ref_id">State</label>
          <div className="input-group">

          <select
              className="form-control"
              id="state"
              name="state"
              onChange={handleStateChange} value={selectedState}
              onBlur={formik.handleBlur}
            > 
            <option value="">Select State</option>
                {statesAndLgas.map(({ state }) => (
                    <option key={state} value={state}>{state}</option>
                ))}

            </select>
          </div>
        </div>

        {/* Binary Position */}
        

          <div className="col-xl-3 col-md-12">
          <label htmlFor="binaryPosition">Local Government Area</label>
          <div className="input-group">
          <select
              className="form-control"
              name="lga"
              value={formik.values.lga}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              id="lga" disabled={!lgas.length}
            >
              <option value="">Select LGA</option>
              {lgas.map((lga) => (
          <option key={lga} value={lga}>{lga}</option>
        ))}
            </select>
            </div>
          </div>
          <div className="col-xl-3 col-md-12">
          <label htmlFor="binaryPosition">Bank Account Type</label>
          <div className="input-group">
          <select
              className="form-control"
              name="acct_type"
              value={formik.values.acct_type}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              id="acct_type"
            >
              <option value="Personal">Personal</option>
              <option value="current">Current</option>
            </select>
            </div>
          </div>
          {/* Bank Account Name */}
        <div className="col-xl-4 col-md-12">
          <label htmlFor="package_id">Bank Account Name</label>
          <div className="input-group">
          <input
              type="text"
              className="form-control"
              id="acct_name"
              name="acct_name"
              placeholder="Adams Babatunde"
              value={formik.values.acct_name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>
        </div>

        {/* Account Number */}
        <div className="col-xl-4 col-md-12">
          <label htmlFor="account number">Account Number</label>
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              id="acct_number"
              name="acct_number"
              placeholder="1234567890"
              value={formik.values.acct_number}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>
        </div>

        {/* Bank */}
        <div className="col-xl-4 col-md-12">
          <label htmlFor="Bank">Banker</label>
          <div className="input-group">
            <select
            className="form-control"
            name="bank"
            value={formik.values.bank}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            id="bank" disabled={!allBanks.length}
          >
            <option value="">Select Bank</option>
            {allBanks.map((bank) => (
              <option key={bank} value={bank.name}>{bank.name}</option>
      ))}
          </select>
          </div>
        </div>

        {/* Ends Optional Profile */}

        {/* address */}
        <div className="col-md-12">
          <label htmlFor="address">Address</label>
          <div className="input-group">
            <textarea
              rows="5"
              id="address"
              name="address"
              className="form-control"
              value={formik.values.address}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            ></textarea>
          </div>
          {formik.touched.address && formik.errors.address && (
            <div className="text-danger">{formik.errors.address}</div>
          )}
        </div>
        </>
)}
        {/* Footer Buttons */}
        <div className="modal-footer mt-3">
          <button type="button" className="btn btn-light" onClick={handleModalClose}>
            Cancel
          </button>
          <button type="submit" className="btn btn-primary shadow-none" disabled={loading}>
  {loading ? "Processing..." : isEditMode ? "Update Account" : "Proceed to Payment"}
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

export default Products;
