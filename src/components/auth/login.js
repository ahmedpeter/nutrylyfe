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
  const [passwordTokenModal, setPasswordTokenModal] = useState(false);
  const [resetPasswordModal, setResetPasswordModal] = useState(false);
  const handleResetModalClose = () => setResetPasswordModal(false);
  const handleModalClose = () => setForgotPasswordModal(false);
  const handleTokenModalClose = () => setPasswordTokenModal(false);
  const [alertText, setAlert] = useState("");
  const dispatch = useDispatch();
  const initialValues = {
    username: "",
    password: "",
  };

  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword((prevState) => !prevState);
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
              wallet: response.data.data.user.wallet?.balance,
              pv: response.data.data.user.wallet?.pv,
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
        url: "/auth/forgot-password",
        bodyData: values,
      });
      setLoading(false);
  
      if (response.success) {
        setAlert(response.data.message);
        resetForm();
        setForgotPasswordModal(false);
        setPasswordTokenModal(true);
      } else {
        setAlert(response.data.message);
      }
  
      setTimeout(() => setAlert(""), 5000);
    },
  });

  const updateTokenFormik = useFormik({
    initialValues: {
      email: "",
      token: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Email is required"),
      token: Yup.string().required("Token from email is required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      setLoading(true);
      const response = await query({
        method: "POST",
        url: "/auth/verify-code",
        bodyData: values,
      });
      setLoading(false);
  console.log(response)
      if (response.success) {
        setAlert(response.data.message);
        resetForm();
        setPasswordTokenModal(false);
        setResetPasswordModal(true);
      } else {
        setAlert(response.data.message);
      }
  
      setTimeout(() => setAlert(""), 5000);
    },
  });

  const resetPasswordFormik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Email is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      setLoading(true);
      const response = await query({
        method: "POST",
        url: "/auth/reset-password",
        bodyData: values,
      });
      setLoading(false);
  console.log(response)
      if (response.success) {
        setAlert(response.data.message);
        resetForm();
        setPasswordTokenModal(false);
      } else {
        setAlert(response.data.message);
      }
  
      setTimeout(() => setAlert(""), 5000);
    },
  });

  

  return (
    <section>
      <div className="w-600 d-flex alc">
        <div className="w-50">
        <div className="w-70 m-auto" >
        <div className="logo-sn ms-d-block-lg">
          <a className="pl-0 ml-0 text-center" href="index.html"> <img src="../../../Nutry_nameLogo.png" alt="NutryLyfe"/> </a>
        </div>
          <h3 className="mt-lg">Login</h3>
          <h4>Welcome to NutryLyfe</h4>

          {alertText && <div className="alert alert-info mt-md">{alertText}</div>}
          <form onSubmit={formik.handleSubmit}>
          <div className="pos-rel mt-xl">
            <label className=""> username / email</label>
            <input
              type="text"
              className="form-control"
              name="username"
              onChange={formik.handleChange}
              value={formik.values.username}
              placeholder="example@email.com"
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
            <div className="ms-form-group has-icon">
            <input
              type={showPassword ? "text" : "password"}
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

          {showPassword ? 
            <i className="material-icons" onClick={togglePassword}>visibility</i>
              : 
              <i className="material-icons" onClick={togglePassword}>visibility_off</i>
          }



            
            </div>
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
        onClose={(event, reason) => {
          if (reason === 'backdropClick') return;
          handleModalClose();
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <div className="modal-dialog modal-dialog-centered modal-min" role="document">
                    <div className="modal-content">
                      <div className="modal-body text-center">
                        <button type="button" className="close" onClick={handleModalClose} ><span aria-hidden="true">&times;</span></button>
                        <i className="flaticon-secure-shield d-block"></i>
                        <h1>Forgot Password?</h1>
                        <p> Enter your email to recover your password </p>

                        <form onSubmit={forgotPasswordFormik.handleSubmit}>
                          <div className="ms-form-group has-icon">
                            <input type="text" placeholder="Email Address" className="form-control" name="email" id="email" onChange={forgotPasswordFormik.handleChange}
      onBlur={forgotPasswordFormik.handleBlur}
      value={forgotPasswordFormik.values.email}/>
                            <i className="material-icons">email</i>
                            {forgotPasswordFormik.touched.email && forgotPasswordFormik.errors.email && (
      <div className="text-danger">{forgotPasswordFormik.errors.email}</div>
    )}
                          </div>
                          <button type="submit" className="btn btn-primary shadow-none"> {loading ? "Sending..." : "Reset Password"}</button>
                        </form>
                      </div>

                    </div>
                  </div>
      </Modal>

      <Modal
        open={passwordTokenModal}
        onClose={handleTokenModalClose}
        onClose={(event, reason) => {
          if (reason === 'backdropClick') return;
          handleTokenModalClose();
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <div className="modal-dialog modal-dialog-centered modal-min" role="document">
                    <div className="modal-content">
                      <div className="modal-body text-center">
                        <button type="button" className="close" onClick={handleTokenModalClose} ><span aria-hidden="true">&times;</span></button>
                        <i className="flaticon-secure-shield d-block"></i>
                        <h1>Provide Token</h1>
                        <p> Enter the 6 digit code that was sent to your email. We just want to ensure you are making this request on purpose. </p>

                        <form onSubmit={updateTokenFormik.handleSubmit}>
                        <div className="ms-form-group has-icon">
                            <input type="text" placeholder="Email Address" className="form-control" name="email" id="email" onChange={updateTokenFormik.handleChange}
      onBlur={updateTokenFormik.handleBlur}
      value={updateTokenFormik.values.email}/>
                            <i className="material-icons">email</i>
                            {updateTokenFormik.touched.email && updateTokenFormik.errors.email && (
      <div className="text-danger">{updateTokenFormik.errors.email}</div>
    )}
                          </div>
                          <div className="ms-form-group has-icon">
                            <input type="text" placeholder="Enter Token" className="form-control" name="token" id="token" onChange={updateTokenFormik.handleChange}
      onBlur={updateTokenFormik.handleBlur}
      value={updateTokenFormik.values.token}/>
                            <i className="material-icons">key</i>
                            {updateTokenFormik.touched.token && updateTokenFormik.errors.token && (
      <div className="text-danger">{updateTokenFormik.errors.token}</div>
    )}
                          </div>
                          <button type="submit" className="btn btn-primary shadow-none"> {loading ? "Validating..." : "Validate Token"}</button>
                        </form>
                      </div>

                    </div>
                  </div>
      </Modal>
     
      <Modal
        open={resetPasswordModal}
        onClose={handleResetModalClose}
        onClose={(event, reason) => {
          if (reason === 'backdropClick') return;
          handleResetModalClose();
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <div className="modal-dialog modal-dialog-centered modal-min" role="document">
                    <div className="modal-content">
                      <div className="modal-body text-center">
                        <button type="button" className="close" onClick={handleResetModalClose} ><span aria-hidden="true">&times;</span></button>
                        <i className="flaticon-secure-shield d-block"></i>
                        <h1>Set  New Password</h1>
                        <p> Set a New Password for your account </p>

                        <form onSubmit={resetPasswordFormik.handleSubmit}>
                          <div className="ms-form-group has-icon">
                            <input type="text" placeholder="Email Address" className="form-control" name="email" id="email" onChange={resetPasswordFormik.handleChange}
      onBlur={resetPasswordFormik.handleBlur}
      value={resetPasswordFormik.values.email}/>
                            <i className="material-icons">email</i>
                            {resetPasswordFormik.touched.email && resetPasswordFormik.errors.email && (
      <div className="text-danger">{resetPasswordFormik.errors.email}</div>
    )}
                          </div>
                          <div className="ms-form-group has-icon">
                            <input type="text" placeholder="New Password" className="form-control" name="password" id="password" onChange={resetPasswordFormik.handleChange}
      onBlur={resetPasswordFormik.handleBlur}
      value={resetPasswordFormik.values.password}/>
                            <i className="material-icons">password</i>
                            {resetPasswordFormik.touched.password && resetPasswordFormik.errors.password && (
      <div className="text-danger">{resetPasswordFormik.errors.password}</div>
    )}
                          </div>
                          <button type="submit" className="btn btn-primary shadow-none"> {loading ? "Updating..." : "Resetting Password"}</button>
                        </form>
                      </div>

                    </div>
                  </div>
      </Modal>

      
    </section>
  );
};

export default Login;
