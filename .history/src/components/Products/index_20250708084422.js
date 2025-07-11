// import * as React from "react";
import * as React from "react";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
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

  const handleProductClick = (id) => {
    navigate(`/app/product/${id}/details`);
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: selectedProduct?.name || "",
      benefits: selectedProduct?.price ||"",
      ingredients: selectedProduct?.ingredients ||"",
      benefits: selectedProduct?.benefits ||"",
      description: selectedProduct?.description ||"",
      image: null, 
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
          url: isEditMode ? 
          `/admin/admin-products/product/update/${selectedProduct.id}` : "/admin/admin-products/product/create",
          bodyData: values,
          token: userInfo?.user?.user.token,
        });
        if(response.status) {
          setAlert(response.message);
          setAddProductModal(false);
          getAllProducts()
        } else {
          setAlert(response.message);
        }
        setLoading(false);
      },
  });


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
                    <p>Manage all System Products  <span class="badge badge-danger">{productList?.length}</span></p>
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
                        onClick={() => setAddProductModal(true)}
                      >
                        {" "}
                        Add New Product{" "}
                      </a>
                    </li>
                  </ul>
                </div>
                {alertText && <div className="alert alert-info mt-md">{alertText}</div>}
              </div>
              <div class="ms-panel-body p-0">
                <div class="tab-content">
                  <div
                    role="tabpanel"
                    class="tab-pane fade in active show"
                    id="b-orders"
                  >

<div class="ms-panel-body">
              <div class="row">
              {productList?.map((product, i) => (

<div class="col-lg-4 col-md-6 col-sm-6">
<div class="ms-card">
  <div class="ms-card-img">
    <img src={`http://api.nutry-lyfe.pmall.com.ng/api`+product.image} alt={product.name}/>
  </div>
  <div class="ms-card-body">

    <div class="ms-panel-custom">
      <h4>{product.name}</h4>
      <span class="ms-text-primary">{currency(product.price)}</span>
    </div>

    <p>{product.description}</p>
    <div class="ms-panel-custom">
      <button class="btn btn-primary mr-2   ms-custom-btn" onClick={() => {
        console.log(product);
                                setSelectedProduct(product); 
                                setIsEditMode(true);
                                setAddProductModal(true);
                              }}>Edit</button>
      <button class="btn btn-dark  ms-custom-btn">Delete</button>
    </div>
  </div>
</div>
</div>
              ))}
              </div>
            </div>
                  </div>
                </div>
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
                        <h1>isEdit</h1>
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

export default Products;
