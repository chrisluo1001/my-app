/* istanbul ignore file */

import moment from "moment";
import delay from "./delay";
import {
  CTB_DATE_FMT,
  USER_ROLE_PROVIDER,
  CAN_SCORE_NA,
} from "../constants";
import whatsNewJson from "../content/whats-new-ctb.json"; // eslint-disable-line import/extensions
import {
  getWorkflowListByConsultFlag,
  getWorkflowList,
} from "./utils/apiUtils";
import { clinicalServicesList } from "./MockClinicalServicesList";
import { savedConsultFactors } from "./MockSavedConsultFactors";
import {
  consultHistory,
  formattedConsultHistory,
} from "./MockConsultHistory";
import { facilitiesList } from "./MockFacilitiesList";
import { seocsList } from "./MockSeocsList";

class MockCtbApi {

  static getClinicalServicesList() {
    return new Promise((resolve) => {
      resolve(clinicalServicesList);
    });
  }

  static getConsultInfo(dstId) {
    return new Promise((resolve, reject) => {
      if (dstId) {
        setTimeout(() => {
          resolve(consultInfoResponse);
        }, delay);
      } else {
        reject("dstId not provided");
      }
    });
  }

  static getDstConsultInfo(dstId) {
    return new Promise((resolve, reject) => {
      if (dstId) {
        setTimeout(() => {
          resolve(dstConsultInfo);
        }, delay);
      } else {
        reject("dstId not provided");
      }
    });
  }

  static getSavedConsultFactors(dstId) {
    return new Promise((resolve, reject) => {
      if (dstId) {
        setTimeout(() => {
          resolve(savedConsultFactors);
        }, delay);
      } else {
        reject("dstId not provided");
      }
    });
  }

  static getAddrAndElig(icn, dstId) {
    return new Promise((resolve, reject) => {
      if (icn) {
        setTimeout(() => {
          resolve(eligAddr);
        }, delay);
      } else {
        reject("icn not provided");
      }
    });
  }

  static getFacilitiesList(address, svcName, stopCode) {
    return new Promise((resolve, reject) => {
      if (address && svcName && stopCode) {
        setTimeout(() => {
          resolve(facilitiesList);
        }, delay);
      } else {
        reject("address, svcName, or stopCode not provided");
      }
    });
  }

  static getSeocsList(svcName) {
    return new Promise((resolve, reject) => {
      if (svcName) {
        setTimeout(() => {
          resolve(seocsList);
        }, delay);
      } else {
        reject("svcName not provided");
      }
    });
  }

  static saveConsultFactorText(dstId, consultFactorText) {
    return new Promise((resolve, reject) => {
      if (dstId && consultFactorText) {
        setTimeout(() => {
          resolve();
        }, delay);
      } else {
        reject("dstId or consultFactorText not provided");
      }
    });
  }

  static deleteConsultFactorText(dstId) {
    return new Promise((resolve, reject) => {
      if (dstId) {
        setTimeout(() => {
          resolve();
        }, delay);
      } else {
        reject("dstId not provided");
      }
    });
  }

  static getUserState(userId) {
    return new Promise((resolve, reject) => {
      if (userId) {
        setTimeout(() => {
          resolve(defaultUserStateResponse);
        }, delay);
      } else {
        reject({});
      }
    });
  }

  static saveUserState(userStateSavePayload) {
    return new Promise((resolve, reject) => {
      if (userStateSavePayload) {
        resolve();
      } else {
        reject("userStateSavePayload not provided");
      }
    });
  }

  static getCANScore(patientIcn, userId) {
    return new Promise((resolve, reject) => {
      if (patientIcn && userId) {
        setTimeout(() => {
          resolve(canScoreResponse);
        }, delay);
      } else {
        const defaultCANScore = {
          CanScore: {
            cevent_1y: CAN_SCORE_NA,
            riskDate: CAN_SCORE_NA,
          },
        };

        resolve(defaultCANScore);
      }
    });
  }

  static getWhatsNewContent() {
    return new Promise((resolve) => {
      resolve(whatsNewJson);
    });
  }

