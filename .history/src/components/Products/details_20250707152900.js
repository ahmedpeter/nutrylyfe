import * as React from "react";
import { useState, useEffect} from "react";
import { Link, useParams } from "react-router-dom";
import query from "../../helpers/query.ts";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import moment from "moment";


const ProductDetails = () => {
  const { prodId } = useParams();
  const [productDetails, setProductDetails] = useState(null);
  const userInfo = useSelector((state) => state);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [alertText, setAlert] = useState("");



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
                    <th scope="row">Product Benefit</th>
                    <td>{productDetails?.benefit}</td>
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
              <button class="btn btn-primary mr-3  ms-graph-metrics">Edit</button>

              <button class="btn btn-green ms-graph-metrics">Delete</button>

            </div>

          </div>

        </div>
      </div>
    </div>
    </section>
  );
};

export default ProductDetails;
