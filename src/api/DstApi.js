import axios from "axios";
// import queryString from "qs";
import * as errors from "../constants/ErrorTypes";

export const instance = axios.create({
  baseURL: window.apiUrl ? window.apiUrl : "/ehrm-api/v1",
});

/**
 * Decision Support Viewer's main API for communicating with
 * the back-end services.
 *
 * In order to provide the desired UX this API will serve as the
 * orchestrator of the various calls to the resources DSV will need
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
class DstApi {

  static getPatientInfo(edipi) {
    const edipiJson = {
      edipi: edipi
    };
    return new Promise( (resolve, reject) => {
      if (edipi && edipi.length > 0) {
        //instance.post("/patientQueryByEDIPI", edipi)
        //Failed to load resource: the server responded with a status of 415 (Unsupported Media Type)
        instance.post("/patientQueryByEDIPI", edipiJson)
          .then( (response) => {
            if (response.data) {
              resolve(response.data);
            } else {
              reject();
            }
          })
          .catch( (error) => {
            reject(error);
          });
      }
    });
  }

  /**
   * Obtain the veteran's residential address and eligibility
   * information for community care.
   *
   * @param {string} icn The veteran's unique ID
   */
  static getAddrAndElig(icn) {
    return new Promise( (resolve, reject) => {
      instance.get(`/getDstPatientDemographics/${icn}`)
        .then( (response) => {
          // parse out response
          if (response.data) {
            // validate response first

            resolve(response.data);
          } else {
            reject(errors.GET_BLANK_HTTP_RESPONSE);
          }
        })
        .catch( (error) => {
          reject(error);
        });
    });
  }

  /**
   * Obtain a listing of facilities and providers near the veteran.
   * Data is pulled from PPMS and CDW.
   *
   * @param {object} vetAddress Veteran address object.
   *  (Shape: { address: line1, city, state, zipcode, lat, lng })
   * @param {string} svcName Clinical service name to filter by
   * @param {string} stopCode Stop code for the clinical service
   */
  static getFacilityInfo(vetAddress, svcName=null, stopCode=null) {
    return new Promise( (resolve, reject) => {
      const addrObj = {
        address: vetAddress,
        svcName,
        stopCode,
      };
      instance.post("/getFacilities", addrObj)
        .then( (response) => {
          if (response.data) {
            resolve(response.data);
          }
        })
        .catch( (error) => {
          reject(error);
        });
    });
  }

  /**
   * Gets all clinical services for typeahead use
   *
   */
  static getConsultServices() {
    return new Promise( (resolve, reject) => {
      instance.get("/dstClinicalServiceList")
        .then( (response) => {
          if (response.data) {
            resolve(response.data);
          }
        })
        .catch( (error) => {
          reject(error);
        });
    });
  }

  /**
   * Gets a subset of all SEOCs based upon the given service name.
   *
   * @param {string} svcName The Service Name for this Consult
   *                 (from consultInfo.clinicalSvc.svcName)
   */
  static getSeocsForService(svcName) {
    return new Promise( (resolve, reject) => {
      if (svcName && svcName.length > 0) {
        const urlSafeName = encodeURIComponent(svcName);
        instance.get(`getDstSeocs/${urlSafeName}`)
          .then( (response) => {
            if (response.data) {
              resolve(response.data);
            }
          })
          .catch( (error) => {
            reject(error);
          });
      }
    });
  }

}

export default DstApi;
