import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import query from "../helpers/query.ts";

const ConvertPackage = ({ id, type }) => {
  const userInfo = useSelector((state) => state.user); // fixed
  const [allPackages, setAllPackages] = useState([]);
  const [loading, setLoading] = useState(false);

  const token = userInfo?.token;

  useEffect(() => {
    const fetchAllPackages = async () => {
      if (!userInfo?.token || allPackages.length > 0) return;
      setLoading(true);
      try {
        const result = await query({
          method: "GET",
          url: "/account-packages/all",
          token: userInfo.token,
        });
  
        if (result?.data?.packages) {
          setAllPackages(result.data.packages);
        } else {
          console.error("Invalid API response:", result);
        }
      } catch (error) {
        console.error("Error fetching packages:", error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchAllPackages();
  }, [userInfo?.token]);
  

  const packageItem = allPackages.find(
    (pkg) => pkg.id === id && pkg.type === type
  );

  return (
    <span>{loading ? "Loading..." : packageItem ? packageItem.name : "Not Found"}</span>
  );
};

export default ConvertPackage;
