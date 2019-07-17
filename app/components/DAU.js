import React from 'react';
import styles from './DAU.css'
import Chart from 'chart.js';


export default class DAU extends React.Component {

  getLabels() {
    let today = new Date();
    let labels = [];

    for(let i = 0; i < 7; i++) {
      let day = new Date(today - 86400000 * i);
      labels.unshift(day.getMonth() + '-' + today.getDay());
    }

    return labels;
  }

  getData() {
    // TODO: 通过接口获取过去七天的数据

    return [12, 19, 3, 5, 2, 3, 7];
  }

  render () {
    setTimeout(() => {
      var ctx = 'DAU';
    var myChart = new Chart(ctx, {
      type: 'line',
      data: {
          labels: this.getLabels(),
          datasets: [{
              label: 'DAU',
              data: this.getData(),
              borderWidth: 2,
              borderColor: '#026FF3',
              backgroundColor: 'rgba(255, 255, 255, 0)',
              fill: false,
              lineTension: 0,
              pointBackgroundColor: '#026FF3'
          }]

      },
      options: {
          scales: {
              yAxes: [{
                  ticks: {
                      beginAtZero: true
                  }
              }]
          }
      }
    });
    }, 100);
    return (
      <div>
        <canvas id="DAU" width="400" height="300"></canvas>
      </div>
    )
  }
}
