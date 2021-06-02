import React, { Fragment } from "react";
import { bool } from "prop-types";
import { connect } from "react-redux";
import Navigation from "./Navigation";
import DoneButton from "./DoneButton";
import WorkflowTitle from "./WorkflowTitle";

const Sidebar = ({ noAction }) => (
  <div className="ctb-sidebar grid-col-auto">
    <WorkflowTitle />
    <Navigation />
    {/* <Navigation /> */}
    { !noAction &&
      <Fragment>
        <DoneButton />
      </Fragment>
    }
  </div>
);

Sidebar.propTypes = {
  noAction: bool,
};

const mapStateToProps = (state) => {
  const props = { noAction: state.workflowList.noAction };
  return props;
};

export default connect(mapStateToProps)(Sidebar);
