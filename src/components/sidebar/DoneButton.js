import React from "react";
import { string, object, func, bool } from "prop-types";
import { connect } from "react-redux";
import {
  openCtbModal,
  addPageErrors,
  setErrors,
  removeErrors,
  saveUserState,
  showInput,
  isDisabled,
} from "../../actions";
// import api from "../../api";
//import { translateToConsultFactors } from "../../consult-translator/consultTranslator";
// import { validate, validateVetCCEligible } from "./utils/sidebarUtils";
// import SaveModal from "../modal/save-modal/SaveModal";
// import ErrorsModal from "../modal/errors-modal/ErrorsModal";
// import SaveModalAlert from "../modal/save-modal/SaveModalAlert";

export const DoneButton = ({
  initialAppState,
  appState,
  eligibility,
  dstId,
  pages,
  validation,
  workflow,
  consultHistory,
  userState,
  validateCCEligible,
  openCtbModal,
  addPageErrors,
  setErrors,
  removeErrors,
  saveUserState,
  showInput,
  isDisabled,
}) => {

  const save = () => {
    saveUserState();

    // const consultFactorsText = translateToConsultFactors(appState, eligibility, workflow, consultHistory, initialAppState, userState);
    // const isValid = validate(pages, appState, initialAppState, validation, addPageErrors, setErrors, showInput, isDisabled);
    // const isValidCCEligible = validateVetCCEligible(validateCCEligible, eligibility.overallElig, appState.participationPref, addPageErrors, removeErrors);
    const modalInfo = {
      header: "Preview of CTB-Generated Consult Comments",
      //bodyMsg: <SaveModal consultFactorsText={consultFactorsText} />,
      //footerAlert: <SaveModalAlert />,
      footerText: "CONTINUE EDITING",
      onClose: () => {
        if (workflow !== "ORDER") {
          //api.deleteConsultFactorText(dstId);
        }
      },
      options: {
        initialFocus: "#react-aria-modal-dialog",
        focusDialog: true,
        dialogClass: "ctb-preview-modal",
      },
    };
    const errorModalInfo = {
      header: "Correct All Errors Before Saving",
      //bodyMsg: <ErrorsModal />,
      footerText: "CLOSE",
      options: {
        initialFocus: "#react-aria-modal-dialog",
        focusDialog: true,
        dialogClass: "ctb-errors-modal",
      },
    };

    // if (isValid && isValidCCEligible) {
    //   api.saveConsultFactorText(dstId, consultFactorsText)
    //     .then(() => {
    //       openCtbModal(modalInfo);
    //     });
    // } else {
    //   openCtbModal(errorModalInfo);
    // }
  };

  return (
    <button
      id="ctb-save-btn"
      className="usa-button ctb-sidebar-btn"
      onClick={save}
    >SAVE CHANGES</button>
  );
};

DoneButton.propTypes = {
  // Redux state
  initialAppState: object.isRequired,
  appState: object.isRequired,
  eligibility: object.isRequired,
  dstId: string.isRequired,
  pages: object.isRequired,
  validation: object.isRequired,
  workflow: string.isRequired,
  consultHistory: string,
  userState: object.isRequired,
  validateCCEligible: bool,
  // Dispatch Functions
  openCtbModal: func.isRequired,
  addPageErrors: func.isRequired,
  setErrors: func.isRequired,
  removeErrors: func.isRequired,
  saveUserState: func.isRequired,
  showInput: func.isRequired,
  isDisabled: func.isRequired,
};

const mapStateToProps = (state) => ({
  // initialAppState: state.initialAppState,
  // appState: state.appState,
  // eligibility: state.eligibility,
  // dstId: state.dstId,
  // pages: state.pages,
  // validation: state.validation,
  // workflow: state.consultInfo.workflow,
  // consultHistory: state.consultInfo.consultHistory,
  // userState: state.userState,
  // validateCCEligible: state.workflowList.validateCCEligible,
});

export default connect(mapStateToProps, {
  // openCtbModal,
  // addPageErrors,
  // setErrors,
  // removeErrors,
  // saveUserState,  
  // showInput,
  // isDisabled,
})(DoneButton);
