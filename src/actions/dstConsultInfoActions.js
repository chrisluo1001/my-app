import api from "../api";
import { SET_DST_CONSULT_INFO } from "../constants/ActionTypes";

/**
 * Handler to fetch the consult information from the DST API based on the DST ID
 *
 * @param {string} dstId dstId The current DST ID
 */
export const getDstConsultInfo = (dstId) => {
  return (dispatch) => {
    return api.getDstConsultInfo(dstId)
      .then((dstConsultInfo) => {
        dispatch({ type: SET_DST_CONSULT_INFO, dstConsultInfo });
      });
  };
};
