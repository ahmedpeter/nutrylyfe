import * as React from "react";
import currency from "../../utils/formatCurrency";
import { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import query from "../../helpers/query.ts";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import moment from "moment";

const NewProduct = () => {
    const userInfo = useSelector((state) => state);
    const [packageList, setPackageList] = useState([]);
    const [myNetworkList, setMyNetworkList] = useState([]);

    const navigate = useNavigate();
    const [alertText, setAlert] = useState("");
    const [loading, setLoading] = useState(false);

//   Add New Networker

const formik = useFormik({
    initialValues: {
      name: "",
      username: "",
      ref_id: "",
      binaryPosition: "",
      package_id: "",
      email: "",
      phone: "",
      description: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Full name is required"),
      username: Yup.string().required("Username is required"),
      ref_id: Yup.string().required("Placement ID is required"),
      binaryPosition: Yup.string().required("Binary position is required"),
      package_id: Yup.string().required("Package type is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
      phone: Yup.string().required("Phone is required"),
      description: Yup.string().required("Description is required"),
    }),
    onSubmit: async (values) => {
      console.log("Form data submitted:", values);
      setLoading(true);
      const response = await query({
        method: "POST",
        url: "/auth/register/networker",
        bodyData: values,
      });
      setLoading(false);
      console.log(response);
    },
  });

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
          <label htmlFor="name">Product Name</label>
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              placeholder="ABC Product"
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

        {/* Username */}
        <div className="col-xl-4 col-md-12">
          <label htmlFor="price">Set Product Price</label>
          <div className="input-group">
            <input
              type="number"
              className="form-control"
              id="price"
              name="price"
              placeholder=""
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

        {/* Placement ID */}
        


        <div className="col-xl-6 col-md-12">
          <label htmlFor="ingredients">Ingredients</label>
          <div className="input-group">
            <textarea
              rows="5"
              id="ingredients"
              name="ingredients"
              className="form-control"
              value={formik.values.ingredients}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
            ></textarea>
          </div>
          {formik.touched.ingredients && formik.errors.ingredients && (
            <div className="text-danger">{formik.errors.ingredients}</div>
          )}
        </div>
        <div className="col-xl-6 col-md-12">
          <label htmlFor="benefits">Benefits</label>
          <div className="input-group">
            <textarea
              rows="5"
              id="benefits"
              name="benefits"
              className="form-control"
              value={formik.values.benefits}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
            ></textarea>
          </div>
          {formik.touched.benefits && formik.errors.benefits && (
            <div className="text-danger">{formik.errors.benefits}</div>
          )}
        </div>


        {/* Phone */}
       

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


        <div className="col-xl-4 col-md-12">
          <label htmlFor="image">Upload Product Image</label>
          <div class="custom-file">

                      <input type="file" class="custom-file-input" id="image"
              name="image"
              value={formik.values.image}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}/>
                      <label class="custom-file-label" for="validatedCustomFile">Upload Product Image..</label>
                      <div class="invalid-feedback">Example invalid custom file feedback</div>
                    </div>
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

export default NewProduct;
