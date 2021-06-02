import React, { Component } from "react";
import { string, bool } from "prop-types";
import { connect } from "react-redux";
import moment from "moment";
import { FaCheck } from "react-icons/fa";
import { CTB_DATE_FMT } from "../../constants";

export class PatientInfo extends Component {

    getVeteranName = () => {
        const {
          patientFirstName,
          patientLastName,
        } = this.props;
    
        if (patientFirstName && patientLastName) {
          return `${patientLastName}, ${patientFirstName}`;
        }
    
        return "Not Available";
    }

    getDob = () => {
        const {
          patientDob,
        } = this.props;
    
        if (patientDob) {
          const dob = moment(this.props.patientDob, CTB_DATE_FMT);
          const age = moment().diff(dob, "years", false);
    
          return `${dob.format("MMM D, YYYY")} (${age})`;
        }
    
        return "Not Available";
      
    }
    
    getSsn = () => {
    const {
        patientSsn,
    } = this.props;

    if (patientSsn) {
        const ssn = this.props.patientSsn;

        return "***-**-" + ssn.substr(ssn.length-4, ssn.length-1);
    }

    return "Not Available";
    }

    render () {
        const {
          urgentElig,
        } = this.props;
    
        return (
          <div className="ctb-consult-info-section grid-col-auto grid-col-ptinfo">
            <div className="ctb-vet-name-wrapper">
              <h4>Veteran Name</h4>
              <span className="ctb-info ctb-main-info ctb-vet-name">{this.getVeteranName()}</span>
            </div>
            {
              urgentElig &&
                <div className="ctb-urgent-elig-wrapper">
                  <FaCheck className="ctb-urgent-elig-check" />
                  <span className="ctb-info ctb-urgent-elig">Urgent Care Eligible</span>
                </div>
            }
            <div className="ctb-pt-info-bottom-row grid-row">
              <div className="grid-col-auto ctb-vet-dob-wrapper">
                <h4>Date of Birth</h4>
                <span className="ctb-info ctb-vet-dob">{this.getDob()}</span>
              </div>
              <div className="grid-col-auto ctb-vet-ssn-wrapper">
                <h4>SSN</h4>
                <span className="ctb-info ctb-vet-ssn">{this.getSsn()}</span>
              </div>
            </div>
          </div>
        );
      }
}

PatientInfo.propTypes = {
    // Redux State
    patientFirstName: string.isRequired,
    patientLastName: string.isRequired,
    patientDob: string.isRequired,
    patientSsn: string.isRequired,
    urgentElig: bool,
  };
  
  const mapStateToProps = (state) => ({
    patientFirstName: state.consultInfo.patientFirstName,
    patientLastName: state.consultInfo.patientLastName,
    patientDob: state.consultInfo.patientDob,
    patientSsn: state.consultInfo.patientSsn,
    urgentElig: state.eligibility.urgentElig,
  });

export default connect(mapStateToProps)(PatientInfo);