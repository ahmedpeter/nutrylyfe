import * as React from "react";
import { useState} from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import GroupsIcon from '@mui/icons-material/Groups';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import Box from "@mui/material/Box";
import profile from "../../assets/imgs/passport.png";
import Typography from "@mui/material/Typography";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Doughnut } from "react-chartjs-2";
import Modal from "@mui/material/Modal";


const Officers = () => {
  const [newOfficerModal, setNewOfficerModal] = useState(false);
  const handleModalClose = () => setNewOfficerModal(false);

  return (
    <section>
      <div class="col-md-12">
          <div class="ms-panel">
            <div class="ms-panel-header">
              <div class="d-flex justify-content-between">
                <div class="ms-header-text">
                  <h6>Social Activity</h6>
                  <p>Quick overview on your social media platforms</p>
                </div>
                <button type="button" class="btn btn-outline-primary ms-graph-metrics" name="button">Add New Account</button>
              </div>
            </div>
            <div class="ms-panel-body pb-0">
              <div class="row">

                <div class="col-xl-3 col-md-6">
                  <div class="ms-card card-twitter ms-widget ms-infographics-widget">
                    <div class="ms-card-body media">
                      <div class="media-body">
                        <h6>Total Tweets</h6>
                        <p class="ms-card-change"> <i class="material-icons">arrow_upward</i> 12,039</p>
                        <p class="fs-12">48% From Last 24 Hours</p>
                      </div>
                    </div>
                    <i class="fab fa-twitter-square"></i>
                  </div>
                </div>
                <div class="col-xl-3 col-md-6">
                  <div class="ms-card card-linkedin ms-widget ms-infographics-widget">
                    <div class="ms-card-body media">
                      <div class="media-body">
                        <h6>Total Followers</h6>
                        <p class="ms-card-change"> <i class="material-icons">arrow_upward</i> 3,819</p>
                        <p class="fs-12">48% From Last 24 Hours</p>
                      </div>
                    </div>
                    <i class="fab fa-linkedin"></i>
                  </div>
                </div>
                <div class="col-xl-3 col-md-6">
                  <div class="ms-card card-facebook ms-widget ms-infographics-widget">
                    <div class="ms-card-body media">
                      <div class="media-body">
                        <h6>Total Likes</h6>
                        <p class="ms-card-change"> <i class="material-icons">arrow_upward</i> 9,289</p>
                        <p class="fs-12">48% From Last 24 Hours</p>
                      </div>
                    </div>
                    <i class="fab fa-facebook"></i>
                  </div>
                </div>
                <div class="col-xl-3 col-md-6">
                  <div class="ms-card card-instagram ms-widget ms-infographics-widget">
                    <div class="ms-card-body media">
                      <div class="media-body">
                        <h6>Total Followers</h6>
                        <p class="ms-card-change"> <i class="material-icons">arrow_upward</i> 7,658</p>
                        <p class="fs-12">48% From Last 24 Hours</p>
                      </div>
                    </div>
                    <i class="fab fa-instagram"></i>
                  </div>
                </div>

              </div>

            </div>
          </div>
        </div>
      <div class="col-md-12">
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
                      <th scope="col">Repeats</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>12.01.2020</td>
                      <td>Hemp Oil</td>
                      <td>#TR137381</td>
                      <td>$900.50</td>
                      <td> Oil </td>
                      <td class="ms-trend"> <canvas id="trend-01"></canvas> </td>
                      <td>$5.85</td>
                    </tr>
                    <tr>
                      <td>11.01.2020</td>
                      <td>Gummy Bears</td>
                      <td>#TR371893</td>
                      <td>$335.50</td>
                      <td> Edibles </td>
                      <td class="ms-trend"> <canvas id="trend-02"></canvas> </td>
                      <td>$5.85</td>
                    </tr>
                    <tr>
                      <td>10.01.2020</td>
                      <td>Mango Kush</td>
                      <td>#TR137381</td>
                      <td>$378.50</td>
                      <td> Plants </td>
                      <td class="ms-trend"> <canvas id="trend-03"></canvas> </td>
                      <td>$5.85</td>
                    </tr>
                    <tr>
                      <td>09.01.2020</td>
                      <td>Purple Haze</td>
                      <td>#TR371893</td>
                      <td>$219.30</td>
                      <td> FLowers</td>
                      <td class="ms-trend"> <canvas id="trend-04"></canvas> </td>
                      <td>$5.85</td>
                    </tr>
                    <tr>
                      <td>08.01.2020</td>
                      <td>UK Cheese</td>
                      <td>#TR137381</td>
                      <td>$438.50</td>
                      <td>Leafs</td>
                      <td class="ms-trend"> <canvas id="trend-05"></canvas> </td>
                      <td>$5.85</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
    </section>
  );
};

export default Officers;
