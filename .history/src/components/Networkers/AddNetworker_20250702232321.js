// import * as React from "react";
import * as React from "react";
import { useState } from "react";
import currency from "../../utils/formatCurrency";

const NewNetworker = () => {
  const [newDriverModal, setNewDriverModal] = useState(false);
  const handleModalClose = () => setNewDriverModal(false);
    const [packageList, setPackageList] = useState([]);


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
      <div class="ms-content-wrapper">
        <div class="row">
          <div class="col-xl-12 col-md-12">
            <div class="ms-panel ms-panel-fh ms-crypto-orders">
              <div class="ms-panel-header">
                <div class="d-flex justify-content-between">
                  <div class="ms-header-text">
                    <h6>New Member Application</h6>
                    <p>Add Networkers to your Team and Grow your Net Worth</p>
                  </div>
                  <ul
                    class="btn-group btn-group-toggle nav nav-tabs ms-graph-metrics"
                    role="tablist"
                  >
                    <li role="presentation">
                      <a
                        href="index.html#s-orders"
                        aria-controls="s-orders"
                        class="btn btn-sm"
                        role="tab"
                        data-toggle="tab"
                        aria-selected="false"
                      >
                        {" "}
                        Add a Networker{" "}
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              
            </div>
          </div>
          <div class="col-xl-12 col-md-12">
          <form class="needs-validation clearfix">
                <div class="form-row">
                  <div class="col-xl-8 col-md-12 ">
                    <label for="validationCustom10">Member's Full Name</label>
                    <div class="input-group">
                      <input type="text" class="form-control" id="validationCustom10" placeholder="Full Name" required=""/>
                      <div class="invalid-feedback">
                        Name
                      </div>
                    </div>
                  </div>
                  <div class="col-xl-4 col-md-12">
                    <label for="validationCustom17" data-toggle="tooltip" data-placement="left" title="" data-original-title="3 digit number at the back of your card">Select Package </label>
                    <div class="input-group">
                      <select class="form-control" id="validationCustom15" required="">
                        <option value="">Select an option</option>
                        {packageList?.length > 0 &&
                            packageList.map((item) => (
                            <option value=""> {item.name} - () </option>
                        ))}

                      </select>
                    </div>
                  </div>
                  <div class="col-xl-6 col-md-12">
                    <label for="validationCustom17" data-toggle="tooltip" data-placement="left" title="" data-original-title="3 digit number at the back of your card">Select a Parent </label>
                    <div class="input-group">
                      <select class="form-control" id="validationCustom15" required="">
                        <option value="">Category 1</option>
                        <option value="">Category 2</option>
                        <option value="">Category 3</option>
                        <option value="">Category 4</option>
                        <option value="">Category 5</option>

                      </select>
                    </div>
                  </div>
                  <div class="col-xl-6 col-md-12">
                    <label for="validationCustom17" data-toggle="tooltip" data-placement="left" title="" data-original-title="3 digit number at the back of your card">Select Placement </label>
                    <div class="input-group">
                      <select class="form-control" id="validationCustom15" required="">
                        <option value="left">Left</option>
                        <option value="right">Right</option>

                      </select>
                    </div>
                  </div>
                  <div class="col-xl-4 col-md-12">
                    <label for="validationCustom17" data-toggle="tooltip" data-placement="left" title="3 digit number at the back of your card">Please provide Email</label>
                    <div class="input-group">
                      <input type="text" class="form-control" id="validationCustom17" placeholder="email@faker.com" required=""/>
                    </div>
                  </div>
                  <div class="col-xl-4 col-md-12">
                    <label for="validationCustom16">Phone</label>
                    <div class="input-group">
                    <input type="text" class="form-control" id="validationCustom17" placeholder="234 801 234 567 89" required=""/>
                    </div>
                  </div>
                  <div class="col-xl-4 col-md-12">
                    <label for="validationCustom18" data-toggle="tooltip" data-placement="left" title="Choose a username">Choose a username</label>
                    <div class="input-group">
                      <input type="text" class="form-control" id="validationCustom18" placeholder="" required=""/>
                    </div>
                  </div>
                  

                  <div class="col-md-12">
                    <label for="validationCustom12">Description</label>
                    <div class="input-group">
                      <textarea rows="5" id="validationCustom12" class="form-control" required=""></textarea>

                    </div>
                  </div>
                 
                  <div class="col-md-12">

                    <button class="btn btn-green mr-2  ms-graph-metrics">Delete</button>
                    <button class="btn btn-primary " type="submit">Save</button>
                  </div>

                </div>


              </form>
              </div>
          </div>
      </div>
    </section>
  );
};

export default NewNetworker;
