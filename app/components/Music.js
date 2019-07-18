import React from 'react';
import { Table, Button, ProgressBar } from 'react-bootstrap';
import styles from './Music.css';
import { GetRankByMusicID, GetPopularity } from '../api';

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
let now = 60;
let list = [];
export default class Music extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      i: 1,
      music: this.props.match.params[0],
      list: []
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

  render () {
    return (
      <div className={styles.tableContainer}>
        <h2 className={styles.music}>歌曲名：{music}</h2>

        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Rank</th>
              <th>ID</th>
              <th>Progress</th>
              <th>UpdateTime</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.state.list.map(item => {
              return (
                <tr key={item.PlayerID}>
                  <td>{this.state.list.indexOf(item) + 1}</td>
                  <td>{item.PlayerID}</td>
                  <td>
                    <ProgressBar now={item.Progress} label={`${item.Progress}%`} animated style={style.progress} />
                  </td>
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
      </div>
    )
  }
}
