import * as React from "react";
import SpeedIcon from '@material-ui/icons/Speed';
import currency from "../../../utils/formatCurrency";
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import BusImage from "../../../assets/imgs/toyota_hiace.jpeg";
import { Doughnut } from "react-chartjs-2";
import {Chart, ArcElement} from 'chart.js'
Chart.register(ArcElement);

const data = {
  datasets: [
    {
      label: 'Ratio between Active & Inactive Drivers',
      data: [83, 20],
      backgroundColor: [
        'rgba(236, 112, 122, 1)',
        'rgba(16, 172, 126, 1)'
      ]
    },
  ],
};

var config = {        
  cutout: 47,
  responsive: true,
  maintainAspectRatio: true,
};

const FronDeskDashboard = () => {
  

  return (
    <section>
      <section className="page__header">
        <SpeedIcon />
        <h3>Dashboard</h3>
      </section>
      <h3>Daily Travel Report</h3>
        <p className="sub__title">12 July</p>
      <section style={{display: 'flex'}}>
          <div className="stat w-250px m45">
           
          <div className="pd-x10 flex-alc">
          <CurrencyExchangeIcon />
          <div className="ml-10">
            <h3 className="stat__value">{currency(49028400)}</h3>
            <p className="sub__title">Total Income this Month</p>
            </div>
          </div>
        </div>

        <div className="stat w-250px m45 ">
          <div className="pd-x10 flex-alc">
          <PeopleAltIcon />
            <div className="ml-10">
              <h3 className="stat__value">580</h3>
              <p className="sub__title">Total Passengers Today</p>
            </div>
            
          </div>
        </div>

        <div className="stat m45">
        <div className="left__stat d-block">
        
        <div className="right__sub s-divider pl-25">
            <h3 className="stat__value c-success">83</h3>
            <p className="sub__title">Adult</p>
          </div>
          <div className="right__sub pl-25">
            <h3 className="stat__value c-error">20</h3>
            <p className="sub__title">Children</p>
          </div>


        </div>
        <div className="right__stat">
        <div className="right__sub">
          <div>
                <Doughnut data={data} options={config} className="w80"/>
            </div>
          </div>

          
        </div>

       
        </div>
      </section>

      <section className="p-y my-40">
      <h3>Today's Fleet</h3>
      <p className="sub__title">50 Cars</p>
      </section>
      <section className="flex-container" style={{margin: '20px 0'}}>
      <div className="bus__card">
          <div className="bus__image">
          <img src={BusImage} className="w-100"/>
          </div>
          <div className="bus__details pd-30px">
              <p className="bus__type">Toyota - (Hiace)</p>
              <div className="d-flex alc f-10 flex-start mt-15">
                  <div className="user__avatar bg-error">
                    <h3>PY</h3>
                  </div>
                  <div className="lheight13">
                  <h4 className="f-300">Adeze Obi</h4>
                  <p className="sub__title">Driver</p>
                  </div>
                </div>
                <div className="s-divider my-10"></div>
                <div className="bus__footer flex-container alc">
                    <div>
                        <p>Passengers</p>
                        <h3>50</h3>
                    </div>
                    <div>
                        <p>Seats</p>
                        <h3>15</h3>
                    </div>
                </div>
          </div>
      </div>

      <div className="bus__card">
          <div className="bus__image">
          <img src={BusImage} className="w-100"/>
          </div>
          <div className="bus__details pd-30px">
              <p className="bus__type">Toyota - (Hiace)</p>
              <div className="d-flex alc f-10 flex-start mt-15">
                  <div className="user__avatar bg-error">
                    <h3>AP</h3>
                  </div>
                  <div className="lheight13">
                  <h4 className="f-300">Ahmed Peter</h4>
                  <p className="sub__title">Driver</p>
                  </div>
                </div>
                <div className="s-divider my-10"></div>
                <div className="bus__footer flex-container alc">
                    <div>
                        <p>Passengers</p>
                        <h3>50</h3>
                    </div>
                    <div>
                        <p>Seats</p>
                        <h3>15</h3>
                    </div>
                </div>
          </div>
      </div>

      <div className="bus__card">
          <div className="bus__image">
          <img src={BusImage} className="w-100"/>
          </div>
          <div className="bus__details pd-30px">
              <p className="bus__type">Toyota - (Hiace)</p>
              <div className="d-flex alc f-10 flex-start mt-15">
                  <div className="user__avatar bg-error">
                    <h3>AM</h3>
                  </div>
                  <div className="lheight13">
                  <h4 className="f-300">Alice Mbatsav</h4>
                  <p className="sub__title">Driver</p>
                  </div>
                </div>
                <div className="s-divider my-10"></div>
                <div className="bus__footer flex-container alc">
                    <div>
                        <p>Passengers</p>
                        <h3>50</h3>
                    </div>
                    <div>
                        <p>Seats</p>
                        <h3>15</h3>
                    </div>
                </div>
          </div>
      </div>


      <div className="bus__card">
          <div className="bus__image">
          <img src={BusImage} className="w-100"/>
          </div>
          <div className="bus__details pd-30px">
              <p className="bus__type">Toyota - (Hiace)</p>
              <div className="d-flex alc f-10 flex-start mt-15">
                  <div className="user__avatar bg-error">
                    <h3>AO</h3>
                  </div>
                  <div className="lheight13">
                  <h4 className="f-300">Adeze Obi</h4>
                  <p className="sub__title">Driver</p>
                  </div>
                </div>
                <div className="s-divider my-10"></div>
                <div className="bus__footer flex-container alc">
                    <div>
                        <p>Passengers</p>
                        <h3>50</h3>
                    </div>
                    <div>
                        <p>Seats</p>
                        <h3>15</h3>
                    </div>
                </div>
          </div>
      </div>

      </section>
      <section className="flex-container">
      <div className="bus__card">
          <div className="bus__image">
          <img src={BusImage} className="w-100"/>
          </div>
          <div className="bus__details pd-30px">
              <p className="bus__type">Toyota - (Hiace)</p>
              <div className="d-flex alc f-10 flex-start mt-15">
                  <div className="user__avatar bg-error">
                    <h3>PY</h3>
                  </div>
                  <div className="lheight13">
                  <h4 className="f-300">Adeze Obi</h4>
                  <p className="sub__title">Driver</p>
                  </div>
                </div>
                <div className="s-divider my-10"></div>
                <div className="bus__footer flex-container alc">
                    <div>
                        <p>Passengers</p>
                        <h3>50</h3>
                    </div>
                    <div>
                        <p>Seats</p>
                        <h3>15</h3>
                    </div>
                </div>
          </div>
      </div>

      <div className="bus__card">
          <div className="bus__image">
          <img src={BusImage} className="w-100"/>
          </div>
          <div className="bus__details pd-30px">
              <p className="bus__type">Toyota - (Hiace)</p>
              <div className="d-flex alc f-10 flex-start mt-15">
                  <div className="user__avatar bg-error">
                    <h3>AP</h3>
                  </div>
                  <div className="lheight13">
                  <h4 className="f-300">Ahmed Peter</h4>
                  <p className="sub__title">Driver</p>
                  </div>
                </div>
                <div className="s-divider my-10"></div>
                <div className="bus__footer flex-container alc">
                    <div>
                        <p>Passengers</p>
                        <h3>50</h3>
                    </div>
                    <div>
                        <p>Seats</p>
                        <h3>15</h3>
                    </div>
                </div>
          </div>
      </div>

      <div className="bus__card">
          <div className="bus__image">
          <img src={BusImage} className="w-100"/>
          </div>
          <div className="bus__details pd-30px">
              <p className="bus__type">Toyota - (Hiace)</p>
              <div className="d-flex alc f-10 flex-start mt-15">
                  <div className="user__avatar bg-error">
                    <h3>AM</h3>
                  </div>
                  <div className="lheight13">
                  <h4 className="f-300">Alice Mbatsav</h4>
                  <p className="sub__title">Driver</p>
                  </div>
                </div>
                <div className="s-divider my-10"></div>
                <div className="bus__footer flex-container alc">
                    <div>
                        <p>Passengers</p>
                        <h3>50</h3>
                    </div>
                    <div>
                        <p>Seats</p>
                        <h3>15</h3>
                    </div>
                </div>
          </div>
      </div>


      <div className="bus__card">
          <div className="bus__image">
          <img src={BusImage} className="w-100"/>
          </div>
          <div className="bus__details pd-30px">
              <p className="bus__type">Toyota - (Hiace)</p>
              <div className="d-flex alc f-10 flex-start mt-15">
                  <div className="user__avatar bg-error">
                    <h3>AO</h3>
                  </div>
                  <div className="lheight13">
                  <h4 className="f-300">Adeze Obi</h4>
                  <p className="sub__title">Driver</p>
                  </div>
                </div>
                <div className="s-divider my-10"></div>
                <div className="bus__footer flex-container alc">
                    <div>
                        <p>Passengers</p>
                        <h3>50</h3>
                    </div>
                    <div>
                        <p>Seats</p>
                        <h3>15</h3>
                    </div>
                </div>
          </div>
      </div>

      </section>
    </section>
  );
};

export default FronDeskDashboard;
