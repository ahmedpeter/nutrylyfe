import * as React from "react";
import { useState} from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
// import CreateModal from '../../utils/modal';
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import profile from "../../assets/imgs/passport.png";
import Typography from "@mui/material/Typography";
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Doughnut } from "react-chartjs-2";
import { Pie } from 'react-chartjs-2'
import {Chart, ArcElement} from 'chart.js'
Chart.register(ArcElement);




const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: '70%',
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const columns = [
  { id: "bus", label: "Bus" },
  { id: "plate", label: "Plate Number" },
  { id: "driver", label: "Driver" },
  { id: "route", label: "Travelling Route" },
  { id: "status", label: "Status" },
  { id: "action", label: "" },
];

const data = {
    datasets: [
      {
        data: [83, 20],
        backgroundColor: [
          'rgba(236, 112, 122, 1)',
          'rgba(16, 172, 126, 1)'
        ]
      },
    ],
  };

  var config = {        
    cutout: 28,
    responsive: true,
    maintainAspectRatio: true,
};



function createData(bus, plate, driver, route, status, action) {
  return { bus, plate, driver, route, status, action };
}

const Buses = () => {
  const [newBusModal, setNewBusModal] = useState(false);
  const handleModalClose = () => setNewBusModal(false);

  return (
    <section>
      <section className="page__header">
        <DirectionsCarIcon />
        <h3>Manage Buses</h3>
      </section>
      <div className="s-divider"></div>
      <section style={{display: 'flex'}}>
          <div className="stat m45">
        <div className="left__stat py-32">
          <h3 className="stat__value">209
          <p className="sub__title">Total Buses</p>
          </h3>
          <div >
              <Doughnut data={data} options={config} className="w80" />
          </div>


        </div>
        <div className="right__stat">
          <div className="right__sub s-divider">
            <h3 className="stat__value c-success">83</h3>
            <p className="sub__title">In Service</p>
          </div>
          <div className="right__sub">
            <h3 className="stat__value c-error">20</h3>
            <p className="sub__title">Out of Service</p>
          </div>
        </div>
        </div>
      </section>

      <section className="flex-container alc p-y my-40">
        <div className="">
          <input
            type="text"
            className="search__bar w-200"
            placeholder="Search by plate number or bus ID"
          />
          <select className="search__bar w-200" defaultValue={'default'}>
            <option value="default"> Select Status</option>
            <option value="Status 1"> Status 1</option>
            <option value="Status 2"> Status 2</option>
            <option value="Status 3"> Status 3</option>
            <option value="Status 4"> Status 4</option>
          </select>
        </div>
        <div className="">
          <button className="btn btn-primary p-25" onClick={() => setNewBusModal(true)}>Add Bus</button>
        </div>
      </section>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="Officers Table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell>{column.label}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell className="b-r">
              Toyota Hiace 
              </TableCell>
              <TableCell> ABC882LR</TableCell>
              <TableCell> 
              <div className="d-flex alc f-10 flex-start">
                  <div className="user__avatar bg-success">
                    <h3>AP</h3>
                  </div>
                  <div className="lheight13">
                  <h4 className="f-300">Ahmed Peter</h4>
                  <p className="sub__title">STF/09/2623</p>
                  </div>
                </div>
              </TableCell>
              <TableCell> Abuja - Lagos </TableCell>
              <TableCell>
                {" "}
                <span className="badge bg-success">In Service</span>{" "}
              </TableCell>
              <TableCell>
                {" "}
                <MoreVertIcon />{" "}
              </TableCell>
            </TableRow>
            

            <TableRow>
              <TableCell className="b-r">
              Toyota Hiace 
              </TableCell>
              <TableCell> ABC882LR</TableCell>
              <TableCell> 
              <div className="d-flex alc f-10 flex-start">
                  <div className="user__avatar bg-success">
                    <h3>AP</h3>
                  </div>
                  <div className="lheight13">
                  <h4 className="f-300">Ahmed Peter</h4>
                  <p className="sub__title">STF/09/2623</p>
                  </div>
                </div>
              </TableCell>
              <TableCell> Kano - Dubai </TableCell>
              <TableCell>
                {" "}
                <span className="badge bg-error">Out of Service</span>{" "}
              </TableCell>
              <TableCell>
                {" "}
                <MoreVertIcon />{" "}
              </TableCell>
            </TableRow>
            
          </TableBody>
        </Table>
      </TableContainer>


      
{/* Modal to add Bus */}

{/* <CreateModal title="Add Buses" close="handleModalClose" type="newBusModal">
<div className="w-200">
    <div className="profile_pic_holder">
            <img src={profile} className="profile_pic"/>
            <button className="btn btn-primary p-25 mt-15">Upload</button>
        
    </div>
    </div>
            <form style={{width: '100%'}} >
              
              <section className="flex-container mb-lg">
                <div className="pos-rel w100-m10 ">
                        <label> Bus Make</label>
                        <input
                        type="text"
                        className="form-control-input "
                        name="username"
                        placeholder="e.g Honda"
                        />
                    </div>
                    <div className="pos-rel w100-m10 ">
                        <label> Bus Model</label>
                        <input
                        type="text"
                        className="form-control-input "
                        name="username"
                        placeholder="e.g Honda 2010"
                        />
                    </div>
                    <div className="pos-rel w100-m10 ">
                        <label> seats</label>
                        <input
                        type="number"
                        className="form-control-input "
                        name="seats"
                        />
                    </div>
              </section>

              <section className="flex-container mb-lg">
                <div className="pos-rel w100-m10 ">
                        <label> Company of Purchase</label>
                        <input
                        type="text"
                        className="form-control-input "
                        name="company_of_purchase"
                        placeholder="Hooli Global Ltd"
                        />
                    </div>
                    <div className="pos-rel w100-m10 ">
                    <label> Purchase Price</label>
                        <input
                        type="number"
                        className="form-control-input "
                        name="purchase_price"
                        placeholder="0.00"
                        />
                    </div>
                    <div className="pos-rel w100-m10 ">
                    <label> Purchase Date</label>
                        <input
                        type="date"
                        className="form-control-input "
                        name="purchase_date"
                        />
                    </div>
              </section>

              <section className="flex-container mb-lg">
              <div className="pos-rel w100-m10 ">
                    <label> Registration Date</label>
                        <input
                        type="date"
                        className="form-control-input "
                        name="registration_date"
                        />
                    </div>
                    <div className="pos-rel w100-m10 ">
                    <label className="mb-7">  Branch</label>
                        <select className="search__bar w-100" defaultValue={'default'}>
                            <option value="default"> Select Branch</option>
                            <option value="Status 1"> Status 1</option>
                            <option value="Status 2"> Status 2</option>
                            <option value="Status 3"> Status 3</option>
                            <option value="Status 4"> Status 4</option>
                        </select>
                    </div>
                    <div className="pos-rel w100-m10 "></div>
              </section>
<div className="flex__normal w-30 pull-right mt-35">
              <button onClick={handleModalClose} className="btn btn-secondary p-25 pull-right mr-10">
                Cancel
              </button>
              <button className="btn btn-primary p-25 pull-right">
                Save
              </button>
              </div>
            </form>
</CreateModal> */}
<Modal
          open={newBusModal}
          onClose={handleModalClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <div className="mb-35">
              <Typography id="modal-modal-title">
                <h4 className="summary__title t-xl title-case">
                  Add Buses
                </h4>
              </Typography>
              <div className="s-divider"></div>
            </div>
<section className="flex__normal">
<div className="w-200">
    <div className="profile_pic_holder">
            <img src={profile} className="profile_pic"/>
            <button className="btn btn-primary p-25 mt-15">Upload Photo</button>
        
    </div>
    </div>
            <form style={{width: '100%'}} >
              
              <section className="flex-container mb-lg">
                <div className="pos-rel w100-m10 ">
                        <label> Bus Make</label>
                        <input
                        type="text"
                        className="form-control-input "
                        name="username"
                        placeholder="e.g Honda"
                        />
                    </div>
                    <div className="pos-rel w100-m10 ">
                        <label> Bus Model</label>
                        <input
                        type="text"
                        className="form-control-input "
                        name="username"
                        placeholder="e.g Honda 2010"
                        />
                    </div>
                    <div className="pos-rel w100-m10 ">
                        <label> seats</label>
                        <input
                        type="number"
                        className="form-control-input "
                        name="seats"
                        />
                    </div>
              </section>

              <section className="flex-container mb-lg">
                <div className="pos-rel w100-m10 ">
                        <label> Company of Purchase</label>
                        <input
                        type="text"
                        className="form-control-input "
                        name="company_of_purchase"
                        placeholder="Hooli Global Ltd"
                        />
                    </div>
                    <div className="pos-rel w100-m10 ">
                    <label> Purchase Price</label>
                        <input
                        type="number"
                        className="form-control-input "
                        name="purchase_price"
                        placeholder="0.00"
                        />
                    </div>
                    <div className="pos-rel w100-m10 ">
                    <label> Purchase Date</label>
                        <input
                        type="date"
                        className="form-control-input "
                        name="purchase_date"
                        />
                    </div>
              </section>

              <section className="flex-container mb-lg">
              <div className="pos-rel w100-m10 ">
                    <label> Registration Date</label>
                        <input
                        type="date"
                        className="form-control-input "
                        name="registration_date"
                        />
                    </div>
                    <div className="pos-rel w100-m10 ">
                    <label className="mb-7">  Branch</label>
                        <select className="search__bar w-100" defaultValue={'default'}>
                            <option value="default"> Select Branch</option>
                            <option value="Status 1"> Status 1</option>
                            <option value="Status 2"> Status 2</option>
                            <option value="Status 3"> Status 3</option>
                            <option value="Status 4"> Status 4</option>
                        </select>
                    </div>
                    <div className="pos-rel w100-m10 "></div>
              </section>
<div className="flex__normal w-30 pull-right mt-35">
              <button onClick={handleModalClose} className="btn btn-secondary p-25 pull-right mr-10">
                Cancel
              </button>
              <button className="btn btn-primary p-25 pull-right">
                Save
              </button>
              </div>
            </form>
            </section>
          </Box>
        </Modal>
    </section>
  );
};

export default Buses;
