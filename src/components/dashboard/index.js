import * as React from "react";
import { useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import SpeedIcon from '@material-ui/icons/Speed';
import { Line } from "react-chartjs-2";
// import { Line } from 'react-chartjs-2';
import currency from "../../utils/formatCurrency";
import {Chart, ArcElement} from 'chart.js'
Chart.register(ArcElement);



ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);


const labels = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sept',
    'Oct',
    'Nov',
    'Dec',
  ];

  const data = {
    labels: labels,
    datasets: [{
      label: 'Monthly Payment Report',
      borderColor: 'rgba(237, 120, 120, 1)',
      tension: 0.9,
      borderWidth: 0.3,
      pointBackgroundColor: 'rgba(234, 102, 103, 1)',
      data: [250, 110, 207, 200, 250, 100, 210, 200, 130, 107, 90, 100],
    }]
  };

  const config = {
    type: 'line',
    data: data,
    responsive: true,
    maintainAspectRatio: true,
    options: {}
  };






const Dashboard = () => {

  return (
    <section>
      <section className="page__header">
        <SpeedIcon />
        <h3>Dashboard</h3>
      </section>
      <div className="s-divider"></div>
      <section style={{display: 'flex'}}>
          <div className="stat w-250px m45">
        <div className="w-100">
          <div className="right__sub s-divider">
            <h3 className="stat__value">{currency(49028400)}</h3>
            <p className="sub__title">Total Income this Month</p>
          </div>
          <div className="right__sub">
            <h3 className="stat__value c-success">{currency(48400)}</h3>
            <p className="sub__title">Total Income this Today</p>
          </div>
        </div>
        </div>

        <div className="stat m45">
        <div className="left__stat d-block">
        
        <div className="right__sub s-divider">
            <h3 className="stat__value c-success">83</h3>
            <p className="sub__title">Active Buses</p>
          </div>
          <div className="right__sub">
            <h3 className="stat__value c-error">20</h3>
            <p className="sub__title">Inactive Buses</p>
          </div>


        </div>
        <div className="right__stat">
        <div className="right__sub">
            <h3 className="stat__value">28400</h3>
            <p className="sub__title">Total Passengere Today</p>
          </div>

          
        </div>

       
        </div>
      </section>

      <section className="flex-container alc p-y my-40">
        <div className="">
          <input
            type="text"
            className="search__bar w-200"
            placeholder="Search by name or ID"
          />
          
        </div>
        <div className="">
          <button className="btn btn-primary p-25">Add Officer</button>
        </div>
      </section>

     



     <section className="big__graph" id="myChart">
     <Line options={config} data={data} />
     </section>
    </section>
  );
};

export default Dashboard;
