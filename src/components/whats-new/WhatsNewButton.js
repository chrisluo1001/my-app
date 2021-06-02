import React, { Component } from "react";
import { string, bool, array, func } from "prop-types";
import { connect } from "react-redux";
//import moment from "moment";
import { FaEye } from "react-icons/fa";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

export class WhatsNewButton extends Component {
    state = {
        show:false,
        handleClose: true
    };
    
    openWhatsNew = () => {
        this.setState({
            show:true,
        })
    }

    handleClose = () => {
        this.setState({
            show:false,
        })
    }

    render () {
        const { currWhatsNewDate } = this.props;
        console.log(this.props);
        return (
            <>
            <button
                id="ctb-whats-new-btn"
                aria-label={`Click for What's New with CTB ${currWhatsNewDate}`}
                className="ctb-whats-new-btn"
                title={`Click for What's New with CTB ${currWhatsNewDate}`}
                onClick={ this.openWhatsNew }
            >
                <FaEye className="ctb-whats-new-icon" /><span className="ctb-whats-new-btn-txt">{`What's New ${currWhatsNewDate}`}</span>
            </button>
            <Modal show={this.state.show} onHide={this.handleClose} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.handleClose}>
                    Close
                    </Button>
                    <Button variant="primary" onClick={this.handleClose}>
                    Save Changes
                    </Button>
                </Modal.Footer>
                </Modal>
            </>
        );
      }
}

WhatsNewButton.propTypes = {
    // Redux state
    // hideUntilNew: bool,
    // userWhatsNewDate: string,
    // currWhatsNewDate: string,
    // releases: array,
    // // Dispatch Functions
    // openCtbModal: func.isRequired,
    // closeCtbModal: func.isRequired,
    // hideUntilNewCheckHandler: func.isRequired,
  };
  
  const mapStateToProps = (state) => ({
    // hideUntilNew: state.userState.hideUntilNew,
    // userWhatsNewDate: state.userState.whatsNewDate,
    // currWhatsNewDate: state.whatsNew.whatsNewDate,
    // releases: state.whatsNew.releases,
  });
  
  export default connect(
    mapStateToProps,
    {
    //   openCtbModal,
    //   closeCtbModal,
    //   hideUntilNewCheckHandler,
    }
  )(WhatsNewButton);