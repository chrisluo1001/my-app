import React from 'react';
import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

import Jumbotron from 'react-bootstrap/Jumbotron';
import Toast from 'react-bootstrap/Toast';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import AlertBox from './AlertBox';
import ModalHelp from './ModalHelp';
import { Counter } from '../redux/Counter';

function App() {
  const [show, toggleShow] = useState(true);
  return (
    <div className="App">
    <Container fluid>
      <Row>
        <Col>{<Button onClick={() => toggleShow(true)}>Show Toast</Button>}</Col>
      </Row>
      <Row>
          <Toast show={show} onClose={() => toggleShow(false)}>
                  <Toast.Header>
                    <strong className="mr-auto">React-Bootstrap</strong>
                  </Toast.Header>
                  <Toast.Body>hello</Toast.Body>
          </Toast>
      </Row>
      <Row>
          <AlertBox />
      </Row>
      <Row>
       <ModalHelp />
      </Row>
      <Row>
        <Counter />
      </Row>
    </Container>
    </div>
  );
}

export default App;
