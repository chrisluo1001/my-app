import api from "../api";
import { SET_CLINICAL_SERVICES_LIST } from "../constants/ActionTypes";

/**
 * Handler to fetch the Clinical Services List and update the store
 */
export const getClinicalServicesList = () => {
  return (dispatch) => {
    return api.getClinicalServicesList()
      .then((clinicalServicesList) => {
        dispatch({ type: SET_CLINICAL_SERVICES_LIST, clinicalServicesList });

        return clinicalServicesList;
      });
  };
};
