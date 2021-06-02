/* eslint-disable no-console */

import delay from "./delay";
import axios from "axios";
import whatsNewJson from "../content/whats-new-ctb.json"; // eslint-disable-line import/extensions
import {
  getWorkflowListByConsultFlag,
  getWorkflowList,
} from "./utils/apiUtils";
import { CAN_SCORE_NA } from "../constants";

export const instance = axios.create({
  baseURL: "/ctb-api",
});

export const dstInstance = axios.create({
  baseURL: "/cprs-api/v2",
});

export const ctbWebApikey = window.ctbWebApikey ? window.ctbWebApikey : "33333333-3333-3333-3333-333333333333";
export const dstWebApikey = window.cprsWebApikey ? window.cprsWebApikey : "11111111-1111-1111-1111-111111111111";

const successCtb = (config) => {
  let headers = {
    ...config["headers"],
    "apikey": ctbWebApikey,
  };
  config = {
    ...config,
    headers,
  };

  return config;
};

const successDst = (config) => {
  let headers = {
    ...config["headers"],
    "apikey": dstWebApikey,
  };
  config = {
    ...config,
    headers,
  };

  return config;
};

const failure = (error) => {
  return Promise.reject(error);
};

// Add a request interceptor
instance.interceptors.request.use(successCtb, failure);

dstInstance.interceptors.request.use(successDst, failure);

export const canScoreInstance = axios.create({
  baseURL: "/canscore-data/v1",
});

canScoreInstance.interceptors.request.use(successCtb, failure);

/**
 * Consult Toolbox's main API for communicating with
 * the back-end services.
 *
 * In order to provide the desired UX this API will serve as the
 * orchestrator of the various calls to the resources CTB will need
 * to obtain information from.
 *
 * -------------------------------------------------------------------
 * Whereas in a traditional setup we would typically call out to the
 * back-end, wait for it to handle calling each service separately,
 * aggregate the data, and finally respond to us. All the while the UI
 * would be showing the user a nice loading indicator of some sort.
 *
 * Instead, now, we need to show a separate loading spinner for each
 * external service the back-end will be doing the actual talking with.
 * So, to that end this API will serve as the orchestrator to kick off
 * each of these back-end calls. Each individual getter below will then
 * be able to track the loading status independently and correctly show
 * the loading spinners as is desired.
 */
class CtbApi {

  /**
   * Gets the current timestamp in milliseconds and returns it as a query
   * parameter to be appended to a URL to prevent browser caching.
   *
   * @return {string} timestamp in milliseconds as a query parameter
   */
  static getTimeStampParam() {
    return `?_=${new Date().getTime()}`;
  }

