import * as React from "react";
import { useState, useEffect} from "react";
import { Link, useParams } from "react-router-dom";
import currency from "../../utils/formatCurrency";
import query from "../../helpers/query.ts";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import moment from "moment";
import * as Yup from "yup";
import Modal from "@mui/material/Modal";
import { useFormik } from "formik";


const ProductDetails = () => {
  const { prodId } = useParams();
  const [productDetails, setProductDetails] = useState(null);
  const [addProductModal, setAddProductModal] = useState(false);
  const userInfo = useSelector((state) => state);
  const navigate = useNavigate();
  const handleModalClose = () => setAddProductModal(false);
  const [loading, setLoading] = useState(false);
  const [alertText, setAlert] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);


  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: productDetails?.name || "",
      ingredients: productDetails?.ingredients ||"",
      price: productDetails?.price || "",
      benefits: productDetails?.benefits ||"",
      description: productDetails?.description ||"",
      image: productDetails?.image | "", 
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
          url: `/admin/admin-products/product/update/${productDetails.id}`,
          bodyData: values,
          token: userInfo?.user?.user.token,
        });
        if(response.status) {
          setAlert(response.message);
          setAddProductModal(false);
          getProductDetails()
        } else {
          setAlert(response.message);
        }
        setLoading(false);
      },
  });



  const getProductDetails = async () => {
    setLoading(true);
    if (!userInfo.user.user.token) {
      navigate("/auth/login");
    }
    // console.log(userType);
    const response = await query({
      method: "GET",
      url: `/admin/admin-products/get-single?product_id=${prodId}`,
      token: userInfo?.user?.user.token,
    });
    console.log(response);
    if (response.success) {
      setLoading(false);
      console.log(response);
      setProductDetails(response?.data?.data.product);
    } else {
      console.log(response);
      setAlert(response?.data?.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    getProductDetails();
  }, []);


  return (
    <section>
      <div class="ms-content-wrapper">
      <div class="row ">

        <div class="col-md-12">
        </div>
        <div class="col-xl-6 col-md-12 bg-white">
          <div class="ms-panel shadow-none">

            <div class="ms-panel-body pb-0">
              <div id="imagesSlider" class="ms-image-slider carousel slide" data-ride="carousel">
                <div class="carousel-inner">
                  <div class="carousel-item active">
                    <img class="d-block w-100" src="../../assets/img/dashboard/pd-3.jpg" alt="First slide"/>
                  </div>
                  <div class="carousel-item">
                    <img class="d-block w-100" src="../../assets/img/dashboard/pd-2.jpg" alt="Second slide"/>
                  </div>
                  <div class="carousel-item">
                    <img class="d-block w-100" src="../../assets/img/dashboard/pd-1.jpg" alt="Third slide"/>
                  </div>
                </div>
                <ol class="carousel-indicators">
                  <li data-target="#imagesSlider" data-slide-to="0" class="active"> <img class="d-block w-100" src="../../assets/img/dashboard/pd-3.jpg" alt="First slide"/></li>
                  <li data-target="#imagesSlider" data-slide-to="1" class=""><img class="d-block w-100" src="../../assets/img/dashboard/pd-2.jpg" alt="Second slide"/></li>
                  <li data-target="#imagesSlider" data-slide-to="2" class=""><img class="d-block w-100" src="../../assets/img/dashboard/pd-1.jpg" alt="Third slide"/></li>
                </ol>
              </div>

            </div>

          </div>
          


        </div>
        <div class="col-xl-6 col-md-12  bg-white">
          <div class="ms-panel shadow-none ms-panel-fh">
            <div class="ms-panel-body pb-0">

              <h3>{productDetails?.name}</h3>
              <p className="my-lg">{productDetails?.description}</p>
              <table class="table ms-profile-information">
                <tbody>
                  <tr>
                    <th scope="row">Product Name</th>
                    <td>{productDetails?.name}</td>
                  </tr>
                  <tr>
                    <th scope="row">Product Ingredients</th>
                    <td>{ productDetails?.ingredients}</td>
                  </tr>
                  <tr>
                    <th scope="row">Product Benefits</th>
                    <td>{productDetails?.benefits}</td>
                  </tr>
                  <tr>
                    <th scope="row">Status</th>
                    <td><span class="badge badge-primary">{currency(productDetails?.price)}</span></td>
                  </tr>

                  <tr>
                    <th scope="row">Created on</th>
                    <td>{moment(productDetails?.created_at).format("lll")}</td>
                  </tr>

                  <tr>
                    <th scope="row"></th>
                    <td></td>
                  </tr>



                </tbody>
              </table>
              <button onClick={() => {
                console.log(productDetails);
                                setProductDetails(productDetails); 
                                setIsEditMode(true);
                                setAddProductModal(true);
                              }} class="btn btn-primary mr-3  ms-graph-metrics">Edit</button>

              <button class="btn btn-green ms-graph-metrics">Delete</button>

            </div>

          </div>

        </div>
      </div>
    </div>

    <Modal
        open={addProductModal}
        onClose={handleModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-address">
        <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
                    <div className="modal-content">
                      <div className="modal-body">
                        <button type="button" className="close" onClick={handleModalClose} ><span aria-hidden="true">&times;</span></button>
                        <i className="flaticon-secure-shield d-block"></i>
                        <h1>Add a New Product</h1>
                        <p>Create and manage product </p>

                        <form className="needs-validation clearfix" onSubmit={formik.handleSubmit}>
        <div className="form-row" style={{ marginTop: "5%" }}>
          {/* Name */}


          <div className="col-xl-12 col-md-12">
  <label htmlFor="image">Upload Product Image</label>
  <div className="custom-file">
    <input
      type="file"
      className="form-control custom-file-input"
      id="image"
      name="image"
      accept=".jpg,.png,.jpeg"
      onChange={(e) => {
        const files = e.target.files;
        if (!files || files.length === 0) return;

        const formData = new FormData();
        formData.append("file", files[0]);
        setLoading(true);
        fetch(
          `http://api.nutry-lyfe.pmall.com.ng/api/admin/admin-products/product/upload-file`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${userInfo?.user?.user.token}`,
            },
            body: formData,
          }
        )
          .then((res) => res.json())
          .then((data) => {
            console.log("Upload Success:", data);

            if (data?.url) {
              formik.setFieldValue("image", data.url);
            } else {
              console.error("Upload did not return a URL");
            }
            setLoading(false);
          })
          .catch((error) => {
            console.error("Upload Error:", error);
          });
          
      }}

    />
    <label className="custom-file-label" htmlFor="image" >
      {formik.values.image
        ? "Product uploaded successfully"
        : "Choose file"}
    </label>
  </div>
  {formik.touched.image && formik.errors.image && (
    <div className="text-danger">{formik.errors.image}</div>
  )}
</div>



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

            <input
                type="text"
                className="form-control"
                id="ingredients"
                name="ingredients"
                value={formik.values.ingredients}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                required
              />

            </div>
            {formik.touched.ingredients && formik.errors.ingredients && (
              <div className="text-danger">{formik.errors.ingredients}</div>
            )}
          </div>

          {/* Benefits */}
          <div className="col-xl-6 col-md-12">
            <label htmlFor="benefits">Benefits</label>
            <div className="input-group">
            <input
                type="text"
                className="form-control"
                id="benefits"
                name="benefits"
                value={formik.values.benefits}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                required
              />
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
        
<div className="modal-footer mt-3">
          <button type="button" className="btn btn-light" onClick={handleModalClose}>
            Cancel
          </button>
          <button type="submit" className="btn btn-primary shadow-none" disabled={loading}>
  {loading ? "Processing..." : isEditMode ? "Update Product" : "Save Product"}
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

export default ProductDetails;
