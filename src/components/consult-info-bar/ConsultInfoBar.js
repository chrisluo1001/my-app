import React from "react";
import PatientInfo from "./PatientInfo";
import PatientAddress from "./PatientAddress";
// import ConsultInfo from "./ConsultInfo";
// import CCEligibilityInfo from "./CCEligibilityInfo";

const ConsultInfoBar = () => (
  <div className="ctb-consult-info ctb-info-box grid-row">
    <PatientInfo />
    <PatientAddress />
    {/* <ConsultInfo />
    <CCEligibilityInfo />  */}
  </div>
);

export default ConsultInfoBar;
