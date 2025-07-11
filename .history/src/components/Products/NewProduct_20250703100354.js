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
      price: "",
      ingredients: "",
      benefits: "",
      description: "",
      image: null, // file object
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Product name is required"),
      price: Yup.number().required("Price is required"),
      ingredients: Yup.string().required("Ingredients are required"),
      benefits: Yup.string().required("Benefits are required"),
      description: Yup.string().required("Description is required"),
      image: Yup.mixed().required("Product image is required"),
    }),
    onSubmit: async (values) => {
        console.log("Form data submitted:", values);
        setLoading(true);
        const response = await query({
          method: "POST",
          url: "/admin/admin-products/product/create",
          bodyData: values,
        });
        setLoading(false);
      },
  });

  const handleFileChange = (event) => {
    const file = event.currentTarget.files[0];
    formik.setFieldValue("image", file);
  };

  return (
    <section>
      <div class="ms-content-wrapper">
        <div class="row">
          <div class="col-xl-12 col-md-12">
            <div class="ms-panel-fh ms-crypto-orders">
              <div class="ms-panel-header">
                <div class="d-flex justify-content-between">
                  <div class="ms-header-text">
                    <h6>Add a New Product</h6>
                    <p>Create and manage product </p>
                  </div>
                  <ul
                    class="btn-group btn-group-toggle nav nav-tabs ms-graph-metrics"
                    role="tablist"
                  >
                      <button class="btn btn-primary" onClick={formik.handleSubmit}> Save this Product</button>

                    {/* <li role="presentation">
                      <a
                        href="index.html#s-orders"
                        aria-controls="s-orders"
                        class="btn btn-sm"
                        role="tab"
                        data-toggle="tab"
                        aria-selected="false"
                        onClick={formik.handleSubmit}
                      >
                        {" "}
                        Save this Product
                      </a>
                    </li> */}
                  </ul>
                </div>
              </div>
              
            </div>
          </div>
          <div class="col-xl-12 col-md-12">
          <form className="needs-validation clearfix" onSubmit={formik.handleSubmit}>
        <div className="form-row" style={{ marginTop: "5%" }}>
          {/* Name */}
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

          {/* Price */}
          <div className="col-xl-4 col-md-12">
            <label htmlFor="price">Set Product Price</label>
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

          {/* Ingredients */}
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

          {/* Benefits */}
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

          {/* Image Upload */}
          <div className="col-xl-4 col-md-12">
            <label htmlFor="image">Upload Product Image</label>
            <div className="custom-file">
              <input
                type="file"
                className="form-control custom-file-input"
                id="image"
                name="image"
                accept=".jpg,.png,.jpeg"
                    onChange={(e) => {
                      const formData = new FormData();
                      const files = e.target.files;
                      files?.length && formData.append("file", files[0]);
                      fetch(
                        `admin/admin-products/product/upload-file`,
                        {
                          method: "POST",
                          body: formData,
                          token: userInfo?.user?.user.token,
                        //   headers: {
                        //     Authorization: "Bearer " + localStorage.getItem("authToken"),
                        //   },
                        }
                      )
                        .then((res) => res.json())
                        .then((data) => {
                          //setLoading(false);
                          console.log(data)
                          setState((inputValues) => ({
                            ...inputValues,
                            image: data.url, 
                          }))
                          console.log(inputValues)
                        })
                        .catch((error) => {
                          //setLoading(false);
                          console.log(error)
                        });
                    }}
              />
              <label className="custom-file-label" htmlFor="image">
                {formik.values.image ? formik.values.image.name : "Choose file"}
              </label>
            </div>
            {formik.touched.image && formik.errors.image && (
              <div className="text-danger">{formik.errors.image}</div>
            )}
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
