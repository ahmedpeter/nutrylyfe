import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useFormik } from "formik";
import { setUser } from "../../redux/user/userSlice.ts";
import { splitFullName } from "../../hooks/splitFullName";
import query from "../../helpers/query.ts";
import {
  setWallet,
  setReferrals,
  setPersonalDetails,
} from "../../redux/user/userDetailSlice.ts";

const Login = () => {
  const onEnter = (e) => {
    e.stopPropagation();
    if (e.key === "Enter") {
      // loginHandler();
    }
  };
 
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [forgotPasswordModal, setForgotPasswordModal] = useState(false);
  const handleModalClose = () => setForgotPasswordModal(false);
  const [alertText, setAlert] = useState("");
  const dispatch = useDispatch();
  const initialValues = {
    username: "",
    password: "",
  };
  const validationSchema = Yup.object({
    password: Yup.string()
      .min(6, "Password must be more than six characters")
      .required(),
    username: Yup.string().min(5, "Must have at least 5 chars").required(),
  });
  const formik = useFormik({
    initialValues,
    onSubmit: async (values) => {
      console.log(values);
      values.device_name = "192.168.0.126";
      setLoading(true);
      const response = await query({
        method: "POST",
        url: "/auth/login",
        bodyData: values,
      });
      setLoading(false);
      console.log(response);
      if (response.success) {
        setAlert(response.data.message);
        const name = response?.data?.data?.user.name;
        const { fname, mname, lname } = splitFullName(name);
        dispatch(
          setUser({
            user: {
              email: response.data.data.user.email,
              lname: lname,
              mname: mname,
              fname:  fname,
              isLoggedIn: true,
              token: response.data.data.token,
              package_id: response.data.data.user.package_id,
              user_type: response.data.data.user.user_type,
              my_ref_id: response.data.data.user.my_ref_id
            },
          })
        );
        navigate("/app/dashboard");
      } else {
        setAlert("Oops! Something went wrong with your login");
      }

      setTimeout(() => {
        setAlert("");
      }, 5000);
    },
    validationSchema,
  });


  const forgotPasswordFormik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Email is required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      setLoading(true);
      const response = await query({
        method: "POST",
        url: "/auth/forgot-password", // ✅ Change to your real endpoint
        bodyData: values,
      });
      setLoading(false);
  
      if (response.success) {
        setAlert("A reset link has been sent to your email.");
        resetForm();
        setForgotPasswordModal(false);
      } else {
        setAlert("Failed to send reset link. Try again.");
      }
  
      setTimeout(() => setAlert(""), 5000);
    },
  });

  

  return (
    <section>
      <div className="w-600 d-flex alc">
        <div className="w-50">
        <div className="w-70 m-auto" >
        <div class="logo-sn ms-d-block-lg">
  <a class="pl-0 ml-0 text-center" href="index.html"> <img src="../../../Nutry_nameLogo.png" alt="NutryLyfe"/> </a>
</div>
          <h3 className="mt-lg">Login</h3>
          <h4>Welcome to NutryLyfe</h4>
          <form onSubmit={formik.handleSubmit}>
          <div className="pos-rel mt-xl">
            <label className=""> username / email</label>
            <input
              type="text"
              className="form-control"
              name="username"
              onChange={formik.handleChange}
              value={formik.values.username}
              placeholder="talk2ahmedpeter@gmail.com"
              error={
                formik.touched.username && formik.errors.username
                  ? formik.errors.username
                  : ""
              }
              id="username"
            />
          </div>
          <div className="pos-rel mt-lg">
            <label className=""> Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={
                formik.touched.password && formik.errors.password
                  ? formik.errors.password
                  : ""
              }
              id="password"
              onKeyPress={onEnter}
            />
            <label className="subtitle text-right mt-lg" onClick={() => setForgotPasswordModal(true)}> Forgotten password?</label>
          </div>
          <div className="h-10" />
          <button className="btn btn-primary w-100" type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Log In"}
          </button>
</form>
          <div className="footer">
            <p className="copyright"> Nutrylyfe &copy; 2025. All rights reserved.</p>
          </div>
        </div>
        </div>

        {/* </div> */}
        <div className="login__bg"></div>
      </div>

      <Modal
        open={forgotPasswordModal}
        onClose={handleModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <div class="modal-dialog modal-dialog-centered modal-min" role="document">
                    <div class="modal-content">
                      <div class="modal-body text-center">
                        <button type="button" class="close" onClick={handleModalClose} ><span aria-hidden="true">&times;</span></button>
                        <i class="flaticon-secure-shield d-block"></i>
                        <h1>Forgot Password?</h1>
                        <p> Enter your email to recover your password </p>
                        <form >
                          <div class="ms-form-group has-icon">
                            <input type="text" placeholder="Email Address" class="form-control" name="email" id="email" onChange={forgotFormik.handleChange}
      onBlur={forgotFormik.handleBlur}
      value={forgotFormik.values.email}/>
                            <i class="material-icons">email</i>
                            
                          </div>
                          <button type="submit" class="btn btn-primary shadow-none">Reset Password</button>
                        </form>
                      </div>

                    </div>
                  </div>
      </Modal>
     


      
    </section>
  );
};

export default Login;
