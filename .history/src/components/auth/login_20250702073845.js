import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { useFormik } from "formik";
import { setUser } from "../../redux/user/userSlice.ts";
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
      values.device_name = "192.168.43.1";
      // navigate("/app/dashboard");
      setLoading(true);
      const response = await query({
        method: "POST",
        url: "/auth/login",
        body: values,
      });
      setLoading(false);
      console.log(response);
      if (response.success) {
        setAlert(response.data.message);
        dispatch(
          setUser({
            user: {
              email: response.data.data.user.email,
              firstName: response.data.data.user.name,
              isLoggedIn: true,
              token: response.data.data.token,
              package: response.data.data.package_id,
              accType: response.data.data.acct_type
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
              onChange={formik.handleChange}
              error={
                formik.touched.password && formik.errors.password
                  ? formik.errors.password
                  : ""
              }
              id="password"
              onKeyPress={onEnter}
            />
            <label className="subtitle text-right mt-lg"> Forgotten password?</label>
          </div>
          <div className="h-10" />
          <button className="btn btn-primary w-100" type="submit" onClick={formik.handleSubmit}>
            Log In
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
    </section>
  );
};

export default Login;
