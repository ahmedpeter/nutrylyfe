import * as React from "react";
import currency from "../../utils/formatCurrency";
import { useState, useEffect } from "react";
import { useFormik } from "formik";
import { statesAndLgas } from '../../helpers/states';
import * as Yup from "yup";
import query from "../../helpers/query.ts";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import moment from "moment";

const UserProfile = () => {
  const [newDriverModal, setNewDriverModal] = useState(false);
  const handleModalClose = () => setNewDriverModal(false);
  const userInfo = useSelector((state) => state);
    const [packageList, setPackageList] = useState([]);
    const [myNetworkList, setMyNetworkList] = useState([]);
    const [selectedState, setSelectedState] = useState('');
  const [lgas, setLgas] = useState([]);

    const navigate = useNavigate();
  const [alertText, setAlert] = useState("");
  const [loading, setLoading] = useState(false);


  const handleStateChange = (e) => {
    const stateName = e.target.value;
    setSelectedState(stateName);
    formik.setFieldValue("state", stateName);
    formik.setFieldValue("lga", ""); // Clear LGA
    const found = statesAndLgas.find((s) => s.state === stateName);
    setLgas(found ? found.lgas : []);
  };


//   Add New Stockiest

const formik = useFormik({
    initialValues: {
      name: "",
      lga: "",
      ref_id: "",
      state: "",
      package_id: "",
      email: "",
      phone: "",
      address: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Full name is required"),
      lga: Yup.string().required("LGA is required"),
      ref_id: Yup.string().required("Ref ID is required"),
      state: Yup.string().required("Stockiest location is required"),
      package_id: Yup.string().required("Package type is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
      phone: Yup.string().required("Phone is required"),
      address: Yup.string().required("address is required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      console.log("Form data submitted:", values);
      setLoading(true);
      const response = await query({
        method: "POST",
        url: "/auth/register/stockist",
        bodyData: values,
      });
      setLoading(false);
      setAlert(response.data.message);
        resetForm();
      console.log(response);
    },
  });
//   Get all Packages

  const getAllPackages = async () => {
    setLoading(true);
    if (!userInfo.user.user.token) {
      navigate("/auth/login");
    }
    // console.log(userType);
    const response = await query({
      method: "GET",
      url: "/account-packages/all",
      token: userInfo?.user?.user.token,
    });
    console.log(response);
    if (response.success) {
      setLoading(false);
      console.log(response);
      setPackageList(response?.data?.data.packages);
    } else {
      console.log(response);
      setAlert(response?.data?.message);
      setLoading(false);
    }
  };

  


  useEffect(() => {
    getAllPackages();
  }, []);


  return (
    <section>
    
    </section>
  );
};

export default UserProfile;
