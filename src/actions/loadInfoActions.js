import {
    getClinicalServicesList,
    getConsultInfo,
    getDstConsultInfo,
    // getSavedConsultFactors,
  } from ".";
  import api from "../api";
  import { STATIC_ELIG_NOT_FOUND } from "../constants";
  import { SET_CONSULT_INFO } from "../constants/ActionTypes";
  import initialState from "../reducers/initialState";

export const loadInfo = (dstId) => {
    return ((dispatch) => {
        return dispatch(getDstConsultInfo(dstId)).then(
            () => {
                return Promise.all([
                    dispatch(getClinicalServicesList()),
                    dispatch(getConsultInfo(dstId)),
                    //dispatch(getSavedConsultFactors(dstId)),
                  ]).then(([
                    clinicalServicesList,
                    consultInfo,
                    //savedConsultFactors,
                  ]) => {
                    const {
                      patientIcn,
                      userId,
                      workflow,
                    } = consultInfo;
                });
            }
        )
    })
}