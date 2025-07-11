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
              
            </div>
          </div>
          <div class="col-xl-12 col-md-12">
          <form class="needs-validation clearfix">
                <div class="form-row">
                  <div class="col-xl-12 col-md-12 ">
                    <label for="validationCustom10">Member's Full Name</label>
                    <div class="input-group">
                      <input type="text" class="form-control" id="validationCustom10" placeholder="Full Name" required=""/>
                      <div class="invalid-feedback">
                        Name
                      </div>
                    </div>
                  </div>
                  <div class="col-xl-12 col-md-12">
                    <label for="validationCustom17" data-toggle="tooltip" data-placement="left" title="" data-original-title="3 digit number at the back of your card">Select Package </label>
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
                      <input type="text" class="form-control" id="validationCustom17" placeholder="Unit Price" required=""/>
                      <div class="invalid-feedback">
                        Please provide Email
                      </div>
                    </div>
                  </div>
                  <div class="col-xl-4 col-md-12">
                    <label for="validationCustom16">Phone</label>
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
                      <input type="text" class="form-control" id="validationCustom18" placeholder="Quantity" required=""/>
                      <div class="invalid-feedback">
                        Choose a username
                      </div>
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
