import * as React from "react";
import BusImage from "../../../assets/imgs/toyota_hiace.jpeg";
import AltRouteIcon from '@mui/icons-material/AltRoute';

const Payment = () => {

  return (
    <section style={{width: '50%', marginLeft: '25%'}}>
      <h3> Payment Method </h3>
      <section style={{display: 'flex', margin: '25px 0', alignItems: 'center', justifyContent: 'space-evenly', width: '300px'}}>
          <div style={{padding: '15px 35px', border: '2px solid grey', borderRadius: '5px', marginRight: '20px', display: 'flex'}}>
               Cash &nbsp; <input type="radio" checked style={{accentColor: '#4475f3'}} name="payment_type" value="Cash"/>
          </div>
         <div style={{padding: '15px 35px', border: '2px solid grey', borderRadius: '5px', display: 'flex'}}>
             POS &nbsp;<input type="radio" style={{accentColor: '#4475f3'}} name="payment_type" value="POS"/>
         </div>

      
      </section>

      <section className="flex-alc d-divider" style={{justifyContent: 'space-around'}}>
          <div className="trip_type lheight23"> 
           <p className="fw-bold">  <AltRouteIcon/> TRIP TYPE</p>
            <p> One Way</p>
          </div>

          <div className="trip_type lheight23"> 
            <p className="fw-bold"> DEPARTURE DATE</p>
            <p> 22 - 04 - 2023</p>
          </div>
      </section>


      <section className="flex-alc" style={{justifyContent: 'space-around', margin: '35px 0'}}>
      <div className="" style={{width: '50%'}}>
            <img src={BusImage} className="w-100" />
          </div>

          <div className="trip_type lheight23"> 
            <p className="fw-bold"> TOYOTA - (Hiace X)</p>
            <p> Seat - P9</p>
            <p> 06 : 30 AM</p>
          </div>
      </section>




      <section className="flex-alc" style={{justifyContent: 'space-around'}}>
          <div className="trip_type lheight23"> 
            <p className="fw-bold"> DEPARTURE</p>
            <p> Abuja - Utako</p>
          </div>

          <div className="trip_type lheight23"> 
            <p className="fw-bold"> ARRIVAL</p>
            <p> Edo - Auchi</p>
          </div>
      </section>

      <section className="flex-alc" style={{justifyContent: 'space-around'}}>
          <div className="trip_type"> 
            <p style={{margin: '25px 0'}}> You will be charged <span className="fw-bold">N260.00</span> for this modification that is made to this ticket</p>
          </div>
      </section>

      <button className="btn btn-primary p-25 w-100">
                        Pay N260.00
                      </button>
       
    </section>
  );
};

export default Payment;
