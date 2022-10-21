import * as React from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AltRouteIcon from '@mui/icons-material/AltRoute';
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { useState} from "react";
import Typography from "@mui/material/Typography";
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
  { id: "location", label: "Location" },
  { id: "branch", label: "Branch" },
  { id: "drivers_nos", label: "No. of Drivers" },
  { id: "buses_nos", label: "No. of Buses" },
  { id: "status", label: "Status" },
  { id: "action", label: "" },
];



function createData(location, branch, drivers_nos, buses_nos, status, action) {
  return { location, branch, drivers_nos, buses_nos, status, action };
}

const Branches = () => {
  
  const [newBranchModal, setNewBranchModal] = useState(false);
  const handleModalClose = () => setNewBranchModal(false);

  return (
    <section>
      
      <section className="page__header">
        <AltRouteIcon />
        <h3>Manage Branches</h3>
      </section>
      <div className="s-divider"></div>
      

      <section className="flex-container alc p-y my-40">
        <div className="">
          <input
            type="text"
            className="search__bar w-200"
            placeholder="Search by location or branch"
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
          <button className="btn btn-primary p-25" onClick={() => setNewBranchModal(true)}>Add Branch</button>
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
              Abuja
              </TableCell>
              <TableCell> Kubwa</TableCell>
              <TableCell> 
              29
              </TableCell>
              <TableCell> 34 </TableCell>
              <TableCell>
                {" "}
                <span className="badge bg-success">Open</span>{" "}
              </TableCell>
              <TableCell>
                {" "}
                <MoreVertIcon />{" "}
              </TableCell>
            </TableRow>
            

            <TableRow>
              <TableCell className="b-r">
              Abuja
              </TableCell>
              <TableCell> Mpape</TableCell>
              <TableCell>4</TableCell>
              <TableCell>19 </TableCell>
              <TableCell>
                {" "}
                <span className="badge bg-error">Closed</span>{" "}
              </TableCell>
              <TableCell>
                {" "}
                <MoreVertIcon />{" "}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="b-r">
              Abuja
              </TableCell>
              <TableCell> Kubwa</TableCell>
              <TableCell> 
              29
              </TableCell>
              <TableCell> 34 </TableCell>
              <TableCell>
                {" "}
                <span className="badge bg-success">Open</span>{" "}
              </TableCell>
              <TableCell>
                {" "}
                <MoreVertIcon />{" "}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>


          
{/* Modal to add Branch */}
<Modal
          open={newBranchModal}
          onClose={handleModalClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style} className="w-50">
            <div className="mb-35">
              <Typography id="modal-modal-title">
                <h4 className="summary__title t-xl title-case">
                  Add Branch
                </h4>
              </Typography>
              <div className="s-divider"></div>
            </div>
  <section className="flex__normal">
            <form style={{width: '100%'}} >
               <section className="flex-container mb-lg">
              <div className="pos-rel w100-m10 ">
              <label className="mb-7">  Location</label>
                        <select className="search__bar w-100" defaultValue={'default'}>
                            <option value="default"> Select Location</option>
                            <option value="Status 1"> Status 1</option>
                            <option value="Status 2"> Status 2</option>
                            <option value="Status 3"> Status 3</option>
                            <option value="Status 4"> Status 4</option>
                        </select>
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

export default Branches;
