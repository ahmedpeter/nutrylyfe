import * as React from "react";
import PropTypes from 'prop-types';
import profile from "../../assets/imgs/passport.png";
import BuildIcon from '@mui/icons-material/Build';
import ValidateTicket from './validate-ticket/validate-ticket';
import ModifyTicket from './modify-ticket/modify-ticket';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Doughnut } from "react-chartjs-2";
import LuggageIcon from '@mui/icons-material/Luggage';
import FrontDeskDashboard from './Dashboard/dashboard'
import BookTrip from './booktrip/book-trip'
import {Chart, ArcElement} from 'chart.js'
Chart.register(ArcElement);

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
  
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

const FrontDesk = () => {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
  return (
    <section>
      
        {/* <AltRouteIcon /> */}
        <Box className="mt-35" sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
      <section className="frontdesk__header flex-container alc">
          <div className="flex-container alc">
            <LuggageIcon/>
      <h3>Front Desk</h3>  
          </div>
      
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Dashboard" {...a11yProps(0)} />
          <Tab label="Book a Trip" {...a11yProps(1)} />
          <Tab label="Validate Ticket" {...a11yProps(2)} />
          <Tab label="Modify Ticket" {...a11yProps(3)} />
        </Tabs>

        </section>
      

     
      </Box>
      <TabPanel value={value} index={0}>
        <FrontDeskDashboard/>
      </TabPanel>
      <TabPanel value={value} index={1}>
          <BookTrip/>
      </TabPanel>
      <TabPanel value={value} index={2}>
          <ValidateTicket/>
      </TabPanel>
      <TabPanel value={value} index={3}>
          <ModifyTicket/>
      </TabPanel>
    </Box>

    </section>
  );
};

export default FrontDesk;
