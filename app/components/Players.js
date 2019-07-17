import React from 'react';
import { Table, Button } from 'react-bootstrap';
import styles from './Players.css'

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

  componentDidMount() {
    players = this.getPlayerList();
  }

  getPlayerList() {

    return [
      {
        ID: '0001',
        Account: 'TestAccount1',
        Password: 'TestAccount1',
        Status: 'offline'
      },
      {
        ID: '0002',
        Account: 'TestAccount1',
        Password: 'TestAccount1',
        Status: 'offline'
      },
      {
        ID: '0003',
        Account: 'TestAccount1',
        Password: 'TestAccount1',
        Status: 'offline'
      }
    ]
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
          {players.map(player => {
              return(
                <tr key={player.ID}>
                  <td>{player.ID}</td>
                  <td>{player.Account}</td>
                  <td>{player.Password}</td>
                  <td>{player.Status}</td>
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
