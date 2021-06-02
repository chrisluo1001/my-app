import workflowLists from "../../workflow-lists/workflowLists";
import {
  NO_WORKFLOW_TYPE,
  UNSUPPORTED_WORKFLOW,
  VA_TYPE,
  CC_TYPE,
  CC_CONSULT_NA,
  CC_CONSULT_Y,
} from "../../constants";

/**
 * Get the correct worklowType, VA or CC, for the consult based on ccConsultFlag
 * If the flag is Y, the workflowType is CC
 * If the flag is N, the workflowType is VA
 * If there is no flag or it is NA, no workflowType is assumed
 *
 * @param {string} ccConsult The ccConsult flag associated with the consult
 * @return The correct workflowType, VA or CC, for the consult
 */
const getWorkflowType = (ccConsult) => {
  let type = VA_TYPE;

  if (!ccConsult || ccConsult === CC_CONSULT_NA) {
    type = NO_WORKFLOW_TYPE;
  } else if (ccConsult === CC_CONSULT_Y) {
    type = CC_TYPE;
  }

  return type;
};

/**
 * Get all workflowList objects for the given workflow, minus the No Basic Eligibility
 * workflow list, if present
 *
 * @param {string} workflow The workflow ID from CPRS
 * @return All workflowList objects for the given workflow
 */
const getWorkflowListObjs = (workflow) => {
  const workflowListObjs = workflowLists[workflow];

  if (!workflowListObjs) {
    return;
  }

  return workflowListObjs.filter((currObj) => !currObj.noBasic);
};

/**
 * Get all workflowList objects that match the consultName
 *
 * @param {array} workflowListObjs The current list of workflowList objects
 * @param {string} consultName The name / consult to service/specialty of the consult
 * @return All workflowList objects that match the consult Name
 */
const getWorkflowListObjsByConsultName = (workflowListObjs, consultName) => {
  const filteredWorkflowListObjs = workflowListObjs.filter((currObj) => {
    const consultNameRegex = currObj.consultNameRegex ? new RegExp(currObj.consultNameRegex.toUpperCase()) : "";

    return consultNameRegex && consultName.toUpperCase().match(consultNameRegex);
  });

  return filteredWorkflowListObjs.length ? filteredWorkflowListObjs : workflowListObjs.filter((currObj) => !currObj.consultNameRegex);
};

/**
 * Get all workflowList objects that match the inpatient status of the consult
 *
 * @param {array} workflowListObjs The current list of workflowList objects
 * @param {bool} inpatient Whether this is an inpatient or outpatient consult
 * @return All workflowList objects that match the inpatient status of the consult
 */
const getWorkflowListObjsByInpatient = (workflowListObjs, inpatient) => {
  const filteredWorkflowListObjs = workflowListObjs.filter((currObj) => inpatient && currObj.inpatient);

  return filteredWorkflowListObjs.length ? filteredWorkflowListObjs : workflowListObjs.filter((currObj) => !currObj.inpatient);
};

/**
 * Get all workflowList objects with the given type
 *
 * @param {array} workflowListObjs The current list of workflowList objects
 * @param {string} type The workflow type, either VA or CC
 * @return All workflowList objects with the given type
 */
const getWorkflowListByType = (workflowListObjs, type) => {
  const workflowList = workflowListObjs.find((currObj) => currObj.type === type) || { type };

  return [workflowList];
};

/**
 * If the list of workflowList objects has only one item, return the workflowList with its applicable
 * title based on whether the consult is an Admin consult.
 *
 * @param {array} workflowListObjs The current list of workflowList objects
 * @param {boolean} isAdmin Whether the consult is an admin consult
 * @return The workflowList with the applicable title
 */
const getWorkflowListWithTitle = (workflowListObjs, isAdmin) => {
  if (workflowListObjs.length === 1) {
    let workflowList = workflowListObjs[0];

    workflowList.title = workflowList.adminTitle && isAdmin ? workflowList.adminTitle : workflowList.title;

    return workflowList;
  }
};

/**
 * If the workflowList specifies validate for CC Eligibility and the veteran does not have basic
 * eligibility, returns the applicable No Basic Eligibility workflowList.  Otherwise, returns the
 * given workflowList.
 *
 * @param {string} workflow The workflow ID from CPRS
 * @param {object} workflowList The current workflowList object
 * @param {boolean} basic Whether the veteran has basic eligibility
 * @return The correct workflow based on basic eligibility if applicable
 */
const checkBasicEligibility = (workflow, workflowList, basic) => {
  if (workflowList.validateCCEligible && !basic) {
    return workflowLists[workflow].find((workflowListObj) => workflowListObj.noBasic);
  }

  return workflowList;
};

/**
 * Gets the list of pages based on the given workflow, consult name, inpatient status, type,
 * whether the consult is an Admin consult, and if the veteran is cc eligibile (if applicable)
 *
 * @param {string} workflow The workflow ID from CPRS
 * @param {string} consultName The name / consult to service/specialty of the consult
 * @param {bool} inpatient Whether this is an inpatient or outpatient consult
 * @param {string} type The workflow type, either VA or CC
 * @param {boolean} isAdmin Whether the consult is an admin consult
 * @param {boolean} basic Whether the veteran has basic eligibility
 * @return The list of pages for the workflow
 */
export const getWorkflowList = (workflow, consultName, inpatient, type, isAdmin, basic) => {
  let workflowListObjs;
  let workflowList;
  const steps = [
    () => getWorkflowListObjs(workflow),
    () => getWorkflowListObjsByConsultName(workflowListObjs, consultName),
    () => getWorkflowListObjsByInpatient(workflowListObjs, inpatient),
    () => getWorkflowListByType(workflowListObjs, type),
  ];

  for (let i = 0; i < steps.length; i++) {
    workflowListObjs = steps[i]();

    if (!workflowListObjs) {
      break;
    }

    workflowList = getWorkflowListWithTitle(workflowListObjs, isAdmin);

    if (workflowList) {
      break;
    }
  }

  if (!workflowList) {
    workflowList = workflowLists[UNSUPPORTED_WORKFLOW][0];
  }

  workflowList = checkBasicEligibility(workflow, workflowList, basic);

  return workflowList;
};


/**
 * Gets the list of pages based on the given workflow, consult name, inpatient status, stopCode,
 * whether the consult is an Admin consult, and if the veteran is cc eligibile (if applicable)
 *
 * @param {string} workflow The workflow ID from CPRS
 * @param {string} consultName The name / consult to service/specialty of the consult
 * @param {bool} inpatient Whether this is an inpatient or outpatient consult
 * @param {boolean} isAdmin Whether the consult is an admin consult
 * @param {boolean} basic Whether the veteran has basic eligibility
 * @param {string} ccConsult Whether the consult is a CC consult or not or can't be determined
 * @return The list of pages for the workflow
 */
export const getWorkflowListByConsultFlag = (workflow, consultName, inpatient, isAdmin, basic, ccConsult) => {
  const type = getWorkflowType(ccConsult);

  return getWorkflowList(workflow, consultName, inpatient, type, isAdmin, basic);
};

