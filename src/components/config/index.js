import * as React from 'react';
import PropTypes from 'prop-types';
import profile from "../../assets/imgs/passport.png";
import BuildIcon from '@mui/icons-material/Build';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

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

export default function Configuration() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <section>
    <section className="page__header">
      <BuildIcon />
      <h3>System Configuration</h3>
    </section>
    <div className="s-divider"></div>


    <Box className="mt-35" sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Company Information" {...a11yProps(0)} />
          <Tab label="Admins" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <section className="flex__normal">
  
            <form style={{width: '100%'}} >
              
              <section className="flex-container mb-lg">
                <div className="pos-rel w100-m10 ">
                        <label> company name</label>
                        <input
                        type="text"
                        className="form-control-input "
                        name="company_name"
                        placeholder="Hooli Transport Ltd"
                        />
                    </div>
                    <div className="pos-rel w100-m10 ">
                        <label> owners name</label>
                        <input
                        type="text"
                        className="form-control-input "
                        name="owners_name"
                        placeholder="e.g Ahmed Peter"
                        />
                    </div>
                    <div className="pos-rel w100-m10 ">
                    </div>
              </section>

              <section className="flex-container mb-lg">
                
                    <div className="pos-rel w100-m10 ">
                    <label className="mb-7"> Company Location</label>
                        <select className="search__bar w-100" defaultValue={'default'} name="company_location">
                            <option value="default"> Select Location</option>
                            <option value="Location 1"> Location 1</option>
                            <option value="Location 2"> Location 2</option>
                            <option value="Location 3"> Location 3</option>
                            <option value="Location 4"> Location 4</option>
                        </select>
                    </div>
                    <div className="pos-rel w100-m10 ">
                        <label> Company Address</label>
                        <input
                        type="text"
                        className="form-control-input "
                        name="company_address"
                        placeholder="e.g. 100 Main street Wuse III"
                        />
                    </div>
                    <div className="pos-rel w100-m10 "></div>
              </section>

              <section className="flex-container mb-lg">
                
              <div className="pos-rel w100-m10 ">
                        <label> company email</label>
                        <input
                        type="email"
                        className="form-control-input "
                        name="company_name"
                        placeholder="example@email.com"
                        />
                    </div>
                    <div className="pos-rel w100-m10 ">
                        <label> Company Phone Number</label>
                        <input
                        type="number"
                        className="form-control-input "
                        name="company_phone"
                        placeholder="e.g 0803 000 0000"
                        />
                    </div>
                    <div className="pos-rel w100-m10 ">
                    <label> Company Slogan</label>
                        <input
                        type="text"
                        className="form-control-input "
                        name="company_slogan"
                        placeholder="In God we trust"
                        />
                    </div>
              </section>

              <div className="s-divider mt-35"></div>

              <section className="w-50 flex-container mt-35">
                  <div className="days flex-container mr-10 ">
                      <div className="days_from mr-10">
                      <label className="mb-7"> From</label>
                        <select className="search__bar w-100" defaultValue={'default'} name="date_from">
                            <option value="default"> Select Day</option>
                            <option value="Monday"> Monday</option>
                            <option value="Tuesday"> Tuesday</option>
                            <option value="Wednesday"> Wednesday</option>
                            <option value="Thursday"> Thursday</option>
                        </select>
                      </div>
                      <div className="days_to mr-10">
                      <label className="mb-7"> To</label>
                        <select className="search__bar w-100" defaultValue={'default'} name="date_from">
                            <option value="default"> Select Day</option>
                            <option value="Monday"> Monday</option>
                            <option value="Tuesday"> Tuesday</option>
                            <option value="Wednesday"> Wednesday</option>
                            <option value="Thursday"> Thursday</option>
                        </select>
                      </div>
                  </div>
                
                  <div className="time flex-container">
                    <div className="time_from mr-10">
                    <label className="mb-7"> From</label>
                        <select className="search__bar w-100" defaultValue={'default'} name="date_from">
                            <option value="default"> Select Time</option>
                            <option value="Monday"> Monday</option>
                            <option value="Tuesday"> Tuesday</option>
                            <option value="Wednesday"> Wednesday</option>
                            <option value="Thursday"> Thursday</option>
                        </select>
                    </div>
                      <div className="time_to">
                      <label className="mb-7"> To</label>
                        <select className="search__bar w-100" defaultValue={'default'} name="date_from">
                            <option value="default"> Select Time</option>
                            <option value="Monday"> Monday</option>
                            <option value="Tuesday"> Tuesday</option>
                            <option value="Wednesday"> Wednesday</option>
                            <option value="Thursday"> Thursday</option>
                        </select>
                      </div>
                  </div>
              </section>

              <div className="s-divider mt-35"></div>

              <section className="w-50 mt-35">
                      <label className="mb-7"> Select Company Color</label>
<div className="flex-container">
     <div className="company__color solid__green"></div> 
     
</div>

<div className="flex-container color__options w-50 mt-35">
     <div className="option solid__green"></div> 
     <div className="option solid__red"></div> 
     <div className="option solid__blue"></div> 
     <div className="option solid__green"></div> 
     <div className="option solid__red"></div> 
     
</div>
                     
              </section>
<div className="flex__normal w-20 pull-right mt-35">
              <button className="btn btn-primary p-25 pull-right">
                Save
              </button>
              </div>
            </form>
            <div className="w-200">
    <div className="profile_pic_holder">
            <img src={profile} className="profile_pic"/>
            <button className="btn btn-primary p-25 mt-15"> Logo</button>
        
    </div>
    </div>
            </section>
      </TabPanel>
      {/* Admin Config */}
      <TabPanel value={value} index={1}>
          <section className="flex-container">
           <div className="w-200">
            <div className="profile_pic_holder">
            <img src={profile} className="profile_pic"/>
            <h3 className="mt-15"> Ahmed Peter</h3>
            <p> Location: Abuja</p>
            </div>
            </div>
            <div className="w-200">
            <div className="profile_pic_holder">
            <img src={profile} className="profile_pic"/>
            <h3 className="mt-15"> Ahmed Peter</h3>
            <p> Location: Abuja</p>
            </div>
            </div>
            <div className="w-200">
            <div className="profile_pic_holder">
            <img src={profile} className="profile_pic"/>
            <h3 className="mt-15"> Ahmed Peter</h3>
            <p> Location: Abuja</p>
            </div>
            </div>
            <div className="w-200">
            <div className="profile_pic_holder">
            <img src={profile} className="profile_pic"/>
            <h3 className="mt-15"> Ahmed Peter</h3>
            <p> Location: Abuja</p>
            </div>
            </div>
            <div className="w-200">
            <div className="profile_pic_holder">
            <img src={profile} className="profile_pic"/>
            <h3 className="mt-15"> Ahmed Peter</h3>
            <p> Location: Abuja</p>
            </div>
            </div>
            <div className="w-200">
            <div className="profile_pic_holder">
            <img src={profile} className="profile_pic"/>
            <h3 className="mt-15"> Ahmed Peter</h3>
            <p> Location: Abuja</p>
            </div>
            </div>
</section>
      </TabPanel>
    </Box>
    </section>
  );
}
