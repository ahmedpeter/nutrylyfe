import * as React from "react";
import CachedIcon from "@mui/icons-material/Cached";
import Tabs from "@mui/material/Tabs";
import PropTypes from "prop-types";
import Tab from "@mui/material/Tab";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CircleIcon from "@mui/icons-material/Circle";
import Seats from "./seats";
import Ticket from "./ticket";
import Payment from "./payment";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

const ModifyTicket = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <section>
      <section className="page__header">
        <CachedIcon />
        <h3>Modify Ticket</h3>
      </section>
      <div className="s-divider"></div>

      <section className="modify__tickets flex__normal">
        <div className="tickets">
          <div className="h-70">
            <input
              type="text"
              placeholder="Search ticket number"
              className="modify__ticket__search"
            />
          </div>
          <div className="modify__card">
            <div className="bus__details pd-30px">
              <div className="d-flex alc f-10 mt-15 spbtw">
                <div className="d-flex alc">
                  <div className="user__avatar bg-error">
                    <h3>AO</h3>
                  </div>
                  <div className="lheight13">
                    <h4 className="f-300">Adeze Obi</h4>
                  </div>
                </div>
                <p className="fw-bold">#G154MD5</p>
              </div>
              <section className="">
                <p style={{ textAlign: "right" }}>Seat No. P9</p>
              </section>
            </div>
          </div>

          <div className="modify__card">
            <div className="bus__details pd-30px">
              <div className="d-flex alc f-10 mt-15 spbtw">
                <div className="d-flex alc">
                  <div className="user__avatar bg-error">
                    <h3>AM</h3>
                  </div>
                  <div className="lheight13">
                    <h4 className="f-300">Alice Mbatsav</h4>
                  </div>
                </div>
                <p className="fw-bold">#G154MD5</p>
              </div>
              <section className="">
                <p style={{ textAlign: "right" }}>Seat No. P9</p>
              </section>
            </div>
          </div>

          <div className="modify__card">
            <div className="bus__details pd-30px">
              <div className="d-flex alc f-10 mt-15 spbtw">
                <div className="d-flex alc">
                  <div className="user__avatar bg-error">
                    <h3>PG</h3>
                  </div>
                  <div className="lheight13">
                    <h4 className="f-300">Pharoh Godwin</h4>
                  </div>
                </div>
                <p className="fw-bold">#G154MD5</p>
              </div>
              <section className="">
                <p style={{ textAlign: "right" }}>Seat No. P9</p>
              </section>
            </div>
          </div>
          <div className="modify__card">
            <div className="bus__details pd-30px">
              <div className="d-flex alc f-10 mt-15 spbtw">
                <div className="d-flex alc">
                  <div className="user__avatar bg-error">
                    <h3>AP</h3>
                  </div>
                  <div className="lheight13">
                    <h4 className="f-300">Ahmed Peter</h4>
                  </div>
                </div>
                <p className="fw-bold">#G154MD5</p>
              </div>
              <section className="">
                <p style={{ textAlign: "right" }}>Seat No. P9</p>
              </section>
            </div>
          </div>
          <div className="modify__card">
            <div className="bus__details pd-30px">
              <div className="d-flex alc f-10 mt-15 spbtw">
                <div className="d-flex alc">
                  <div className="user__avatar bg-error">
                    <h3>BJ</h3>
                  </div>
                  <div className="lheight13">
                    <h4 className="f-300">Benedict Juliet</h4>
                  </div>
                </div>
                <p className="fw-bold">#G154MD5</p>
              </div>
              <section className="">
                <p style={{ textAlign: "right" }}>Seat No. P9</p>
              </section>
            </div>
          </div>
          <div className="modify__card">
            <div className="bus__details pd-30px">
              <div className="d-flex alc f-10 mt-15 spbtw">
                <div className="d-flex alc">
                  <div className="user__avatar bg-error">
                    <h3>SP</h3>
                  </div>
                  <div className="lheight13">
                    <h4 className="f-300">Stacey Peter</h4>
                  </div>
                </div>
                <p className="fw-bold">#G154MD5</p>
              </div>
              <section className="">
                <p style={{ textAlign: "right" }}>Seat No. P9</p>
              </section>
            </div>
          </div>
          <div className="modify__card">
            <div className="bus__details pd-30px">
              <div className="d-flex alc f-10 mt-15 spbtw">
                <div className="d-flex alc">
                  <div className="user__avatar bg-error">
                    <h3>FP</h3>
                  </div>
                  <div className="lheight13">
                    <h4 className="f-300">Fortune Peter</h4>
                  </div>
                </div>
                <p className="fw-bold">#G154MD5</p>
              </div>
              <section className="">
                <p style={{ textAlign: "right" }}>Seat No. P9</p>
              </section>
            </div>
          </div>
        </div>

        <div className="ticket__content">
          <section className="d-flex">
            <div className="d-flex alc f-10 mt-15 spbtw content__left">
              <div className="d-flex alc" style={{ marginRight: "10px" }}>
                <div className="user__avatar bg-error">
                  <h3>AO</h3>
                </div>
                <div className="lheight13">
                  <h4 className="f-300">Adeze Obi</h4>
                </div>
              </div>
              <p className="fw-bold">#G154MD5</p>
            </div>

            <div className="d-flex alc f-10 mt-15 spbtw content__right">
              <div className="d-flex alc content__stepper">
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label="icon tabs example"
                  indicatorColor="none"
                >
                  <Tab
                    icon={<CircleIcon />}
                    aria-label="Ticket"
                  />
                  <Tab icon={<CircleOutlinedIcon />} aria-label="Seats" />
                  <Tab icon={<CircleOutlinedIcon />} aria-label="Payments" />
                </Tabs>
              </div>
              <button className="btn btn-primary p-25">Next</button>
            </div>
          </section>
          <section className="flex__normal alc my-40">
            <TabPanel value={value} index={0}>
              <Ticket />
            </TabPanel>
            <TabPanel value={value} index={1}>
              <Seats />
            </TabPanel>
            <TabPanel value={value} index={2}>
              <Payment />
            </TabPanel>
          </section>
        </div>
      </section>
    </section>
  );
};

export default ModifyTicket;
