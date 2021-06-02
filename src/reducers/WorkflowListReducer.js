/* eslint-disable no-case-declarations */
import initialState from "./initialState";
import { SET_WORKFLOW_LIST } from "../constants/ActionTypes";

const WorkflowListReducer = (state=initialState.workflowList, action) => {
  switch (action.type) {
    case SET_WORKFLOW_LIST:
      return {
        ...action.workflowList,
      };
    default:
      return state;
  }
};

export default WorkflowListReducer;
