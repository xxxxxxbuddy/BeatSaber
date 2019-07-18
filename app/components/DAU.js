import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import styles from './DAU.css'
import Chart from 'chart.js';
const storage = require('electron-json-storage');
import { GetLoginCount } from '../api/index';
import { dialog } from 'electron';

export default class DAU extends React.Component {

  constructor(props) {
    super(props);
  }

componentDidMount() {
  this.RenderChart();
}

 RenderChart() {
  storage.get('chartData', (err, data) => {
    if(err) {
      dialog.showErrorBox("错误", err.message);
      this.props.history.go(-1);
      return;
    }
    this.setState({
      isChartRendered: false,
      data: data.data,
      labels: data.labels
    })
  })
    var ctx = 'DAU';
    setTimeout(() => {
      try {
        var myChart = new Chart(ctx, {
          type: 'line',
          data: {
              labels: this.state.labels,
              datasets: [{
                  label: 'DAU',
                  data: this.state.data,
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
      } catch (err) {
        console.log('ERROR:' + err);
      }
    }, 500);
  }

  render () {

    return (
      <div>
        <canvas id="DAU" width="400" height="300"></canvas>
        {/* <ErrModal></ErrModal> */}
      </div>
    )
  }
}


// let ErrModal = (err) => {
//   const {isErrModalShow, setErrModal} = useState(false);
//   const handleClose = () => setErrModal(false);
//   const showErrModal = () => setErrModal(true);
//   showErrModal();

//   return(
//     <Modal show={isErrModalShow} onHide={handleClose}>
//       <Modal.Header closeButton>
//         <Modal.Title>读取数据失败</Modal.Title>
//       </Modal.Header>
//       <Modal.Body>{err}</Modal.Body>
//       <Modal.Footer>
//         <Button variant="secondary" onClick={this.getData}>
//           重新获取
//         </Button>
//         <Button variant="secondary" onClick={handleClose}>
//           关闭
//         </Button>
//       </Modal.Footer>
//     </Modal>
//   )
// }


