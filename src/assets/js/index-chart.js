(function($) {
  'use strict';
//Line Chart
var ctx = document.getElementById('line-chart').getContext("2d");
var gradientStroke = ctx.createLinearGradient(0, 0, 0, 450);
gradientStroke.addColorStop(0, '#000000');

var gradientFill = ctx.createLinearGradient(0, 0, 0, 450);
gradientFill.addColorStop(0, "#45e34585");
gradientFill.addColorStop(1, "#45e34585");

// all data
var data_1 = [1800, 1600, 2300, 2800, 3600, 2900, 3000, 3800, 3600];
var data_2 = [4100, 3800, 3200, 3400, 2700, 2600, 3300, 3000, 2900];
var labels = ["Jan-11", "Jan-12", "Jan-13", "Jan-14", "Jan-15", "Jan-16", "Jan-17","Jan-18", "Jan-19"];

var lineChart = new Chart(ctx, {
  type: 'line',
  data: {
      labels: labels,
      datasets: [{

          label: "Orders",
          borderColor: gradientStroke,
          pointBorderColor: gradientStroke,
          pointBackgroundColor: gradientStroke,
          pointHoverBackgroundColor: gradientStroke,
          pointHoverBorderColor: gradientStroke,
          pointBorderWidth: 1,
          pointHoverRadius: 4,
          pointHoverBorderWidth: 1,
          pointRadius: 2,
          fill: true,
          backgroundColor: gradientFill,
          borderWidth: 1,
          data: data_1
      }]
  },
  options: {
      legend: {
      display: true,


      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: "rgba(0,0,0,0.5)",
            fontStyle: "bold",
            beginAtZero: true,
            maxTicksLimit: 200,
            padding: 20
          },
          gridLines: {
            drawTicks: false,
            display: false
          }

      }],
      xAxes: [{
          gridLines: {
            zeroLineColor: "transparent"
          },
          ticks: {
            padding: 20,
            fontColor: "rgba(0,0,0,0.5)",
            fontStyle: "bold"
          }
      }]
    }
  }
});

// Bar chart
var barChart = new Chart(document.getElementById("bar-chart"), {
    type: 'bar',
    data: {
      labels: ["January", "February", "March", "April", "May"],
      datasets: [
        {
          label: "Orders",
          backgroundColor: ["#268968", "#ea6e27","#268968","#ea6e27","#268968"],
          data: [2478,5267,1734,3384,1433]
        }
      ]
    },
    options: {
      legend: { display: false },
      title: {
        display: true,
        text: 'Orders In 2020'
      }
    }
});

/* Engaged Users */
$(function(){
  if($('canvas').is('#engaged-users')){
var engagedUsersCtx = document.getElementById('engaged-users').getContext("2d");
var gradientStrokeengagedUsers = engagedUsersCtx.createLinearGradient(0, 0, 0, 450);
gradientStrokeengagedUsers.addColorStop(0, '#07be6e');

var gradientFillengagedUsers = engagedUsersCtx.createLinearGradient(0, 0, 0, 450);
gradientFillengagedUsers.addColorStop(0, "rgba(7, 190, 110,0.3)");
gradientFillengagedUsers.addColorStop(1, "rgba(255,255,255,0)");

new Chart(engagedUsersCtx, {
  type: 'line',
  data: {
      labels: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20],
      datasets: [{
          label: "Data",
          borderColor: gradientStrokeengagedUsers,
          pointBorderColor: gradientStrokeengagedUsers,
          pointBackgroundColor: gradientStrokeengagedUsers,
          pointHoverBackgroundColor: gradientStrokeengagedUsers,
          pointHoverBorderColor: gradientStrokeengagedUsers,
          pointBorderWidth: 0,
          pointHoverRadius: 0,
          pointHoverBorderWidth: 0,
          pointRadius: 0,
          fill: true,
          backgroundColor: gradientFillengagedUsers,
          borderWidth: 2,
          data: [5,1,8,1,3,7,8,4,3,6,8,9,4,5,8,2,6,4,8,3]
      }]
  },
  options: {
      elements: {
        line: {
            tension: 0
        }
      },
      legend: {
      display: false,
      position: "bottom"
      },
      scales: {
        yAxes: [{
          display: false,
        }],
        xAxes: [{
            display: false,
        }]
      }
    }
});
}
});

/* Page Impressions */
$(function(){
  if($('canvas').is('#page-impressions')){
var pageImpressionsCtx = document.getElementById('page-impressions').getContext("2d");
var gradientStrokepageImpressions = pageImpressionsCtx.createLinearGradient(0, 0, 0, 450);
gradientStrokepageImpressions.addColorStop(0, '#07be6e');

var gradientFillpageImpressions = pageImpressionsCtx.createLinearGradient(0, 0, 0, 450);
gradientFillpageImpressions.addColorStop(0, "rgba(7, 190, 110,0.3)");
gradientFillpageImpressions.addColorStop(1, "rgba(255,255,255,0)");

new Chart(pageImpressionsCtx, {
  type: 'line',
  data: {
      labels: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20],
      datasets: [{
          label: "Data",
          borderColor: gradientStrokepageImpressions,
          pointBorderColor: gradientStrokepageImpressions,
          pointBackgroundColor: gradientStrokepageImpressions,
          pointHoverBackgroundColor: gradientStrokepageImpressions,
          pointHoverBorderColor: gradientStrokepageImpressions,
          pointBorderWidth: 0,
          pointHoverRadius: 0,
          pointHoverBorderWidth: 0,
          pointRadius: 0,
          fill: true,
          backgroundColor: gradientFillpageImpressions,
          borderWidth: 2,
          data: [8,5,1,8,5,9,4,3,4,5,8,4,4,8,9,5,5,1,3,6]
      }]
  },
  options: {
      elements: {
        line: {
            tension: 0
        }
      },
      legend: {
      display: false,
      position: "bottom"
      },
      scales: {
        yAxes: [{
          display: false,
        }],
        xAxes: [{
            display: false,
        }]
      }
    }
});
}
});

})(jQuery);
