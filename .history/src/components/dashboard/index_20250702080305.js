// import * as React from "react";
import * as React from "react";
import { useState } from "react";
import currency from "../../utils/formatCurrency";
import { useDispatch, useSelector } from "react-redux";
import query from "../../helpers/query.ts";

const Dashboard = () => {
  const [newDriverModal, setNewDriverModal] = useState(false);
  const handleModalClose = () => setNewDriverModal(false);

  const programData = useSelector((state) => state);

  return (
    <section>
      <div class="col-md-12">
        <div class="ms-panel">
          <div class="ms-panel-header">
            <div class="d-flex justify-content-between">
              <div class="ms-header-text">
                <h6>Recent Activities</h6>
                <p>Quick overview on your Nutrylyfe account</p>
              </div>
              <button
                type="button"
                class="btn btn-outline-primary ms-graph-metrics"
                name="button"
              >
                Add New Account
              </button>
              
            </div>
          </div>
          <div class="ms-panel-body pb-0">
            <div class="row">
              {/* <div class="col-xl-3 col-md-6">
                  <div class="ms-card card-twitter ms-widget ms-infographics-widget">
                    <div class="ms-card-body media">
                      <div class="media-body">
                        <h6>Total Orders</h6>
                        <p class="ms-card-change"> <i class="material-icons">arrow_upward</i> 12,039</p>
                        <p class="fs-9 mt-7">See more</p>
                      </div>
                    </div>
                    <i class="fab fa-twitter-square"></i>
                  </div>
                </div>
                <div class="col-xl-3 col-md-6">
                  <div class="ms-card card-linkedin ms-widget ms-infographics-widget">
                    <div class="ms-card-body media">
                      <div class="media-body">
                        <h6>Completed Orders</h6>
                        <p class="ms-card-change"> <i class="material-icons">arrow_upward</i> 3,819</p>
                        <p class="fs-9 mt-7">See more</p>
                      </div>
                    </div>
                    <i class="fab fa-linkedin"></i>
                  </div>
                </div> */}
 <div class="col-xl-4 col-md-6">
                <div class="ms-card card-facebook ms-widget ms-infographics-widget">
                  <div class="ms-card-body media">
                    <div class="media-body">
                      <h6>Downlines</h6>
                      <p class="ms-card-change">
                        {" "}
                        <i class="material-icons">arrow_upward</i> 9,289
                      </p>
                      <p class="fs-9 mt-7">See More</p>
                    </div>
                  </div>
                  <i class="fab fa-facebook"></i>
                </div>
              </div>
              <div class="col-xl-4 col-md-6">
                  <div class="ms-card card-linkedin ms-widget ms-infographics-widget">
                    <div class="ms-card-body media">
                      <div class="media-body">
                        <h6>My Wallet</h6>
                        <p class="ms-card-change"> <i class="material-icons">arrow_upward</i> {currency(12039)}</p>
                        <p class="fs-9 mt-7">See more</p>
                      </div>
                    </div>
                    <i class="fab fa-twitter-square"></i>
                  </div>
                </div>
              <div className="col-xl-4 col-md-6">
                <div class="ms-panel ms-panel-fh">
                  <div class="ms-panel-body p-0">
                    <div class="ms-social-media-followers">
                      <div class="ms-social-grid">
                        <i class="fas fa-street-view bg-linkedin"></i>
                        <p class="ms-text-dark">8,033</p>
                        <span>Direct Downlines</span>
                      </div>
                      <div class="ms-social-grid">
                        <i class="fas fa-directions bg-twitter"></i>
                        <p class="ms-text-dark">8,039</p>
                        <span>Indirect Downlines</span>
                      </div>
                    </div>
                    {/* <div class="ms-social-media-followers">
                      <div class="ms-social-grid">
                        <i class="fab fa-facebook-f bg-facebook"></i>
                        <p class="ms-text-dark">8,039</p>
                        <span>Likes</span>
                      </div>
                      <div class="ms-social-grid">
                        <i class="fab fa-instagram bg-instagram"></i>
                        <p class="ms-text-dark">98,039</p>
                        <span>Followers</span>
                      </div>
                    </div> */}
                  </div>
                </div>
              </div>
             
              
            </div>
          </div>
        </div>
      </div>
      <div class="ms-content-wrapper">
        <div class="row">
          {/* <div class="col-md-12 col-xl-6">
        <div class="ms-panel ms-panel-fh">
          <div class="ms-panel-header ms-panel-custom align-items-center">
            <h6>Orders Graph</h6>
            <ul class="nav nav-tabs d-flex nav-justified mb-0" role="tablist">
              <li><a href="index.html#tab13" aria-controls="tab13" class=" pb-0" role="tab" data-toggle="tab" aria-selected="false"><i class="fas fa-chart-bar fa-2x "></i></a></li>
              <li><a href="index.html#tab14" aria-controls="tab14" role="tab" data-toggle="tab" class="active pb-0 show" aria-selected="true"><i class="fas fa-chart-line fa-2x "></i> </a></li>

            </ul>
          </div>
          
        </div>
      </div> */}

          <div class="col-xl-12 col-md-12">
            <div class="ms-panel ms-panel-fh ms-crypto-orders">
              <div class="ms-panel-header">
                <div class="d-flex justify-content-between">
                  <div class="ms-header-text">
                    <h6>Recent Downlines</h6>
                    <p>See how you and your team are doing</p>
                  </div>
                  <ul
                    class="btn-group btn-group-toggle nav nav-tabs ms-graph-metrics"
                    role="tablist"
                  >
                    <li role="presentation">
                      <a
                        href="index.html#b-orders"
                        aria-controls="b-orders"
                        class="btn btn-sm active show"
                        role="tab"
                        data-toggle="tab"
                        aria-selected="true"
                      >
                        {" "}
                        Buy Orders{" "}
                      </a>
                    </li>
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
                        Sell Orders{" "}
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
                      <table class="table table-hover thead-light">
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

           <div class="col-xl-8 col-md-12">
           <div class="ms-panel ms-crypto-orders-expanded">
              <div class="ms-panel-header">
                <div class="d-flex justify-content-between">
                  <div class="ms-header-text">
                    <h6>Order History</h6>
                    <p>Track your active orders</p>
                  </div>
                </div>
              </div>
              <div class="ms-panel-body p-0">
                <div class="table-responsive">
                  <table class="table table-hover thead-primary ">
                    <thead>
                      <tr>
                        <th scope="col">Date</th>
                        <th scope="col">Name</th>
                        <th scope="col">Product ID</th>
                        <th scope="col">Amount</th>
                        <th scope="col">Category</th>
                        <th scope="col">Orders</th>
                        <th scope="col">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>12.01.2020</td>
                        <td>Hemp Oil</td>
                        <td>#TR137381</td>
                        <td>$900.50</td>
                        <td> Oil </td>

                        <td>$5.85</td>
                        <td>
                        <span class="badge badge-success">Completed</span>
                        </td>
                      </tr>
                      <tr>
                        <td>11.01.2020</td>
                        <td>Gummy Bears</td>
                        <td>#TR371893</td>
                        <td>$335.50</td>
                        <td> Edibles </td>

                        <td>$5.85</td>
                        <td><span class="badge badge-danger">Pending</span></td>
                      </tr>
                      <tr>
                        <td>10.01.2020</td>
                        <td>Mango Kush</td>
                        <td>#TR137381</td>
                        <td>$378.50</td>
                        <td> Plants </td>

                        <td>$5.85</td>
                        <td><span class="badge badge-danger">Pending</span></td>
                      </tr>
                      <tr>
                        <td>09.01.2020</td>
                        <td>Purple Haze</td>
                        <td>#TR371893</td>
                        <td>$219.30</td>
                        <td> FLowers</td>

                        <td>$5.85</td>
                        <td>
                        <span class="badge badge-success">Completed</span>
                        </td>
                      </tr>
                      <tr>
                        <td>08.01.2020</td>
                        <td>UK Cheese</td>
                        <td>#TR137381</td>
                        <td>$438.50</td>
                        <td>Leafs</td>

                        <td>$5.85</td>
                        <td><span class="badge badge-danger">Pending</span></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
         
             </div>
          <div class="col-xl-4 col-md-12">
            <div class="ms-panel ms-panel-fh">
              <div class="ms-panel-header">
                <h6>Stockiest Center(s)</h6>
              </div>
              <div class="ms-panel-body p-0">
                <div class="ms-social-media-followers">
                  <div class="ms-social-grid">
                    <i class="fas fa-shopping-cart bg-linkedin"></i>
                    <p class="ms-text-dark">Stacey Stores</p>
                    <span>Abuja (Kubwa)</span>
                  </div>
                  <div class="ms-social-grid">
                  <i class="fas fa-shopping-cart bg-linkedin"></i>
                    <p class="ms-text-dark">Fortune's Warehouse</p>
                    <span>Lagos (Ikoyi)</span>
                  </div>
                </div>
                <div class="ms-social-media-followers">
                  <div class="ms-social-grid">
                  <i class="fas fa-shopping-cart bg-linkedin"></i>
                    <p class="ms-text-dark">Shantel's Mall</p>
                    <span>Edo (Benin)</span>
                  </div>
                  <div class="ms-social-grid">
                  <i class="fas fa-shopping-cart bg-linkedin"></i>
                    <p class="ms-text-dark">Lois' Stores</p>
                    <span>Cross River (Calabar)</span>
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

export default Dashboard;
