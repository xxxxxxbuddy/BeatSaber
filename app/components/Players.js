import React from 'react';
import { Table, Button } from 'react-bootstrap';
import { GetPlayers } from '../api';
import styles from './Players.css';

let style = {
  changeBtn: {
    marginRight: '10px',
    padding: '.075rem .75rem'
  },
  delBtn: {
    padding: '.075rem .75rem'
  }
};

let players = [];
export default class Players extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      playerLists: [
        {
          ID: '1',
          PlayerName: '王若昕',
          PSW: '123',
          PlayerState: '0'
        },
        {
          ID: '2',
          PlayerName: '王翀',
          PSW: '123',
          PlayerState: '0'
        },
        {
          ID: '3',
          PlayerName: '张雷',
          PSW: '123',
          PlayerState: '0'
        },
        {
          ID: '4',
          PlayerName: '司马琪',
          PSW: '123',
          PlayerState: '0'
        },
        {
          ID: '5',
          PlayerName: '庄浩城',
          PSW: '123',
          PlayerState: '0'
        },
        {
          ID: '6',
          PlayerName: '郭晶',
          PSW: '123',
          PlayerState: '0'
        },
        {
          ID: '7',
          PlayerName: '李秋媛',
          PSW: '123',
          PlayerState: '0'
        },
        {
          ID: '8',
          PlayerName: 'admin',
          PSW: 'admin',
          PlayerState: '0'
        }
      ]
    }
  }

  componentDidMount() {
    this.getPlayerList();
  }

  getPlayerList() {
    GetPlayers().then(res => {
      let temp = res.data.result.map(item => {
        item.PlayerState = item.PlayerState == 0 ? '离线' : '在线';
        return item;
      })
      this.setState({
        playerLists: temp
      })
    })
  }

  render () {
    return (
      <div className={styles.tableContainer}>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Account</th>
              <th>Password</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
          {this.state.playerLists.map(player => {
              return(
                <tr key={player.PlayerID}>
                  <td>{player.PlayerID}</td>
                  <td>{player.PlayerName}</td>
                  <td>{player.PSW}</td>
                  <td>{player.PlayerState}</td>
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
