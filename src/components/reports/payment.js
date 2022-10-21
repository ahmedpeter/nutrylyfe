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
      label: 'Weekly Payment Report',
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
    options: {
        plugins: {
            legend: {
                display: true,
                boxWidth: 10,
                boxHeight: 10,
                labels: {
                    color: 'red'
                }
            }
        }
    },
    
  };






const PaymentReport = () => {

  return (
    <section>
      <section className="page__header">
        <SpeedIcon />
        <h3>Dashboard</h3>
      </section>
      <div className="s-divider"></div>
      <section style={{display: 'flex'}}>
         

        <div className="stat m45">
        <div className="left__stat d-block">
        
        <div className="right__sub s-divider">
            <h3 className="stat__value">82,872,883</h3>
            <p className="sub__title">otal income last year</p>
          </div>
          <div className="right__sub">
            <h3 className="stat__value c-success">82,872,883</h3>
            <p className="sub__title">Total income this year</p>
          </div>


        </div>
        <div className="right__stat">
        <div className="right__sub">
            <h3 className="stat__value">28400</h3>
            <p className="sub__title">Income this Month</p>
          </div>

          
        </div>

       
        </div>
      </section>

      <section className="flex-container alc p-y my-40">
        
      </section>

     



     <section className="big__graph" id="myChart">
     <div className="">
          <input
            type="text"
            className="search__bar w-200"
            placeholder="This Week"
          />
          
        </div>


     <Line options={config} data={data} />
     </section>
    </section>
  );
};

export default PaymentReport;
