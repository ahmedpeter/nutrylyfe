import react from "react";
import useForm from "../../utils/useForm";

const ResetPassword = () => {
  const onEnter = (e) => {
    e.stopPropagation();
    if (e.key === "Enter") {
      loginHandler();
    }
  };

  const loginHandler = () => {
    console.log(inputValues);
  };

  const [inputValues, onChangeHandler, onSubmitHandler] = useForm(loginHandler);

  return (
    <section>
      <div className="w-600 d-flex alc">
        <div className="w-50">
        <div className="w-70 m-auto" >
        <div class="logo-sn ms-d-block-lg">
  <a class="pl-0 ml-0 text-center" href="index.html"> <img src="../../../Nutry_nameLogo.png" alt="NutryLyfe"/> </a>
</div>
          <h3 className="mt-lg">New Password</h3>
          <p>Set a new password for your account</p>
          
          <div className="pos-rel mt-xl">
            <label className=""> username / email</label>
            <input
              type="text"
              className="form-control"
              name="username"
              onChange={onChangeHandler}
              placeholder="talk2ahmedpeter@gmail.com"
              value={inputValues.username || ""}
            />
          </div>
          <div className="pos-rel mt-lg">
            <label className=""> Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              onChange={onChangeHandler}
              value={inputValues.password || ""}
            />
          </div>
          <div className="pos-rel mt-lg">
            <label className=""> Password again</label>
            <input
              type="password"
              className="form-control"
              name="password"
              onChange={onChangeHandler}
              value={inputValues.password || ""}
              onKeyPress={onEnter}
            />
          </div>
          <div className="h-10" />
          <button className="btn btn-primary w-100" type="submit" onClick={loginHandler}>
            Set this password
          </button>

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

export default ResetPassword;
