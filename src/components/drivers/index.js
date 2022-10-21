// import * as React from "react";
import * as React from "react";
import { useState} from "react";
import Box from "@mui/material/Box";
import profile from "../../assets/imgs/passport.png";
import Typography from "@mui/material/Typography";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AccessibleIcon from "@mui/icons-material/Accessible";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Doughnut } from "react-chartjs-2";
import Modal from "@mui/material/Modal";
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
  { id: "officer", label: "Officer Name" },
  { id: "branch", label: "Branch" },
  { id: "email", label: "Email" },
  { id: "phone", label: "Phone Number" },
  { id: "bus", label: "Assigned Bus" },
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
    options: {},
};



function createData(officer, branch, email, phone, bus, status, action) {
  return { officer, branch, email, phone, bus, status, action };
}

const Drivers = () => {
  
    const [newDriverModal, setNewDriverModal] = useState(false);
    const handleModalClose = () => setNewDriverModal(false);

  return (
    <section>
      <section className="page__header">
        <AccessibleIcon />
        <h3>Manage Drivers</h3>
      </section>
      <div className="s-divider"></div>
      <section className="stat m45">
      <div className="left__stat py-32">
          <h3 className="stat__value">209
          <p className="sub__title">Total Drivers</p>
          </h3>
          <div>
              <Doughnut data={data} options={config} className="w80" />
          </div>


        </div>
        <div className="right__stat">
          <div className="right__sub s-divider">
            <h3 className="stat__value c-success">83</h3>
            <p className="sub__title">Active</p>
          </div>
          <div className="right__sub">
            <h3 className="stat__value c-error">20</h3>
            <p className="sub__title">Inactive</p>
          </div>
        </div>
      </section>

      <section className="flex-container alc p-y my-40">
        <div className="">
          <input
            type="text"
            className="search__bar w-200"
            placeholder="Search by name or ID"
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
          <button className="btn btn-primary p-25" onClick={() => setNewDriverModal(true)}>Add Driver</button>
        </div>
      </section>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="Drivers Table">
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
              <TableCell> Abuja [Garki]</TableCell>
              <TableCell> talk2ahmedpeter@gmail.com</TableCell>
              <TableCell> 0803 000 0000</TableCell>
              <TableCell>
                Toyota Hiace <br />
                <span className="plate"> ABC882LR</span>
              </TableCell>
              <TableCell>
                {" "}
                <span className="badge bg-success">Active</span>{" "}
              </TableCell>
              <TableCell>
                {" "}
                <MoreVertIcon />{" "}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="b-r">
                <div className="d-flex alc f-10 flex-start">
                  <div className="user__avatar bg-error">
                    <h3>PY</h3>
                  </div>
                  <div className="lheight13">
                  <h4 className="f-300">Philip Yahaya</h4>
                  <p className="sub__title">STF/09/2623</p>
                  </div>

                  
                </div>
              </TableCell>
              <TableCell> Abuja [Garki]</TableCell>
              <TableCell> fakemail@outlook.com</TableCell>
              <TableCell> 0803 000 0000</TableCell>
              <TableCell>
                Toyota Hiace <br />
                <span className="plate"> ABC882LR</span>
              </TableCell>
              <TableCell>
                {" "}
                <span className="badge bg-error">Inactive </span>
              </TableCell>
              <TableCell>
                {" "}
                <MoreVertIcon />{" "}
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="b-r">
                <div className="d-flex alc f-10 flex-start">
                  <div className="user__avatar bg-success">
                    <h3>PY</h3>
                  </div>
                  <div className="lheight13">
                  <h4 className="f-300">Philip Yahaya</h4>
                  <p className="sub__title">STF/09/2623</p>
                  </div>
                </div>
              </TableCell>
              <TableCell> Abuja [Garki]</TableCell>
              <TableCell> fakemail@outlook.com</TableCell>
              <TableCell> 0803 000 0000</TableCell>
              <TableCell>
                Toyota Hiace <br />
                <span className="plate"> ABC882LR</span>
              </TableCell>
              <TableCell>
                {" "}
                <span className="badge bg-error">Inactive </span>
              </TableCell>
              <TableCell>
                {" "}
                <MoreVertIcon />{" "}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="b-r">
                <div className="d-flex alc f-10 flex-start">
                  <div className="user__avatar bg-warning">
                    <h3>DA</h3>
                  </div>
                  <div className="lheight13">
                  <h4 className="f-300">Dennis Abdulmalik</h4>
                  <p className="sub__title">STF/09/2623</p>
                  </div>
                  
                </div>
              </TableCell>
              <TableCell> Abuja [Garki]</TableCell>
              <TableCell> fakemail@outlook.com</TableCell>
              <TableCell> 0803 000 0000</TableCell>
              <TableCell>
                Toyota Hiace <br />
                <span className="plate"> ABC882LR</span>
              </TableCell>
              <TableCell>
                {" "}
                <span className="badge bg-error">Inactive </span>
              </TableCell>
              <TableCell>
                {" "}
                <MoreVertIcon />{" "}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="b-r">
                <div className="d-flex alc f-10 flex-start">
                  <div className="user__avatar bg-error">
                    <h3>MS</h3>
                  </div>
                  <div className="lheight13">
                  <h4 className="f-300">Dennis Abdulmalik</h4> 
                  <p className="sub__title">STF/09/2623</p>
                  </div>
                </div>
              </TableCell>
              <TableCell> Abuja [Garki]</TableCell>
              <TableCell> fakemail@outlook.com</TableCell>
              <TableCell> 0803 000 0000</TableCell>
              <TableCell>
                Toyota Hiace <br />
                <span className="plate"> ABC882LR</span>
              </TableCell>
              <TableCell>
                {" "}
                <span className="badge bg-success">Active </span>
              </TableCell>
              <TableCell>
                {" "}
                <MoreVertIcon />{" "}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

{/* Modal to add Driver */}
      <Modal
          open={newDriverModal}
          onClose={handleModalClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <div className="mb-35">
              <Typography id="modal-modal-title">
                <h4 className="summary__title t-xl title-case">
                  Add Driver
                </h4>
              </Typography>
              <div className="s-divider"></div>
            </div>
<section className="flex__normal">
<div className="w-200">
    <div className="profile_pic_holder b-round">
            <img src={profile} className="profile_pic b-round"/>
            <button className="btn btn-primary p-25 mt-15">Upload Photo</button>
        
    </div>
    </div>
            <form style={{width: '100%'}} >
              
              <section className="flex-container mb-lg">
                <div className="pos-rel w100-m10 ">
                        <label> Firstname</label>
                        <input
                        type="text"
                        className="form-control-input "
                        name="username"
                        placeholder="e.g Adamu"
                        />
                    </div>
                    <div className="pos-rel w100-m10 ">
                        <label> Lastname</label>
                        <input
                        type="text"
                        className="form-control-input "
                        name="username"
                        placeholder="e.g Norris"
                        />
                    </div>
                    <div className="pos-rel w100-m10 ">
                        <label> email address</label>
                        <input
                        type="email"
                        className="form-control-input "
                        name="username"
                        placeholder="email@domain.com"
                        />
                    </div>
              </section>

              <section className="flex-container mb-lg">
                <div className="pos-rel w100-m10 ">
                        <label> phone number</label>
                        <input
                        type="number"
                        className="form-control-input "
                        name="username"
                        placeholder="e.g. 0803 000 0000"
                        />
                    </div>
                    <div className="pos-rel w100-m10 ">
                    <label className="mb-7"> Nationality</label>
                        <select className="search__bar w-100" defaultValue={'default'}>
                            <option value="default"> Select Nationality</option>
                            <option value="Status 1"> Status 1</option>
                            <option value="Status 2"> Status 2</option>
                            <option value="Status 3"> Status 3</option>
                            <option value="Status 4"> Status 4</option>
                        </select>
                    </div>
                    <div className="pos-rel w100-m10 ">
                    <label className="mb-7"> Local Government Area</label>
                        <select className="search__bar w-100" defaultValue={'default'}>
                            <option value="default"> Select LGA</option>
                            <option value="Status 1"> Status 1</option>
                            <option value="Status 2"> Status 2</option>
                            <option value="Status 3"> Status 3</option>
                            <option value="Status 4"> Status 4</option>
                        </select>
                    </div>
              </section>

              <section className="flex-container mb-lg">
                
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
                    <div className="pos-rel w100-m10 ">
                    <label className="mb-7"> Bus</label>
                        <select className="search__bar w-100" defaultValue={'default'}>
                            <option value="default"> Select Bus</option>
                            <option value="Status 1"> Status 1</option>
                            <option value="Status 2"> Status 2</option>
                            <option value="Status 3"> Status 3</option>
                            <option value="Status 4"> Status 4</option>
                        </select>
                    </div>
                    <div className="pos-rel w100-m10 "></div>
              </section>
              <section className="flex-container mb-lg">
                    <div className="pos-rel w100-m10 ">
                    <label className="mb-7">  Address</label>
                        <textarea placeholder="enter home address" className="form-textarea w-100"></textarea>
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

export default Drivers;
