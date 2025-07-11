// import * as React from "react";
import * as React from "react";
import { useState } from "react";
import currency from "../../utils/formatCurrency";

const NewNetworker = () => {
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
              <div class="ms-panel-body p-0">

              <form class="needs-validation clearfix" novalidate="">
                <div class="form-row">
                  <div class="col-xl-12 col-md-12 ">
                    <label for="validationCustom10">Product Name</label>
                    <div class="input-group">
                      <input type="text" class="form-control" id="validationCustom10" placeholder="Full Name" required="">
                      <div class="invalid-feedback">
                        Name
                      </div>
                    </div>
                  </div>
                  <div class="col-xl-12 col-md-12">
                    <label for="validationCustom17" data-toggle="tooltip" data-placement="left" title="" data-original-title="3 digit number at the back of your card">Select Category </label>
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
                  <div class="col-xl-4 col-md-12">
                    <label for="validationCustom17" data-toggle="tooltip" data-placement="left" title="3 digit number at the back of your card">Unit Price</label>
                    <div class="input-group">
                      <input type="text" class="form-control" id="validationCustom17" placeholder="Unit Price" required="">
                      <div class="invalid-feedback">
                        Please provide unit
                      </div>
                    </div>
                  </div>
                  <div class="col-xl-4 col-md-12">
                    <label for="validationCustom16">Currency</label>
                    <div class="input-group">
                      <select class="form-control" id="validationCustom16" required="">
                        <option value="">Dollar</option>
                        <option value="">Pound</option>
                        <option value="">Euro</option>

                      </select>
                      <div class="invalid-feedback">
                        Please select a Month.
                      </div>
                    </div>
                  </div>
                  <div class="col-xl-4 col-md-12">
                    <label for="validationCustom18" data-toggle="tooltip" data-placement="left" title="3 digit number at the back of your card">Quantity</label>
                    <div class="input-group">
                      <input type="text" class="form-control" id="validationCustom18" placeholder="Quantity" required="">
                      <div class="invalid-feedback">
                        Please provide unit
                      </div>
                    </div>
                  </div>
                  <div class="col-md-6 align-self-center">
                    <ul class="ms-list ms-list-display">


                      <li class="mb-0">
                        <label class="ms-switch">
                          <input type="checkbox" checked="">
                          <span class="ms-switch-slider ms-switch-primary round"></span>
                        </label>
                        <span> Discount </span>
                      </li>

                    </ul>
                  </div>
                  <div class=" col-md-6 align-self-center">

                    <div class="input-group">
                      <input type="text" class="form-control" id="validationCustom11" placeholder="Discount %" required="">
                      <div class="invalid-feedback">
                        Name
                      </div>
                    </div>
                  </div>

                  <div class="col-md-12">
                    <label for="validationCustom12">Description</label>
                    <div class="input-group">
                      <textarea rows="5" id="validationCustom12" class="form-control" required=""></textarea>

                    </div>
                  </div>
                  <div class="col-md-12 ">
                    <label for="validationCustom12">Upload Product Image</label>
                    <div class="custom-file">

                      <input type="file" class="custom-file-input" id="validatedCustomFile"/>
                      <label class="custom-file-label" for="validatedCustomFile">Upload Product Image..</label>
                      <div class="invalid-feedback">Example invalid custom file feedback</div>
                    </div>
                  </div>
                  <div class="col-md-12">

                    <button class="btn btn-green mr-2  ms-graph-metrics">Delete</button>
                    <button class="btn btn-primary " type="submit">Save</button>
                  </div>

                </div>


              </form>


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

export default NewNetworker;
