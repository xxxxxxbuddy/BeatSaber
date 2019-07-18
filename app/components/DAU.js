import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import styles from './DAU.css'
import Chart from 'chart.js';
import { GetLoginCount } from '../api/index';

export default class DAU extends React.Component {

  constructor(props) {
    super(props);
    this.labels = [];
    this.data = [];
    this.errMsg = '';
    this.isChartRendered = false;
  }

  getData() {
    let res = [];
    GetLoginCount().then(
      res => {
        if (res.data.code === 1) {
          res.data.result.forEach(item => {
            this.labels.push(item.TheDate.slice(0, 10));
            this.data.push(item.LoginCount);
          })
        } else {
         //  this.ErrModal(res.data.errMsg);
        }
      }
    )
  }
 
  componentWillMount() {
    this.getData();
  }

  componentWillUpdate() {
    this.getData();
  }


  render () {
    if(!this.isChartRendered) {
      setTimeout(() => {
        var ctx = 'DAU';
        try {
          var myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: this.labels,
                datasets: [{
                    label: 'DAU',
                    data: this.data,
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
        this.isChartRendered = true;
      }, 500);    
    }

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