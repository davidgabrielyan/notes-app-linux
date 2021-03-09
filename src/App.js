import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import NavBar from './Components/NavBar';
import Main from './Components/Main';
import './App.css';

class App extends React.Component {
  render() {
    return (
      <Container className='container'>
        <Row className='root-row'>
          <Col sm={1} className='navbar-col'>
            <NavBar />
          </Col>
          <Col sm={11}>
            <Main />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default App;
