import React from 'react';
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";

export const BusRow = (props) => {

   
  return (
    <>

<TableRow>
              <TableCell className="b-r">
              {props.type}
              </TableCell>
              <TableCell> {props.plateNumber}</TableCell>
              <TableCell> 
              <div className="d-flex alc f-10 flex-start">
                  <div className="user__avatar bg-success">
                    <h3>AP</h3>
                  </div>
                  <div className="lheight13">
                  <h4 className="f-300">{props.driver}</h4>
                  <p className="sub__title">{props.driverBadge}</p>
                  </div>
                </div>
              </TableCell>
              <TableCell> {props.from} - {props.to} </TableCell>
              <TableCell>
                {" "}
                <span className="badge bg-success">In Service</span>{" "}
              </TableCell>
              <TableCell>
                {" "}
                <MoreVertIcon />{" "}
              </TableCell>
            </TableRow>
    </>
  );
};
