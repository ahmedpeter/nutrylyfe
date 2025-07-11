// import * as React from "react";
import * as React from "react";
import { useState, useEffect } from "react";
import currency from "../../utils/formatCurrency";
import query from "../../helpers/query.ts";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import moment from "moment";

const Networkers = () => {
  const [newDriverModal, setNewDriverModal] = useState(false);
  const handleModalClose = () => setNewDriverModal(false);
  const [loading, setLoading] = useState(false);
  const [alertText, setAlert] = useState("");
  const userInfo = useSelector((state) => state);
  const navigate = useNavigate();
  const [myNetworkList, setMyNetworkList] = useState([]);


  const getLinkedNetworkers = async () => {
    setLoading(true);
    if (!userInfo.user.user.token) {
      navigate("/auth/login");
    }
    // console.log(userType);
    const response = await query({
      method: "GET",
      url: "/profile/hierarchy-all-downline",
      token: userInfo?.user?.user.token,
    });
    console.log(response);
    if (response.success) {
      setLoading(false);
      console.log(response);
      setMyNetworkList(response?.data?.data.allDownline);
    } else {
      console.log(response);
      setAlert(response?.data?.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    getLinkedNetworkers();
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
                    <h6>All Networkers</h6>
                    <p>Your Team (Both Direct and Indirect)</p>
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
                            <th scope="col">Account Name</th>
                            <th scope="col">Ref ID</th>
                            <th scope="col">Username</th>
                            <th scope="col">Package</th>
                            <th scope="col">Contact</th>
                            <th scope="col">Reg. Date</th>
                          </tr>
                        </thead>
                        <tbody>
                        {myNetworkList?.length > 0 &&
                myNetworkList?.map((netlist) => (
                  <option key={netlist.id} value={netlist.id}>
                    {netlist.name} - {netlist.my_ref_id}
                  </option>
                ))}
                
                          <tr>
                            <td>Daniel Bwala</td>
                            <td>
                            #TR34351
                            </td>
                            <td>bwala</td>
                            <td>Gold</td>
                            <td>234 80 123 456 789

                            </td>
                            <td>12.01.2020</td>
                          </tr>
                          <tr>
                            <td>Daniel Bwala</td>
                            <td>
                            #TR34351
                            </td>
                            <td>bwala</td>
                            <td>Gold</td>
                            <td>234 80 123 456 789

                            </td>
                            <td>12.01.2020</td>
                          </tr>
                          <tr>
                            <td>Daniel Bwala</td>
                            <td>
                            #TR34351
                            </td>
                            <td>bwala</td>
                            <td>Gold</td>
                            <td>234 80 123 456 789

                            </td>
                            <td>12.01.2020</td>
                          </tr>
                          <tr>
                            <td>Daniel Bwala</td>
                            <td>
                            #TR34351
                            </td>
                            <td>bwala</td>
                            <td>Gold</td>
                            <td>234 80 123 456 789

                            </td>
                            <td>12.01.2020</td>
                          </tr>
                          <tr>
                            <td>Daniel Bwala</td>
                            <td>
                            #TR34351
                            </td>
                            <td>bwala</td>
                            <td>Gold</td>
                            <td>234 80 123 456 789

                            </td>
                            <td>12.01.2020</td>
                          </tr>
                          
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div role="tabpanel" class="tab-pane fade" id="s-orders">
                    <div class="table-responsive">
                      <table class="table table-hover">
                        <thead>
                          <tr>
                            <th scope="col">Price ($)</th>
                            <th scope="col">Amount</th>
                            <th scope="col">Track ID</th>
                            <th scope="col">Date</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>$7860.24</td>
                            <td>
                              <i class="fas fa-dollar-sign BTC"></i>0.528
                            </td>
                            <td>#TR34351</td>
                            <td>12.01.2020</td>
                          </tr>
                          <tr>
                            <td>$5813.44</td>
                            <td>
                              <i class="fas fa-pound-sign ETH"></i>0.345
                            </td>
                            <td>#TR34351</td>
                            <td>12.01.2020</td>
                          </tr>
                          <tr>
                            <td>$1264.99</td>
                            <td>
                              <i class="fas fa-dollar-sign BTC"></i> 0.117
                            </td>
                            <td>#TR34351</td>
                            <td>12.01.2020</td>
                          </tr>
                          <tr>
                            <td>$3789.31</td>
                            <td>
                              <i class="fas fa-euro-sign PPC-alt"></i>0.217
                            </td>
                            <td>#TR34351</td>
                            <td>12.01.2020</td>
                          </tr>
                          <tr>
                            <td>$7860.24</td>
                            <td>
                              <i class="fas fa-dollar-sign BTC"></i>0.528
                            </td>
                            <td>#TR34351</td>
                            <td>12.01.2020</td>
                          </tr>
                          <tr>
                            <td>$7860.24</td>
                            <td>
                              <i class="fas fa-dollar-sign BTC"></i>0.528
                            </td>
                            <td>#TR34351</td>
                            <td>12.01.2020</td>
                          </tr>
                          <tr>
                            <td>$7860.24</td>
                            <td>
                              <i class="fas fa-dollar-sign BTC"></i>0.528
                            </td>
                            <td>#TR34351</td>
                            <td>12.01.2020</td>
                          </tr>
                          <tr>
                            <td>$5813.44</td>
                            <td>
                              <i class="fas fa-pound-sign ETH"></i>0.345
                            </td>
                            <td>#TR34351</td>
                            <td>12.01.2020</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
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
