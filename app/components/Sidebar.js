import React from 'react';
import { Nav, NavDropdown } from 'react-bootstrap';
import styles from './Sidebar.css';
import { GetPopularity } from '../api';
const Logo = require('../../resources/icons/BSLogo.png');


export default class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      musicInfo: []
    }
  }

  componentDidMount() {
    GetPopularity().then(res => {
      if(res.data.code === 1) {
        this.setState({musicInfo: res.data.result})
      }
    })
  }


  render () {
    return (
      <Nav defaultActiveKey="/" className={styles.sidebar}>
        <Nav.Link><img className={styles.logo} src={Logo}></img></Nav.Link>
        <Nav.Link href="#/admin/" className={styles.navLink}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.feather}><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>
          DAU
        </Nav.Link>
        <Nav.Link href="#/admin/players" eventKey="players" className={styles.navLink}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.feather}><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
          玩家信息
        </Nav.Link>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.fixsvg}><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>
        <NavDropdown title="曲目列表" id="nav-dropdown" className={styles.offsetLeft}>
          {this.state.musicInfo.map(music => {
            return(
              <NavDropdown.Item href={"#/admin/music/" + music.MusicID} eventKey={music.MusicID} key={music.MusicID}>{music.MusicName}</NavDropdown.Item>
            )
          })}
        </NavDropdown>
        {/* <Nav.Link eventKey="music">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className={styles.feather}><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>
          曲目列表</Nav.Link> */}
      </Nav>
    )
  }
}
