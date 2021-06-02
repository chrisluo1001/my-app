/* eslint-disable no-case-declarations */
import initialState from "./initialState";
import { UPDATE_ELIGIBILITY } from "../constants/ActionTypes";

const ConsultInfoReducer = (state=initialState.eligibility, action) => {
  switch (action.type) {
    case UPDATE_ELIGIBILITY:
      return {
        ...state,
        ...action.eligibility,
      };
    default:
      return {
        ...state,
      };
  }
};

export default ConsultInfoReducer;
