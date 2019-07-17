import React from 'react';
import { Table, Button, ProgressBar } from 'react-bootstrap';
import styles from './Music.css';

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
    music = this.props.match.params[0];
  }

  componentDidMount() {
    window.addEventListener('hashchange', () => {
      music = this.props.match.params[0];
      list = this.getList(music);
    })
  }

  getList(musicID) {

    return [
      {
        Rank: 1,
        ID: "0001",
        Account: "TestAccount1",
        Progress: 60,
        Score: 123455
      },
      {
        Rank: 1,
        ID: "0002",
        Account: "TestAccount1",
        Progress: 60,
        Score: 123455
      },
    ]
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
              <th>Account</th>
              <th>Progress</th>
              <th>Score</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {list.map(item => {
              return (
                <tr key={item.ID}>
                  <td>{item.Rank}</td>
                  <td>{item.ID}</td>
                  <td>{item.Account}</td>
                  <td>
                    <ProgressBar now={now} label={`${now}%`} animated style={style.progress} />
                  </td>
                  <td>{item.Score}</td>
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
