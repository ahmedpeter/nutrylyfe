import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
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
      // navigate("/app/dashboard");
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
            <label className="subtitle text-right mt-lg" onClick={() => setForgotPasswordModal(true)}> Forgotten password?</label>
          </div>
          <div className="h-10" />
          <button className="btn btn-primary w-100" type="submit">
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

      <Modal
        open={newProductModal}
        onClose={handleModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={style}>
          <div className="mb-35">
            <Typography id="modal-modal-title">
              <h4 className="summary__title t-xl title-case">Add Product</h4>
            </Typography>
            <div className="s-divider"></div>
          </div>
          <section className="flex__normal">
            <div className="w-250">
              <div className="">
                {inputValues.image ?
                 <img src={inputValues.image} className="w-100i" name="image" value={inputValues.image || ""} /> :
                <img src={profile} className="w-100i" name="image" value={inputValues.image || ""} />
                }
                <div className="pos-rel w100-m10 ">
                  <input
                    type="file"
                    className="form-control-input no-border"
                    name="file"
                    accept=".jpg,.png,.jpeg"
                    onChange={(e) => {
                      // if (selectedName == "") {
                      //   setAlert("Please Select a file name");
                      //   return;
                      // }
                      const formData = new FormData();
                      const files = e.target.files;
                      files?.length && formData.append("file", files[0]);
                      //setLoading(true);
                      fetch(
                        `${BASE_URL}/products/upload-file`,
                        {
                          method: "POST",
                          body: formData,
                          headers: {
                            Authorization: "Bearer " + localStorage.getItem("authToken"),
                          },
                        }
                      )
                        .then((res) => res.json())
                        .then((data) => {
                          //setLoading(false);
                          console.log(data)
                          setState((inputValues) => ({
                            ...inputValues,
                            image: data.url, 
                          }))
                          console.log(inputValues)
                        })
                        .catch((error) => {
                          //setLoading(false);
                          console.log(error)
                        });
                    }}
                  />
                </div>
              </div>
            </div>
            <form style={{ width: "100%" }}>
              <section className="flex-container mb-lg">
                <div className="pos-rel w100-m10 ">
                  <label> Product Name</label>
                  <input
                    type="text"
                    className="form-control-input "
                    name="name"
                    placeholder="e.g Herbal jinger"
                    onChange={onChangeHandler}
                    value={inputValues.name || ""}
                  />
                </div>
                <div className="pos-rel w100-m10 ">
                  <label className="mb-7"> Product Category</label>
                  <select
                    className="search__bar w-100"
                    value={inputValues.category_id || ""}
                    name="category_id"
                    onChange={handleCategoryChange}
                    >
                    <option value="default"> Select Category</option>
                    {categories?.map((category) => (
                      <option value={category.id}>{category.name}</option>
                    ))}
                  </select>
                </div>
              <div className="pos-rel w100-m10 ">
                  <label className="mb-7"> Sub Category</label>
                  <select
                    className="search__bar w-100"
                    value={inputValues.sub_category_id || ""}
                    name="sub_category"
                    onChange={onChangeHandler}
                    value={inputValues.sub_categories}
                    disabled={!selectedCategory}
                    >
                    <option value="default"> Select Sub Category</option>
                    {subCategories?.map((sub_cat) => (
                      <option value={sub_cat.id}>{sub_cat.name}</option>
                    ))}
                  </select>
                </div>
              </section>

              <section className="flex-container mb-lg">
                <div className="pos-rel w100-m10 ">
                  <label className="mb-7"> Product Brand</label>
                  <select
                    className="search__bar w-100"
                    name="brand_id"
                    value={inputValues.brand_id || ""}
                    onChange={onChangeHandler}
                    >
                    <option value="default"> Select Brand</option>
                    {brands?.map((brand) => (
                      <option value={brand.id}>{brand.name}</option>
                    ))}
                  </select>
                </div>

                <div className="pos-rel w100-m10 ">
                  <label> Cost Price</label>
                  <input
                    type="number"
                    className="form-control-input "
                    name="cost_price"
                    placeholder="1500"
                    onChange={onChangeHandler}
                    value={inputValues.cost_price || ""}
                  />
                </div>
                <div className="pos-rel w100-m10 ">
                  <label>Selling Price (lower than cost price)</label>
                  <input
                    type="number"
                    className="form-control-input "
                    name="selling_price"
                    placeholder="1200"
                    onChange={onChangeHandler}
                    value={inputValues.selling_price || ""}
                  />
                </div>
              </section>
              <section className="flex-container mb-lg">
              <div className="pos-rel w100-m10 ">
                  <label> PRODUCT AVAILABLE FOR PURCHASE?</label>
                  <select
                  className="form-control-input "
                  name="inStock"
                    // value={inputValues.category_id || ""}
                    // name="category_id"
                    onChange={onChangeHandler}
                    value={inputValues.inStock || ""}
                    >
                    <option value="default"> Select Product availability</option>
                    
                      <option value={1}>In Stock</option>
                      <option value={0}>Currently Out of Stock</option>
                  </select>

                  {/* <input
                    type="number"
                    className="form-control-input "
                    name="inStock"
                    placeholder="500"
                    onChange={onChangeHandler}
                    value={inputValues.inStock || ""}
                  /> */}
                </div>

                <div className="pos-rel w100-m10 ">
                  <label>Quantity AVAILABLE</label>
                  <input
                    type="number"
                    className="form-control-input "
                    name="quantity"
                    placeholder="500"
                    onChange={onChangeHandler}
                    value={inputValues.quantity || ""}
                  />
                </div>
              </section>
              <section className="flex-container mb-lg">
                <div className="pos-rel w-100 ">
                  <label style={{marginBottom: 7}}>SELECT TAGS ASSOCIATED WITH PRODUCT </label>
                  <Stack spacing={3} sx={{ width: "100%" }}>
                  <Autocomplete
            multiple
            freeSolo
            id="tags-outlined"
            options={[]}
            value={inputValues.tags}
            onChange={handleChange}
            filterSelectedOptions
            renderTags={(value, getTagProps) =>
              value.map((option, index) => (
                <Chip
                  key={index}
                  variant="outlined"
                  label={option}
                  {...getTagProps({ index })}
                />
              ))
            }
            renderInput={(params) => (
              <TextField {...params} placeholder="Type a tag and press enter" />
            )}
          />
                  </Stack>
                </div>
              </section>
              <section className="flex-container mb-lg">
                <div className="pos-rel w100-m10 ">
                  <label>More Images 1</label>
                  <input
                    type="file"
                    className="form-control-input no-border"
                    name="more_images"
                    accept=".jpg,.png,.jpeg"
                    onChange={(e) => {
                      const formData = new FormData();
                      const files = e.target.files;
                      files?.length && formData.append("file", files[0]);
                      //setLoading(true);
                      fetch(
                        `${BASE_URL}/products/upload-file`,
                        {
                          method: "POST",
                          body: formData,
                          headers: {
                            Authorization: "Bearer " + localStorage.getItem("authToken"),
                          },
                        }
                      )
                        .then((res) => res.json())
                        .then((data) => {
                          setLoading(false);
                          console.log(data)
                          setMoreImages([...moreImages, data.url])
                          console.log(moreImages)
                        })
                        .catch((error) => {
                          setLoading(false);
                          console.log(error)
                        });
                    }}
                    multiple
                  />
                </div>
                <div className="pos-rel w100-m10 ">
                  <label>More Images 2</label>
                  <input
                    type="file"
                    className="form-control-input no-border"
                    name="more_images"
                    accept=".jpg,.png,.jpeg"
                    onChange={(e) => {
                      const formData = new FormData();
                      const files = e.target.files;
                      files?.length && formData.append("file", files[0]);
                      //setLoading(true);
                      fetch(
                        `${BASE_URL}/products/upload-file`,
                        {
                          method: "POST",
                          body: formData,
                          headers: {
                            Authorization: "Bearer " + localStorage.getItem("authToken"),
                          },
                        }
                      )
                        .then((res) => res.json())
                        .then((data) => {
                          //setLoading(false);
                          console.log(data)
                          setMoreImages([...moreImages, data.url])
                          console.log(moreImages)
                        })
                        .catch((error) => {
                          //setLoading(false);
                          console.log(error)
                        });
                    }}
                    multiple
                  />
                </div>
                <div className="pos-rel w100-m10 ">
                  <label>More Images 3</label>
                  <input
                    type="file"
                    className="form-control-input no-border"
                    name="more_images"
                    accept=".jpg,.png,.jpeg"
                    onChange={(e) => {
                      const formData = new FormData();
                      const files = e.target.files;
                      files?.length && formData.append("file", files[0]);
                      //setLoading(true);
                      fetch(
                        `${BASE_URL}/products/upload-file`,
                        {
                          method: "POST",
                          body: formData,
                          headers: {
                            Authorization: "Bearer " + localStorage.getItem("authToken"),
                          },
                        }
                      )
                        .then((res) => res.json())
                        .then((data) => {
                          //setLoading(false);
                          console.log(data)
                          setMoreImages([...moreImages, data.url])
                          console.log(moreImages)
                        })
                        .catch((error) => {
                          //setLoading(false);
                          console.log(error)
                        });
                    }}
                    multiple
                  />
                </div>
              </section>
              <section className="flex-container mb-lg">
              <div>
                <p className="uppercase f-13">Best taken:</p>
                <div className="spec-list m-10">
                  {bestTaken.map((item, index) => (
                    <div className="spec f-13">
                      <label className="mb-7">{item.name} </label>
                      <div
                          className="flex all-center"
                      >
                     <label className="switch">
                        <input
                            type="checkbox"
                            checked={item.value}
                            onChange={() => handleBestTakenToggle(index)}
                        />
                        <span className="slider round"></span>
                    </label>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              </section>
              <section className="flex-container mb-lg">
              <div>
                <p className="uppercase f-13">Product not for:</p>
                <div className="spec-list flex m-10">
                  {notFor.map((item, index) => (
                    <div className="spec f-13">
                     <label className="mb-7">{item.name} </label>
                      <div
                          className="flex all-center"
                      >
                      <label className="switch">
                        <input
                            type="checkbox"
                            checked={item.value}
                            onChange={() => handleNotForToggle(index)}
                        />
                        <span className="slider round"></span>
                    </label>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              </section>

              <section className="flex-container mb-lg">
                <div className="pos-rel w100-m10 ">
                  <label className="mb-7"> Describe this product (Weight, variant, size etc) </label>
                  <textarea
                    placeholder=""
                    className="form-textarea w-100 mt-10"
                    name="description"
                    onChange={onChangeHandler}
                    value={inputValues.description || ""}
                    ></textarea>
                </div>

                {/* <div className="pos-rel w100-m10"></div> */}
              </section>

              <div className="flex__normal pull-right mt-35">
                {/* <button
                  onClick={handleModalClose}
                  className="btn btn-secondary p-25 pull-right mr-10">
                  Cancel
                </button>
                <button className="btn btn-primary p-25 pull-right"
                 onClick={ VendorCreateProduct}
                disabled={loading}
                > */}
                {loading ?<ButtonLoader /> : "Save Product"}
                </button>
              </div>
            </form>
           
          </section>
        </Box>
      </Modal>
     


      
    </section>
  );
};

export default Login;
