import React, { Fragment } from "react";
import { string, object, func } from "prop-types";
import { connect } from "react-redux";

export const WorkflowTitle = ({
  userState,
  workflowTitle,
  workflowType,
  //openCtbModal,
}) => {

    return (
        <Fragment>
          {
            //enableWorkflowToggle && workflowType && workflowTitle ?
              <button id="ctb-workflow-toggle-btn"
                className="usa-button ctb-sidebar-btn"
                //onClick={toggleWorkflowType}
              >
                { workflowTitle }
                <div className="ctb-workflow-info">(Click to switch to Workflow)</div>
              </button> 
            //   :
            //   <div className="ctb-workflow-title ctb-info-box">
            //     { workflowTitle || "Loading..." }
            //   </div>
          }
        </Fragment>
      );
};

WorkflowTitle.propTypes = {
    // Redux State
    userState: object.isRequired,
    workflowTitle: string.isRequired,
    workflowType: string,
    // Dispatch Functions
    //openCtbModal: func.isRequired,
  };
  
  const mapStateToProps = (state) => ({
    userState: state.userState,
    workflowTitle: state.workflowList.title,
    workflowType: state.workflowList.type,
  });
  
  export default connect(mapStateToProps, {
    //openCtbModal,
  })(WorkflowTitle);