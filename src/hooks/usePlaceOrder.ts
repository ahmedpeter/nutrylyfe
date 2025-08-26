import { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import query from "../helpers/query.ts";

export const usePlaceOrder = () => {
    const [serverResp, setServerResp] = useState("");
    // const [isLoading, setIsLoading] = useState(false);
    const cart = useSelector((state) => state?.cart.cart);
  const userToken = useSelector((state) => state?.user?.user?.token); 

  const placeOrder = async (stockist_user_id, payment_type) => {
    if (!stockist_user_id) {
      alert("No stockist selected.");
      return;
    }
    console.log(cart);
    const products = cart
    .filter(item => item?.id && item?.quantity)
    .map(item => ({
      user_product_id: item.id,
      quantity: item.quantity
    }));

    console.log(products);
  if (!products.length) {
    throw new Error("Cart is empty or invalid.");
  }

    const payload = {
      stockist_user_id,
      products,
      payment_type
    };

    console.log("📦 Sending order payload:", payload);
    console.log("token", userToken);

    try {
      const response = await query({
        method: "POST",
        url: `/payment/orders/place-order`,
        bodyData: payload,
        token: userToken,
      });
      if (response.status || response.success) {
        console.log("✅ Order placed:", response);
        setServerResp(response.data.message);
        setTimeout(() => setServerResp(""), 5000);
        return response.data || response;
      } else {
        console.warn("⚠️ Order not successful:", response);
        setServerResp(response.data.message);
        setTimeout(() => setServerResp(""), 5000);
        return null;
      }
    } catch (error) {
        setServerResp(error?.response?.data?.message || error.message || "An error occurred.");
        setTimeout(() => setServerResp(""), 5000);
      throw error;
    }
  };

  return { placeOrder, serverResp };
};
