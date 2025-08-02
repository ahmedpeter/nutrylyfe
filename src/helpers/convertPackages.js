import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import query from "../helpers/query.ts";

const ConvertPackage = ({ id }) => {
  const userInfo = useSelector((state) => state.user);
  const [allPackages, setAllPackages] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchAllPackages = async () => {
    if (!userInfo?.user.token) return;
    setLoading(true);
    try {
      const result = await query({
        method: "GET",
        url: "/account-packages/all",
        token: userInfo?.user.token,
      });
console.log(result)
      if (result?.data?.data.packages) {
        setAllPackages(result.data.data.packages);
      }
    } catch (error) {
      console.error("Error fetching packages:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    console.log(userInfo)
    

    fetchAllPackages();
  }, [userInfo?.token]);

  const packageItem = allPackages.find((pkg) => String(pkg.id) === String(id));

  return (
    <span>
    {loading ? "Loading..." : packageItem ? packageItem.name : "No Package"}
  </span>
  );
};


export default ConvertPackage;
