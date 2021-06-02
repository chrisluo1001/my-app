import React, { Component } from "react";
import { string, object, func } from "prop-types";
import { connect } from "react-redux";
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
import ConsultInfoBar from "./consult-info-bar/ConsultInfoBar";
import Sidebar from "./sidebar/Sidebar";
import MainContent from "./main-content/MainContent";
import {
  setDstId,
  loadInfo,
  // closeCtbModal,
} from "../actions";

class App extends React.Component {

  componentDidMount() {
    // const {
    //   dstIdFromUri,
    // } = this.props;
    console.log(this.props);
    var dstIdFromUri = "8073c182-e2cd-46d2-afba-853f5e1d0e92";
    this.props.setDstId(dstIdFromUri);
    this.props.loadInfo(dstIdFromUri);
  }

  render() {

    return (
      <div className="app">
      {/* <div className="app" aria-hidden={isAnyModalOpen} tabIndex={curTabIndex}> */}
        <Header />
        <div className="grid-row">
          <ConsultInfoBar />
        </div>
        <div className="grid-row ctb-app-content">
          <Sidebar />
          <MainContent />
        </div>
        {/* <CtbModal
          isOpen={ctbModal.isModalOpen}
          header={ctbModal.header}
          bodyMsg={ctbModal.bodyMsg}
          closeModal={closeCtbModal}
          onClose={ctbModal.onClose}
          options={ctbModal.options}
          customFooter={ctbModal.customFooter}
          footerText={ctbModal.footerText}
          footerAlert={ctbModal.footerAlert}
        />
        {/* PLEASE NOTE: The following modal is a unique case, new modals should not be added here, rather the CTB Modal should be used where possible. */}
        {/* <VaCcModal />  */}
      </div>
    );
  }
}

App.propTypes = {
  dstIdFromUri: string.isRequired,
  // Redux state
  ctbModal: object,
  // Dispatch Functions
  setDstId: func.isRequired,
  loadInfo: func.isRequired,
  closeCtbModal: func.isRequired,
};

const mapStateToProps = (state) => ({
  //ctbModal: state.ctbModal,
});

export default connect(
  mapStateToProps,
  {
    setDstId,
    loadInfo,
    // closeCtbModal,
  }
)(App);


