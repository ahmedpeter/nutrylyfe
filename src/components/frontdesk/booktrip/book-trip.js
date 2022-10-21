import * as React from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AltRouteIcon from '@mui/icons-material/AltRoute';
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import SyncAltIcon from '@mui/icons-material/SyncAlt';
import Paper from "@mui/material/Paper";



const columns = [
  { id: "bus_type", label: "Bus Type" },
  { id: "route", label: "Travelling Route" },
  { id: "period", label: "Period" },
  { id: "seats", label: "Available Seats" },
  { id: "action", label: "" },
];



function createData(bus_type, route, period, seats, action) {
  return { bus_type, route, period, seats, action };
}

const BookTrip = () => {

  return (
    <section>
      <section className="page__header">
        <AltRouteIcon />
        <h3>Book a Trip</h3>
      </section>
      <div className="s-divider"></div>
      

      <section className="flex-container alc my-40">
      <section className="flex-alc group_input  w-45p jcs">
                <div className="pos-rel" style={{width: '50%'}}>
                <label className="mb-7"> From</label>
                <select defaultValue={'default'} className="book_trip_form_input dropdown"
                        name="origin" style={{width: '100%'}}>
                      <option value="default"> Departure Station</option>
                      <option value="ABUJA"> ABUJA</option>
                      <option value="Lagos"> Lagos</option>
                      <option value="Kano"> Kano</option>
                      <option value="Benin"> Benin</option>
                      <option value="Sokoto"> Sokoto</option>
                      <option value="Jos"> Jos</option>
                      <option value="Benue"> Benue</option>
                      <option value="Imo"> Imo</option>
                    </select>
                    </div>
                    <SyncAltIcon/>
                    <div className="pos-rel ml-15" style={{width: '50%'}}>
                <label className="mb-7"> To</label>
                <select defaultValue={'default'} className="book_trip_form_input dropdown"
                        name="destination" style={{width: '100%'}}>
                      <option value="default"> Arrival Station</option>
                      <option value="Abuja"> Abuja</option>
                      <option value="Lagos"> Lagos</option>
                      <option value="Kano"> Kano</option>
                      <option value="Benin"> Benin</option>
                      <option value="Kaduna"> Kaduna</option>
                      <option value="Enugu"> Enugu</option>
                      <option value="Jigawa"> Jigawa</option>
                      <option value="Zamfara"> Zamfara</option>
                    </select>
                    </div>
                    </section>

                    <section className="flex-alc group_input jcs w-160">
                    <div className="pos-rel w-100">
                    <label className="mb-7"> Departure Date</label>
                        <input
                        type="date"
                        className="book_trip_form_input w100"
                        name="depart_date"
                        />
                    </div>
                    </section>
                    <section className="flex-alc group_input jcs w-160">
                    <div className="pos-rel">
                    <label className="mb-7"> Passengers</label>
                        <input
                        type="text"
                        className="book_trip_form_input"
                        name="passengers"
                        />
                    </div>
                    </section>
        <div className="">
          <button className="btn btn-primary p-25" >Search</button>
        </div>
      </section>


      <div className="s-divider"></div>
<section className="flex-alc my-35">
<div className="pos-rel">
                    <label className="mb-7"> Filter By Status</label>
      <select className="search__bar w-200" defaultValue={'default'}>
            <option value="default"> Filter By Status</option>
            <option value="Status 1"> Status 1</option>
            <option value="Status 2"> Status 2</option>
            <option value="Status 3"> Status 3</option>
            <option value="Status 4"> Status 4</option>
          </select>
</div>


          <div className="pos-rel" style={{marginTop: '5px'}}>
                    <label> Filter By Period</label>
                        <input
                        type="date"
                        className="form-control-input w-200"
                        name="purchase_date"
                        />
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
              <TableCell className="b-r flex-alc spbtw p11"> 
                <span> Toyota Hiace</span> 
                <span>
                    <LocalShippingIcon/>
                </span> 
              </TableCell>
              <TableCell> Abuja(Utako) - Lagos(Uyi)</TableCell>
              <TableCell> Morning - 6:30am </TableCell>
              <TableCell> 3 Seats Available  </TableCell>
              <TableCell>  <button className="btn btn-dark p-25" >Select Seat</button> </TableCell>
            </TableRow>
            

            <TableRow>
              <TableCell className="b-r flex-alc spbtw p11"> 
                <span> Toyota Hiace</span> 
                <span>
                    <LocalShippingIcon/>
                </span> 
              </TableCell>
              <TableCell> Abuja(Utako) - Lagos(Uyi)</TableCell>
              <TableCell> Morning - 6:30am </TableCell>
              <TableCell> 3 Seats Available  </TableCell>
              <TableCell>  <button className="btn btn-dark p-25" >Select Seat</button> </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="b-r flex-alc spbtw p11"> 
                <span> Toyota Hiace</span> 
                <span>
                    <LocalShippingIcon/>
                </span> 
              </TableCell>
              <TableCell> Abuja(Utako) - Lagos(Uyi)</TableCell>
              <TableCell> Morning - 6:30am </TableCell>
              <TableCell> 3 Seats Available  </TableCell>
              <TableCell>  <button className="btn btn-dark p-25" >Select Seat</button> </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </section>
  );
};

export default BookTrip;
