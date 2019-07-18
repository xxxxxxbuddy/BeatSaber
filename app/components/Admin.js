import React from 'react';
import { BrowserRouter, Switch, Route, Redirect, HashRouter } from 'react-router-dom'
import { Container, Row, Col, Nav } from 'react-bootstrap';
import Sidebar from './Sidebar';
import DAU from './DAU';
import Hot from './MusicHot';
import styles from './Admin.css';
import Players from './Players';
import Music from './Music';

export default class Admin extends React.Component {
  render () {
    return (
      <HashRouter basename="/admin">
        <Container className={styles.container}>
          <Row>
            <Col md={2} className={styles.sidebar}>
              <Route component={Sidebar}></Route>
            </Col>
            <Col md={9} className={styles.main}>
              <Route exact path="/" component={DAU}></Route>
              <Route path="/players" component={Players}></Route>
              <Route path="/hot" component={Hot}></Route>              
              <Route path="/music/*" component={Music}></Route>
            </Col>
          </Row>
        </Container>
      </HashRouter>
    );
  }
}