  static getWorkflowListByConsultFlag(workflow, consultName, inpatient, isAdmin, basic, ccConsult) {
    return new Promise((resolve, reject) => {
      if (workflow) {
        setTimeout(() => {
          resolve(getWorkflowListByConsultFlag(workflow, consultName, inpatient, isAdmin, basic, ccConsult));
        }, delay);
      } else {
        reject("workflow not provided");
      }
    });
  }

  static getWorkflowList(workflow, consultName, inpatient, type, isAdmin, basic) {
    return new Promise((resolve, reject) => {
      if (workflow) {
        setTimeout(() => {
          resolve(getWorkflowList(workflow, consultName, inpatient, type, isAdmin, basic));
        }, delay);
      } else {
        reject("workflow not provided");
      }
    });
  }
}

export const dstId = "8073c182-e2cd-46d2-afba-853f5e1d0e92";

export const consultInfoResponse = {
  lastUpdateDate: "",
  dst_id: dstId,
  workflow: "TEST",
  consult_service: "Audiology Consult",
  urgency: "Special Instructions",
  cid: "2020-01-19T00:00:00.000+0000",
  nltd: "2020-02-12T00:00:00.000+0000",
  patient_first_name: "One",
  patient_middle_name: "T",
  patient_last_name: "CTBPatient",
  patient_dob: "1960-01-01T00:00:00.000+0000",
  patient_ssn: "1111111111",
  patient_icn: "1008668815V929047",
  provider_key: true,
  site_id: "12345",
  user_id: "TESTUSER",
  outpatient: true,
  consult_history: consultHistory,
};

const {
  cid,
  patient_dob,
} = consultInfoResponse;

export const formatConsultInfoResponse = {
  lastUpdateDate: "",
  dstId,
  workflow: "ORDER",
  consultService: "Audiology Consult",
  urgency: "Special Instructions",
  cid: moment.utc(cid).format(CTB_DATE_FMT),
  patientFirstName: "One",
  patientMiddleName: "T",
  patientLastName: "CTBPatient",
  patientDob: moment.utc(patient_dob).format(CTB_DATE_FMT),
  patientSsn: "1111111111",
  patientIcn: "1008668815V929047",
  providerKey: true,
  siteId: "12345",
  userId: "TESTUSER",
  outpatient: true,
  consultHistory: formattedConsultHistory,
};

export const consultInfo = {
  lastUpdateDate: "",
  dstId,
  workflow: "ORDER",
  consultService: "Audiology Consult",
  urgency: "Special Instructions",
  cid: "01/19/2020",
  patientFirstName: "One",
  patientMiddleName: "T",
  patientLastName: "CTBPatient",
  patientDob: "01/01/1960",
  patientSsn: "1111111111",
  patientIcn: "1008668815V929047",
  providerKey: true,
  siteId: "12345",
  userId: "TESTUSER",
  outpatient: true,
  consultHistory: formattedConsultHistory,
};

export const dstConsultInfo = {
  age: 60,
  ccAdminConsult: false,
  ccConsult: false,
  clinicalSvc: {
    consultName: "Audiology Consult",
    dstRequired: true,
    noEarlier: "",
    stopCode: "203",
    svcName: "Audiology",
    svcType: "Specialty Care",
    urgency: "Routine",
  },
  dob: "01/01/1960",
  dstId,
  errored: false,
  gender: "F",
  manualClinicalSvc: true,
  name: {
    first: "One",
    last: "CTBPatient",
    middle: "T",
  },
  sentToHsrm: false,
  signedConsult: false,
  ssn: "1111111111",
};

export const eligAddr = {
  address: {
    line1: "1234 Example Rd.",
    line2: "West Branch, CO 97734",
    city: "West Branch",
    state: "CO",
    zipcode: "97734",
    lat: "12345",
    lng: "23456",
  },
  eligibility: {
    basic: true,
    grandfathered: true,
    hardship: true,
    noVaFacility: true,
    staticElig: false,
    urgentElig: true,
  },
};

export const defaultUserStateResponse = {};

export const userStateWithValues = {
  userRole: USER_ROLE_PROVIDER,
};

export const canScoreResponse = {
  CanScore: {
    cevent_1y: 1,
    riskDate: "10-27-2020",
    executeDate: "10-27-2020",
    insertDate: "10-27-2020",
  },
};

export default MockCtbApi;