  /**
   * Gets the clinical service list
   */
  static getClinicalServicesList() {
    return new Promise((resolve, reject) => {
      dstInstance.get(`/dstClinicalServiceList${this.getTimeStampParam()}`)
        .then((response) => {
          if (response.data) {
            resolve(response.data.serviceNames);
          } else {
            resolve("Empty Response");
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  /**
   * Gets the consult information sent by CPRS based on the dstId
   *
   * @param {string} dstId The current dstId
   */
  static getConsultInfo(dstId) {
    return new Promise((resolve, reject) => {
      if (dstId) {
        instance.get(`/consult-info/${dstId}${this.getTimeStampParam()}`)
          .then((response) => {
            if (response.data) {
              resolve(response.data);
            } else {
              reject("Empty Response");
            }
          })
          .catch((error) => {
            reject(error);
          });
      } else {
        reject("dstId not provided");
      }
    });
  }

  /**
   * Gets the consult information from the DST API based on the DST ID
   *
   * @param {string} dstId The current DST ID
   */
  static getDstConsultInfo(dstId) {
    return new Promise((resolve, reject) => {
      if (dstId) {
        dstInstance.get(`/getDstConsultInfo/${dstId}${this.getTimeStampParam()}`)
          .then((response) => {
            if (response.data) {
              const data = {
                ...response.data,
                clinicalSvc: response.data.clinicalSvc || {},
              };

              resolve(data);
            } else {
              reject("Empty Response");
            }
          })
          .catch((error) => {
            reject(error);
          });
      } else {
        reject("dstId not provided");
      }
    });
  }

  /**
   * Gets the saved consult factors based on the DST ID
   *
   * @param {string} dstId The current DST ID
   */
  static getSavedConsultFactors(dstId) {
    return new Promise((resolve, reject) => {
      if (dstId) {
        instance.get(`/consult-factors/${dstId}${this.getTimeStampParam()}`)
          .then((response) => {
            if (response.data) {
              resolve(response.data.consultFactorText);
            } else {
              resolve("");
            }
          })
          .catch((error) => {
            reject(error);
          });
      } else {
        reject("dstId not provided");
      }
    });
  }

  /**
   * Gets the veteran's residential address and eligibility
   * information for community care.
   *
   * @param {string} icn The veteran's unique ID
   * @param {string} dstId The current dstId
   */
  static getAddrAndElig(icn, dstId) {
    return new Promise((resolve, reject) => {
      if (icn && dstId) {
        dstInstance.defaults.headers["dstID"] = dstId;
        dstInstance.get(`/getDstPatientDemographics/${icn}${this.getTimeStampParam()}`)
          .then((response) => {
            if (response.data) {
              resolve(response.data);
            } else {
              reject("Empty Response");
            }
          })
          .catch((error) => {
            reject(error);
          });
      } else {
        reject("icn or dstId not provided");
      }
    });
  }

  /**
   * Gets the list of facilities based on the address, service name, and stop code
   *
   * @param {object} address The patient's address
   * @param {string} svcName The clinical service name
   * @param {string} stopCode The clinical service stop code
   */
  static getFacilitiesList(address, svcName, stopCode) {
    return new Promise((resolve, reject) => {
      if (address && svcName && stopCode) {
        const data = {
          address,
          svcName,
          stopCode,
        };

        dstInstance.post(`/getFacilities${this.getTimeStampParam()}`, data)
          .then((response) => {
            if (!response.data) {
              reject("Empty Response");
            } else if (response.data.errored) {
              reject("Error retrieving facilities");
            } else {
              resolve(response.data.facilities);
            }
          })
          .catch((error) => {
            reject(error);
          });
      } else {
        reject("address, svcName, or stopCode not provided");
      }
    });
  }

  /**
   * Gets the list of SEOCs based on the clinical service name
   *
   * @param {string} svcName The clinical service name
   */
  static getSeocsList(svcName) {
    return new Promise((resolve, reject) => {
      if (svcName) {
        dstInstance.get(`/getDstSeocs/${svcName}${this.getTimeStampParam()}`)
          .then((response) => {
            if (response.data) {
              resolve(response.data.seocs);
            } else {
              reject("Empty Response");
            }
          })
          .catch((error) => {
            reject(error);
          });
      } else {
        reject("svcName not provided");
      }
    });
  }

  /**
   * Saves the dstId and consultFactorText so it can be retrieved by CPRS
   *
   * @param {string} dstId The current dstId
   * @param {string} consultFactorText The structured text based on the appState
   */
  static saveConsultFactorText(dstId, consultFactorText) {
    return new Promise((resolve, reject) => {
      if (dstId && (consultFactorText || consultFactorText === "")) {
        const data = {
          dstId,
          consultFactorText,
        };

        instance.post(`/consult-factors${this.getTimeStampParam()}`, data)
          .then((response) => {
            if (response.status === 200) {
              resolve();
            }
          })
          .catch((error) => {
            reject(error);
          });
      } else {
        reject("dstId or consultFactorText not provided");
      }
    });
  }

  /**
   * Clears the consult factor text for the given dstId
   *
   * @param {string} dstId The current dstId
   */
  static deleteConsultFactorText(dstId) {
    return new Promise((resolve, reject) => {
      if (dstId) {
        instance.delete(`/consult-factors/${dstId}${this.getTimeStampParam()}`)
          .then((response) => {
            if (response.status === 200) {
              resolve();
            }
          })
          .catch((error) => {
            reject(error);
          });
      } else {
        reject("dstId not provided");
      }
    });
  }

  /**
   * Gets the user settings for the current user
   *
   * @param {string} userId The VA Network ID of the current user
   */
  static getUserState(userId) {
    return new Promise((resolve, reject) => {
      if (userId) {
        instance.get(`/ctb-preference/user/${userId}${this.getTimeStampParam()}`)
          .then((response) => {
            if (response.data) {
              resolve(JSON.parse(response.data.prefInfo));
            } else {
              resolve({}); // Default to an empty object
            }
          })
          .catch((error) => {
            reject(error);
          });
      } else {
        resolve({}); // Default to an empty object
      }
    });
  }

  /**
   * Saves the user settings for the current user
   *
   * @param {string} userId The VA Network ID of the current user
   * @param {object} userState The user settings to save
   */
  static saveUserState(userId, userState) {
    return new Promise((resolve, reject) => {
      if (userId && userState) {
        const data = {
          ctbPreferenceId: {
            id: userId,
            prefType: "user",
          },
          prefInfo: JSON.stringify(userState),
        };

        instance.post(`/ctb-preference${this.getTimeStampParam()}`, data)
          .then((response) => {
            if (response.status === 200) {
              resolve();
            }
          })
          .catch((error) => {
            reject(error);
          });
      } else {
        reject("userId or userState not provided");
      }
    });
  }

  /**
   * Gets the CAN Score information for the given ICN.
   *
   * @param {string} patientIcn The ICN for the veteran.
   * @param {string} userId The ID for the current user.
   */
  static getCANScore(patientIcn, userId) {
    return new Promise((resolve) => {
      const defaultCANScore = {
        CanScore: {
          cevent_1y: CAN_SCORE_NA,
          riskDate: CAN_SCORE_NA,
        },
      };

      if (patientIcn && userId) {
        const data = {
          icn: patientIcn.substring(0,patientIcn.indexOf("V") !== -1 ? patientIcn.indexOf("V") : patientIcn.length),
          vauserId: userId,
        };

        canScoreInstance.post(`/canscore-icn${this.getTimeStampParam()}`, data)
          .then((response) => {
            resolve(response.data);
          })
          .catch(() => {
            resolve(defaultCANScore);
          });
      } else {
        resolve(defaultCANScore);
      }
    });
  }

  /**
   * Gets the content for the What's New modal.  If there are any errors, it falls back to the local whats-new-ctb.json file
   */
  static getWhatsNewContent() {
    return new Promise((resolve, reject) => {
      axios.get(`/content/v1/static/whats-new-ctb.json${this.getTimeStampParam()}`)
        .then( response => {
          if (response.data) {
            resolve(response.data);
          } else {
            console.log("Unable to retrieve What's New content, falling back to local content.");
            resolve(whatsNewJson);
          }
        })
        .catch( error => {
          console.log("Unable to retrieve What's New content, falling back to local content.");
          console.log(error);
          resolve(whatsNewJson);
        });
    });
  }

  /**
   * Gets the list of pages based on the given workflow and stopCode.
   * Mimics a possible future enhancement where the workflows
   * are retrieved from the API.
   *
   * @param {string} workflow The workflow ID from CPRS
   * @param {string} consultName The name / consult to service/specialty of the consult
   * @param {bool} outpatient Whether this is an outpatient or inpatient consult
   * @param {boolean} isAdmin Whether the consult is an admin consult
   * @param {boolean} basic Whether the veteran has basic eligibility
   * @param {string} ccConsult The flag associated with the consult to determine if CC consult or not or not determined
   */
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

  /**
   * Gets the list of pages based on the given workflow and type.
   * Mimics a possible future enhancement where the workflows
   * are retrieved from the API.
   *
   * @param {string} workflow The workflow ID from CPRS
   * @param {string} consultName The name / consult to service/specialty of the consult
   * @param {bool} outpatient Whether this is an outpatient or inpatient consult
   * @param {string} type The workflow type, either VA or CC
   * @param {boolean} isAdmin Whether the consult is an admin consult
   * @param {boolean} basic Whether the veteran has basic eligibility
   */
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

export default CtbApi;
