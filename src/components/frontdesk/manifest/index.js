import * as React from "react";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import SyncAltIcon from '@mui/icons-material/SyncAlt';
import Paper from "@mui/material/Paper";



const columns = [
  { id: "passenger", label: "Passenger" },
  { id: "type", label: "Passenger Type" },
  { id: "email", label: "Email" },
  { id: "phone", label: "Phone" }
];



function createData(passenger, type, email, phone) {
  return { passenger, type, email, phone };
}

const Manifest = () => {

  return (
    <section>
      <section className="page__header">
        <h3>Manifest</h3>
      </section>
      <div className="s-divider"></div>
      

<section className="flex-alc my-35"><div className="pos-rel">
                        <input
                        type="text"
                        className="form-control-input "
                        name="search"
                        placeholder="Search passenger by name, email or phone"
                        />
                    </div>
          </section>

      <TableContainer component={Paper}>
        <Table sx={{ maxWidth: '80%' }} size="small" aria-label="Officers Table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell>{column.label}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
          <TableRow>
              <TableCell className="b-r"> Ahmed Peter </TableCell>
              <TableCell> Adult</TableCell>
              <TableCell> talk2ahmedpeter@gmail.com </TableCell>
              <TableCell> 0806 547 5245 </TableCell>
            </TableRow>
            

            <TableRow>
              <TableCell className="b-r"> Stacey Ahmed </TableCell>
              <TableCell> Child</TableCell>
              <TableCell> N/A </TableCell>
              <TableCell> N/A  </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="b-r"> Marvelous Ahmed  </TableCell>
              <TableCell> Adult</TableCell>
              <TableCell> marvelous@gmail.com </TableCell>
              <TableCell> 0802 3943138 </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="b-r"> Ahmed Peter </TableCell>
              <TableCell> Adult</TableCell>
              <TableCell> talk2ahmedpeter@gmail.com </TableCell>
              <TableCell> 0806 547 5245 </TableCell>
            </TableRow>
            

            <TableRow>
              <TableCell className="b-r"> Stacey Ahmed </TableCell>
              <TableCell> Child</TableCell>
              <TableCell> N/A </TableCell>
              <TableCell> N/A  </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="b-r"> Marvelous Ahmed  </TableCell>
              <TableCell> Adult</TableCell>
              <TableCell> marvelous@gmail.com </TableCell>
              <TableCell> 0802 3943138 </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </section>
  );
};

export default Manifest;
