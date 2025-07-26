// import * as React from "react";
import * as React from "react";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { usePlaceOrder } from '../../hooks/usePlaceOrder.ts';
import currency from "../../utils/formatCurrency";
import Loader from "../../utils/loader";
import {
    addItem,
    removeItem,
    incrementItem,
    decrementItem,
    clearCart,
    selectCart,
  } from "../../redux/user/cartSlice.ts";
  
import query from "../../helpers/query.ts";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";

const StockiestProducts = () => {
    const { stockiestId } = useParams();
  const [loading, setLoading] = useState(false);
  const [alertText, setAlert] = useState("");
  const userInfo = useSelector((state) => state);
  const navigate = useNavigate();
  const [productList, setProductList] = useState(null);
  const { placeOrder, serverResp } = usePlaceOrder();
const [cartMessage, setCartMessage] = useState("");
const dispatch = useDispatch();
const cartItems = useSelector(selectCart);

  const getAllProducts = async () => {
    setLoading(true);
    if (!userInfo.user.user.token) {
      navigate("/");
    }
    const response = await query({
      method: "GET",
      url: `/networker/stockist/get-all-products-by-stockist/${stockiestId}`,
      token: userInfo?.user?.user.token,
    });
    console.log(response);
    if (response.data.status) {
      setLoading(false);
      console.log(response);
      setProductList(response?.data?.data);
    } else {
      console.log(response);
      setAlert(response?.data?.message);
      setTimeout(() => setAlert(""), 5000);
      setLoading(false);
    }
  };

  const handleAddToCart = (product) => {
    dispatch(addItem({ ...product, quantity: 1 }));
    setCartMessage(
      <div className="title-case">
        {product.name} added to cart!
      </div>
    );
    setTimeout(() => setCartMessage(""), 5000);
  };
  
    const handlePlaceOrder = async () => {
      try {
        await placeOrder(stockiestId);
      } catch (err) {
        const errorMessage =
        err?.response?.data?.data?.message || "Failed to place order.";
        setAlert(errorMessage);
      }
      setTimeout(() => setAlert(""), 5000);
      setLoading(false);
    
    };


const clearCart = () => {
    dispatch(clearCart());
};


  useEffect(() => {
      console.log(cartItems);
    getAllProducts();
  }, [cartItems]);

  return (
    <section>
      <div class="ms-content-wrapper">
      <div class="col-xl-3 col-md-6 pdght">
      {cartMessage && <div className="alert alert-info mt-md">{cartMessage}</div>}
      {serverResp && <div className="alert alert-success mt-md">{serverResp}</div>}
      </div>
        <div class="row">
          <div class="col-xl-12 col-md-12">
            <div class="ms-panel ms-panel-fh ms-crypto-orders">
              <div class="ms-panel-header">
                <div class="d-flex justify-content-between">
                  <div class="ms-header-text">
                    <h6>All Products</h6>
                    <p>
                      Manage all System Products{" "}
                      <span class="badge badge-danger">
                        {productList?.length}
                      </span>
                    </p>
                  </div>
                  
                </div>
                {alertText && (
                    <>
                  <div className="alert alert-info mt-md">{alertText}</div>

                  BBB
                  </>
                )}
              </div>
              {loading && <Loader />}
              { !loading && (
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
                                <img
                                  src={
                                    `https://nutry.pmall.com.ng/` +
                                    product.product.image
                                  }
                                  alt={product.product.name}
                                />
                              </div>
                              <div class="ms-card-body">
                                <div class="ms-panel-custom">
                                  <h4>{product.product.name}</h4>
                                </div>
                                    <table class="table ms-profile-information">
                <tbody>
                  <tr>
                    <th scope="row"> Ingredients</th>
                    <td>{ product.product.ingredients}</td>
                  </tr>
                  <tr>
                    <th scope="row"> Benefits</th>
                    <td>{product.product.benefits}</td>
                  </tr>
                  <tr>
                    <th scope="row">Price</th>
                    <td><h4 class="badge badge-primary">{currency(product.product?.price)}</h4></td>
                  </tr>
                  <tr>
                    <th scope="row">Point Value</th>
                    <td> 0 </td>
                  </tr>



                </tbody>
              </table>
              <button onClick={() => handleAddToCart(product.product)} class="btn btn-primary mr-3  ms-graph-metrics">Add To Cart</button>

                               
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              )}
            </div>
            <div className="floating__table">
            <div class="ms-panel-body pb-0">

              <h3 style={{marginBottom: 20}}>Order Details</h3>
              <table class="table ms-profile-information">
                <tbody>
                {cartItems.cart.length > 0 && cartItems.cart.map((product)=> (
                  <tr>
                      <i onClick={() => dispatch(removeItem(product.id))} class="fa fa-trash fa-15x"></i>
                        <td scope="row">{product.name}</td>
                            <td>{currency(product.price)} </td>
                            <td>
                            <div class="flex g-10 all-center cart-item-count">
                                <p class="f-12 count flex all-center" onClick={() => dispatch(decrementItem(product.id))}> - </p>
                                <p class="f-12" style={{marginTop: 10}}>{product.quantity}</p>
                                <p class="f-12 count flex all-center"  onClick={() => dispatch(incrementItem(product.id))}> + </p>

                            </div>

                                
                                </td>
                  </tr>
                ))}
                <tr>
                    <td>
                     </td>
                </tr>
                  
                </tbody>
                {(cartItems.cart.length === 0 && !loading) && (
                    <p> Oops! Nothing in cart yet </p>
                )}
              </table>

              <button onClick={handlePlaceOrder} class="btn btn-green ms-graph-metrics" style={{marginBottom: 20}}>Place Order</button>

            </div>
</div>
          </div>
        </div>
        
      </div>

    </section>
  );
};

export default StockiestProducts;
