import * as React from "react";
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';



const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
const ValidateTicket = () => {
  
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };



  return (
    <section>
      <section className="page__header">
        <ConfirmationNumberIcon />
        <h3>Validate Ticket</h3>
      </section>
      <div className="s-divider"></div>
      <section>
        <div style={{ margin: "13% 0" }}>
          <input
            type="text"
            className="validate_ticket_form"
            name="ticket_number"
            placeholder="Enter ticket number"
          />
          <button
            className="btn btn-primary p-25 reposition_btn"
            onClick={handleClickOpen}
          >
            {" "}
            Search
          </button>
        </div>
      </section>

      <div>
        <Dialog
          fullScreen
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle style={{ fontWeight: "bold" }}>
            {"Validate Confirmation"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              <section
                style={{ display: 'flex', margin: "20px 0", gap: "10px" }}
              >
                <div className="validate__card">
                  <div className="bus__details pd-30px">
                    <div className="d-flex alc f-10 mt-15 spbtw">
                      <div className="d-flex alc">
                        <div className="user__avatar bg-error">
                          <h3>PY</h3>
                        </div>
                        <div className="lheight13">
                          <h4 className="f-300">Adeze Obi</h4>
                        </div>
                      </div>
                      <p className="fw-bold">G154MD5</p>
                    </div>

                    <section className="d-flex alc spbtw mt-15">
                      <div>
                        <p className="sub__title fw-bold">DEPARTURE</p>
                        <p>Abuja - Utako</p>
                      </div>
                      <div className="arrival">
                        <p className="sub__title fw-bold">ARRIVAL</p>
                        <p>Kano - Aba Rd.</p>
                      </div>
                    </section>
                    <section className="d-flex alc spbtw mt-15">
                      <div>
                        <p className="sub__title fw-bold">Date</p>
                        <p>02-01-2022</p>
                      </div>
                      <div>
                        <p className="sub__title fw-bold">Time</p>
                        <p>06 : 30AM</p>
                      </div>
                      <div>
                        <p className="sub__title fw-bold">Bus No.</p>
                        <p>4</p>
                      </div>
                      <div>
                        <p className="sub__title fw-bold">Seat No.</p>
                        <p>P7</p>
                      </div>
                    </section>
                    <section className="mt-35 d-flex alc spbtw">
                      <button
                        className="btn btn-secondary p-25"
                        onClick={handleClose}
                      >
                        {" "}
                        Print ticket
                      </button>
                      <button
                        className="btn btn-primary p-25"
                        onClick={handleClose}
                      >
                        {" "}
                        Confirm ticket
                      </button>
                    </section>
                  </div>
                </div>

                <div className="validate__card">
                  <div className="bus__details pd-30px">
                    <div className="d-flex alc f-10 mt-15 spbtw">
                      <div className="d-flex alc">
                        <div className="user__avatar bg-error">
                          <h3>PY</h3>
                        </div>
                        <div className="lheight13">
                          <h4 className="f-300">Adeze Obi</h4>
                        </div>
                      </div>
                      <p className="fw-bold">G154MD5</p>
                    </div>

                    <section className="d-flex alc spbtw mt-15">
                      <div>
                        <p className="sub__title fw-bold">DEPARTURE</p>
                        <p>Abuja - Utako</p>
                      </div>
                      <div className="arrival">
                        <p className="sub__title fw-bold">ARRIVAL</p>
                        <p>Kano - Aba Rd.</p>
                      </div>
                    </section>
                    <section className="d-flex alc spbtw mt-15">
                      <div>
                        <p className="sub__title fw-bold">Date</p>
                        <p>02-01-2022</p>
                      </div>
                      <div>
                        <p className="sub__title fw-bold">Time</p>
                        <p>06 : 30AM</p>
                      </div>
                      <div>
                        <p className="sub__title fw-bold">Bus No.</p>
                        <p>4</p>
                      </div>
                      <div>
                        <p className="sub__title fw-bold">Seat No.</p>
                        <p>P7</p>
                      </div>
                    </section>
                    <section className="mt-35 d-flex alc spbtw">
                      <button
                        className="btn btn-secondary p-25"
                        onClick={handleClose}
                      >
                        {" "}
                        Print ticket
                      </button>
                      <button
                        className="btn btn-primary p-25"
                        onClick={handleClose}
                      >
                        {" "}
                        Confirm ticket
                      </button>
                    </section>
                  </div>
                </div>
              </section>
            </DialogContentText>
          </DialogContent>
          {/* <DialogActions>
        <button className="btn btn-primary p-25 reposition_btn" onClick={handleClose}> Print</button>
        <button className="btn btn-primary p-25 reposition_btn" onClick={handleClose}> Confirm</button>
        </DialogActions> */}
        </Dialog>
      </div>
    </section>
  );
};

export default ValidateTicket;
