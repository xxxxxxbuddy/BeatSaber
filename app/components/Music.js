import React from 'react';
import { Table, Button, ProgressBar, Modal } from 'react-bootstrap';
import Chart from 'chart.js';
import styles from './Music.css';
import { GetRankByMusicID, GetPopularity, GetPlayerRecord } from '../api';

let music;

let style = {
  changeBtn: {
    marginRight: '10px',
    padding: '.075rem .75rem'
  },
  delBtn: {
    padding: '.075rem .75rem'
  },
  progress: {
    border: '1px solid grey',
    height: '1.4rem'
  }
};


export default class Music extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      i: 1,
      music: this.props.match.params[0].slice(0, this.props.match.params[0].indexOf('&')),
      musicName: this.props.match.params[0].slice(this.props.match.params[0].indexOf('&') + 1),
      list: [],
      modalShow: false
    }
  }

  componentDidMount() {
    this.getList(this.state.music);
    window.addEventListener('hashchange', () => {
      this.getList(this.props.match.params[0]);
      this.setState({
        i: 0
      })
    })
  }

  getList(musicID) {
    GetRankByMusicID(parseInt(musicID)).then(res => {
      if(res.data.code === 1){
        this.setState({
          list: res.data.result
        })
      }else {
        console.log(res.data.errMsg);
      }
    }).catch(err => {
      console.log(err);
    })
  };

  getData(PlayerID) {
    GetPlayerRecord(PlayerID, this.state.music).then(res => {
      this.setState({
        data: res.data.result.map(item => item.Score),
        labels: res.data.result.map(item => item.RecordTime.slice(0, 10) + ' ' + item.RecordTime.slice(11))
      })
      this.renderChart(this.state.data, this.state.labels)
    })
  }

  renderChart(data, labels) {
    let ctx = 'ScoresBar';
    this.setState({
      modalShow: true
    })
    try {
      var myChart = new Chart(ctx, {
      type: 'line',
      data: {
          labels: labels,
          datasets: [{
              label: '积分曲线',
              data: data,
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
  }

  render () {
    return (
      <div className={styles.tableContainer}>
        <h3 className={styles.music}>歌曲名：{this.state.musicName}</h3>

        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Rank</th>
              <th>ID</th>
              <th>Progress</th>
              <th>Score</th>
              <th>UpdateTime</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.state.list.map(item => {
              return (
                <tr key={item.PlayerID} onClick={() => this.getData(item.PlayerID)}>
                  <td>{this.state.list.indexOf(item) + 1}</td>
                  <td>{item.PlayerID}</td>
                  <td>
                    <ProgressBar now={item.Progress} label={`${item.Progress}%`} animated style={style.progress} />
                  </td>
                  <td>{item.Score}</td>
                  <td>{new Date(item.RecordTime).toLocaleString()}</td>
                  <td>
                    <Button variant="secondary" style={style.changeBtn}>修改</Button>
                    <Button variant="danger" style={style.delBtn}>删除</Button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </Table>
        <Modal
        show={this.state.modalShow}
        onHide={() => this.setState({modalShow: false})}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            积分曲线
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <canvas id="ScoresBar" width="400" height="300" />
        </Modal.Body>
      </Modal>
      </div>
    )
  }
}
