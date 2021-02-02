import React, { Component } from 'react';
import { useState } from 'react';
import logo from './logo.svg';
import './App.css';

import Jumbotron from 'react-bootstrap/Jumbotron';
import Toast from 'react-bootstrap/Toast';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import AlertBox from './AlertBox';
import ModalHelp from './ModalHelp';
//import { Counter } from '../redux/Counter';
import Header from "./header/header";

class App extends React.Component {

  render() {
    return (
      <div className="app">
        <Header />
      </div>
    );
  }
}
export default App;

