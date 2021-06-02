import moment from "moment";
import api from "../api";
import { SET_CONSULT_INFO } from "../constants/ActionTypes";
import { CTB_DATE_FMT } from "../constants";

const formatDate = (date) => {
  return date ? moment.utc(date).format(CTB_DATE_FMT) : "";
};

const formatConsultHistory = (consultHistory = "") => {
  let formattedConsultHistory = consultHistory.replace(/(\\\\r\\\\n)/g, "\r\n");

  formattedConsultHistory = formattedConsultHistory.replace(/(\\r\\n)/g, "\r\n");
  formattedConsultHistory = formattedConsultHistory.replace(/\\r/g, "\r\n");
  formattedConsultHistory = formattedConsultHistory.replace(/\\n/g, "\r\n");

  return formattedConsultHistory;
};

const formatConsultInfo = (consultInfo) => {
  const {
    lastUpdateDate,
    dst_id,
    workflow,
    consult_service,
    urgency,
    cid,
    patient_first_name,
    patient_middle_name,
    patient_last_name,
    patient_dob,
    patient_ssn,
    patient_icn,
    provider_key,
    site_id,
    user_id,
    outpatient,
    consult_history,
  } = consultInfo;

  return ({
    lastUpdateDate,
    dstId: dst_id,
    workflow,
    consultService: consult_service,
    urgency,
    cid: formatDate(cid),
    patientFirstName: patient_first_name,
    patientMiddleName: patient_middle_name,
    patientLastName: patient_last_name,
    patientDob: formatDate(patient_dob),
    patientSsn: patient_ssn,
    patientIcn: patient_icn,
    providerKey: provider_key,
    siteId: site_id,
    userId: user_id,
    outpatient,
    consultHistory: formatConsultHistory(consult_history),
  });
};

/**
 * Retrieves the Consult Info from CPRS and adds it to the store.
 *
 * @param {object} consultInfo The consult info from CPRS
 */
export const getConsultInfo = (id) => {
  return (dispatch) => {
    return api.getConsultInfo(id)
      .then((response) => {
        const consultInfo = formatConsultInfo(response);

        dispatch({ type: SET_CONSULT_INFO, consultInfo });

        return consultInfo;
      });
  };
};
