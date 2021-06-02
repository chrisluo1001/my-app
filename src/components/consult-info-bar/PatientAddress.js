import React, { Fragment } from "react";
import { string } from "prop-types";
import { connect } from "react-redux";

export const PatientAddress = ({
  addrLine1,
  addrLine2,
}) => (
  <div className="ctb-consult-info-section grid-col-auto grid-col-ptaddr">
    <h4>Residential Address</h4>
    {
      addrLine1 && addrLine2 ?
        (
          <Fragment>
            <div className="ctb-info ctb-vet-addr1">{addrLine1}</div>
            <div className="ctb-info ctb-vet-addr2">{addrLine2}</div>
          </Fragment>
        ) :
        (
          <div className="ctb-info ctb-vet-addr1">No address available</div>
        )
    }
  </div>
);

PatientAddress.propTypes = {
    addrLine1: string.isRequired,
    addrLine2: string.isRequired,
};

const mapStateToProps = (state) => ({
    addrLine1: state.address.line1,
    addrLine2: state.address.line2,
});


export default connect(mapStateToProps)(PatientAddress);