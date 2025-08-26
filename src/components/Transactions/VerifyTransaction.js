// import * as React from "react";
import * as React from "react";
import { useState, useEffect } from "react";
import query from "../../helpers/query.ts";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";

const VerifyTransaction = () => {
  const userInfo = useSelector((state) => state);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [alertText, setAlert] = useState("");
   
  const reference = localStorage.getItem("funding_ref");
const verifyFunds = async () => {
    console.log(reference);
    try {
        const response = await query({
          method: "POST",
          url: `/wallet/verify-funding`,
          bodyData: JSON.parse(reference),
          token: userInfo?.user?.user?.token,
        });
  console.log(response);
        if (response?.success) {
          setAlert("Funding Verified successfully!");
          localStorage.removeItem("funding_ref");
          setTimeout(() => navigate("/app/dashboard"), 5000);

        //   navigate("/app/dashboard");
        } else {
          setAlert(response?.message || "Failed to verify funds.");
          setTimeout(() => setAlert(""), 5000);
        }
      } catch (error) {
        console.error("Error Verifying:", error);
        setAlert("An error occurred while verifying the funding.");
      }
}

  useEffect(() => {
    verifyFunds();
  }, []);

  return (
    <section>
      <p> Please wait... verifying transaction </p>
    </section>
  );
};

export default VerifyTransaction;
