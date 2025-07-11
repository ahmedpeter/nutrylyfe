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
    </section>
  );
};

export default Products;
