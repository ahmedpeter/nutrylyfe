// import * as React from "react";
import * as React from "react";
import { useState, useEffect } from "react";
import query from "../../helpers/query.ts";
import { useNavigate } from "react-router";
import Modal from "@mui/material/Modal";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useSelector } from "react-redux";
import moment from "moment";
import currency from "../../utils/formatCurrency";

const Packages = () => {
  const [newPackageModal, setNewPackageModal] = useState(false);
  const handleModalClose = () => setNewPackageModal(false);
  const [packageList, setPackageList] = useState([]);
  const userInfo = useSelector((state) => state);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const navigate = useNavigate();
  const [alertText, setAlert] = useState("");
  const [loading, setLoading] = useState(false);



  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: selectedPackage?.name || "",
      price: selectedPackage?.price || "",
      pv: selectedPackage?.pv || "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Package name is required"),
      price: Yup.number().required("Price is required"),
      pv: Yup.string().required("pv is a required field"),
    }),
    onSubmit: async (values) => {
      console.log(values);
      setLoading(true);
      const response = await query({
        method: "POST",
        url: isEditMode
          ? `/account-packages/update/${selectedPackage.id}`
          : "/account-packages/create",
        bodyData: values,
        token: userInfo?.user?.user.token,
      });
      if (response.status || response.success) {
        console.log(response);
        setAlert(response.message);
        setNewPackageModal(false);
        setIsEditMode(false);
        getAllPackages();
        setTimeout(() => setAlert(""), 5000);
      } else {
        console.log(response);
        setAlert(response.message);
        setTimeout(() => setAlert(""), 5000);
      }
      setLoading(false);
    },
  });

  const deleteProduct = async (productId) => {
    if (!window.confirm("Are you sure you want to delete this product?"))
      return;

    try {
      const response = await query({
        method: "DELETE",
        url: `/admin/admin-products/product/delete-product?product_id=${productId}`,
        token: userInfo?.user?.user.token,
      });

      if (response.success) {
        setAlert("Product deleted successfully!");
        getAllPackages();
      } else {
        setAlert(response.message || "Failed to delete product.");
        setTimeout(() => setAlert(""), 5000);
      }
    } catch (error) {
      console.error("Delete error:", error);
      setAlert("An error occurred while deleting the product.");
    }
  };



  const getAllPackages = async () => {
    setLoading(true);
    if (!userInfo.user.user.token) {
      navigate("/");
    }
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
                    <h6>All Packages</h6>
                    <p>Manage System Packages</p>
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
                        onClick={() => setNewPackageModal(true)}
                      >
                        Add New Package
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
                            <th scope="col">Package Name</th>
                            <th scope="col">Price</th>
                            <th scope="col">Point Values</th>
                            <th scope="col">Update</th>
                          </tr>
                        </thead>
                        <tbody>
                        {packageList?.length > 0 &&
                            packageList.map((item, i) => (
                          <tr key={item.id}>
                            <td> {i + 1} </td>
                            <td>
                            {item.name}
                            </td>
                            <td>{currency(item.price)}</td>
                            <td>{item.pv}

                            </td>
                            <td>
                            <div
                                  className="pointer"
                                  onClick={() => {
                                    setSelectedPackage(item);
                                    setIsEditMode(true);
                                    setNewPackageModal(true);
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
                    {!loading && packageList?.length === 0 && (
              <>
                <p
                  className="text-center"
                  style={{
                    fontWeight: 600,
                    left: "50%",
                    position: "absolute",
                    top: "50%",
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  <span class="mdi mdi-ffolder-open-outline text-primary me-1"></span>{" "}
                  <br />
                  Oops! No Packages Added yet! &nbsp;
                </p>
              </>
            )}
                  </div>
                  
                </div>
              </div>
            </div>
          </div>

          </div>
      </div>

      <Modal
        open={newPackageModal}
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
              <h1>{isEditMode ? "Update Package" : "Add a New Package"}</h1>
              <p>{isEditMode ? "Manage Package" : "Create New Package"} </p>
              {alertText && (
                <div className="alert alert-info mt-md">{alertText}</div>
              )}
              <form
                className="needs-validation clearfix"
                onSubmit={formik.handleSubmit}
              >
                <div className="form-row" style={{ marginTop: "5%" }}>
                  {/* Name */}

                  
                  <div className="col-xl-8 col-md-12">
                    <label htmlFor="name">Package Name</label>
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        placeholder="Name of package"
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

                  {/* Price */}
                  <div className="col-xl-4 col-md-12">
                    <label htmlFor="price">Set Package Price</label>
                    <div className="input-group">
                      <input
                        type="number"
                        className="form-control"
                        id="price"
                        name="price"
                        value={formik.values.price}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        required
                      />
                    </div>
                    {formik.touched.price && formik.errors.price && (
                      <div className="text-danger">{formik.errors.price}</div>
                    )}
                  </div>

                  {/* Point Value */}
                  <div className="col-xl-6 col-md-12">
                    <label htmlFor="Point Value">Point Value</label>
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control"
                        id="pv"
                        name="pv"
                        placeholder="Assign Point Value for this package"
                        value={formik.values.pv}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        required
                      />
                    </div>
                    {formik.touched.pv &&
                      formik.errors.pv && (
                        <div className="text-danger">
                          {formik.errors.pv}
                        </div>
                      )}
                  </div>

                  <div className="modal-footer">
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
                        ? "Update Package"
                        : "Save Package"}
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

export default Packages;
