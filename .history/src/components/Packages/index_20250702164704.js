// import * as React from "react";
import * as React from "react";
import { useState, useEffect } from "react";
import query from "../../helpers/query.ts";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import currency from "../../utils/formatCurrency";

const Networkers = () => {
  const [newDriverModal, setNewDriverModal] = useState(false);
  const handleModalClose = () => setNewDriverModal(false);
  const [packageList, setPackageList] = useState([]);
  const userInfo = useSelector((state) => state);

  const navigate = useNavigate();
  const [alertText, setAlert] = useState("");
  const [loading, setLoading] = useState(false);


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
      setPackageList(response?.data?.data);
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
                    <h6>All Packages</h6>
                    <p>Manage System Packages</p>
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
                        Add New Package
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="ms-panel-body p-0">
                <div class="tab-content">
                  <div
                    role="tabpanel"
                    class="tab-pane fade in active show"
                    id="b-orders"
                  >
                    <div class="table-responsive">
                      <table class="table table-hover thead-primary">
                        <thead>
                          <tr>
                            <th scope="col">S/N</th>
                            <th scope="col">Package Name</th>
                            <th scope="col">Price</th>
                            <th scope="col">Point Values</th>
                            <th scope="col">Created At</th>
                          </tr>
                        </thead>
                        <tbody>
                        {appointmentList?.length > 0 &&
              appointmentList
                ?.slice()
                .reverse()
                .map((appointment) => (
                  <div
                    onClick={() =>
                      handleAppointmentClick(
                        appointment.id,
                      )
                    }
                    class="link-dark"
                    key={appointment.id}
                  >
                    
                          <tr>
                            <td>1 </td>
                            <td>
                            Daniel Bwala
                            </td>
                            <td>bwala</td>
                            <td>234 80 123 456 789

                            </td>
                            <td>12.01.2020</td>
                          </tr>
                          <tr>
                            <td>Daniel Bwala</td>
                            <td>bwala</td>
                            <td>Gold</td>
                            <td>234 80 123 456 789

                            </td>
                            <td>12.01.2020</td>
                          </tr>
                          <tr>
                            <td>Daniel Bwala</td>
                            
                            <td>bwala</td>
                            <td>Gold</td>
                            <td>234 80 123 456 789

                            </td>
                            <td>12.01.2020</td>
                          </tr>
                          <tr>
                            <td>Daniel Bwala</td>
                            
                            <td>bwala</td>
                            <td>Gold</td>
                            <td>234 80 123 456 789

                            </td>
                            <td>12.01.2020</td>
                          </tr>
                          <tr>
                            <td>Daniel Bwala</td>
                            
                            <td>bwala</td>
                            <td>Gold</td>
                            <td>234 80 123 456 789

                            </td>
                            <td>12.01.2020</td>
                          </tr>
                          
                        </tbody>
                      </table>
                    </div>
                    {!loading && packageList?.length === 0 && (
              <>
                <p
                  className="text-center"
                  style={{
                    fontWeight: 600,
                    left: "50%",
                    position: "absolute",
                    top: "50%",
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  <span class="mdi mdi-ffolder-open-outline text-primary me-1"></span>{" "}
                  <br />
                  Oops! No Packages Added yet! &nbsp;
                </p>
              </>
            )}
                  </div>
                  
                </div>
              </div>
            </div>
          </div>

          </div>
      </div>
    </section>
  );
};

export default Networkers;
