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


const Cart = () => {
  const [cart, setCart] = useState(() => {
    if (typeof localStorage !== "undefined") {
        return JSON.parse(localStorage.getItem("mainCart")) || [];
    }
    return [];
});

const totalPrice = cart.reduce((acc, item) => acc + item.selling_price * item.amtItems, 0) || 0;

useEffect(() => {
    localStorage.setItem("mainCart", JSON.stringify(cart));
    console.log(localStorage.getItem("mainCart"));
    console.log(cart);
}, [cart]);

const updateCart = (updatedCart) => {
    setCart(updatedCart);
    localStorage.setItem("mainCart", JSON.stringify(updatedCart));
};

const incrementItemAmt = (id) => {
    const updatedCart = cart.map(item =>
        item.id === id ? { ...item, amtItems: item.amtItems + 1 } : item
    );
    updateCart(updatedCart);
};

const decrementItemAmt = (id) => {
    const updatedCart = cart
        .map(item =>
            item.id === id && item.amtItems > 1 ? { ...item, amtItems: item.amtItems - 1 } : item
        )
        .filter(item => item.amtItems > 0); // Removes items with zero quantity
    updateCart(updatedCart);
};

const deleteCartItem = (id) => {
    const updatedCart = cart.filter(item => item.id !== id);
    updateCart(updatedCart);
};

const clearCart = () => {
    setCart([]);
    localStorage.removeItem("mainCart");
};

  return (
    <section>
      <div class="ms-content-wrapper">

          {cart.length > 0 && cart.map((product)=> (
      <div class="row ">
        <div class="col-xl-3 col-md-4 bg-white">
          <div class="ms-panel shadow-none">

            <div class="ms-panel-body pb-0">
              <div id="imagesSlider" class="ms-image-slider carousel slide" data-ride="carousel">
                <div class="carousel-inner">
                  <div class="carousel-item active">
                    <img class="d-block w-100" src={
                                    `http://api.nutry-lyfe.pmall.com.ng` +
                                    product.image
                                  } alt={product.image}/>
                  </div>
                  
                </div>
              </div>

            </div>

          </div>
          


        </div>

        
        <div class="col-xl-6 col-md-12  bg-white">
          <div class="ms-panel shadow-none ms-panel-fh">
            <div class="ms-panel-body pb-0">
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                <h3>{product?.name}</h3>
              <h3 class="badge badge-primary">{product?.price}</h3>
            </div>
              
              <p className="my-lg">{product?.description}</p>
              <table class="table ms-profile-information">
                <tbody>
                  {/* <tr>
                    <th scope="row">Price</th>
                    <td><span class="badge badge-primary">{currency(product?.price)}</span></td>
                  </tr> */}

                  {/* <tr>
                    <th scope="row">Created on</th>
                    <td>{moment(product?.created_at).format("lll")}</td>
                  </tr> */}

                  {/* <tr>
                    <th scope="row"></th>
                    <td></td>
                  </tr> */}



                </tbody>
              </table>

              <button class="btn btn-green ms-graph-metrics">Delete</button>

            </div>

          </div>

        </div>
      </div>
      ))}
    </div>

    

    </section>
  );
};

export default Cart;
