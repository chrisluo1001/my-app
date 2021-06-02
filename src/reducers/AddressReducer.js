/* eslint-disable no-case-declarations */
import initialState from "./initialState";
import { SET_ADDRESS } from "../constants/ActionTypes";

const AddressReducer = (state=initialState.address, action) => {
  switch (action.type) {
    case SET_ADDRESS:
      return {
        ...action.address,
      };
    default:
      return {
        ...state,
      };
  }
};

export default AddressReducer;
