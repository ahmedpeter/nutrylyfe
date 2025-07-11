// import * as React from "react";
import * as React from "react";
import { useState } from "react";
import currency from "../../utils/formatCurrency";

const Networkers = () => {
  const [newDriverModal, setNewDriverModal] = useState(false);
  const handleModalClose = () => setNewDriverModal(false);

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
