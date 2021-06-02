import {
  UNSUPPORTED_WORKFLOW,
  VA_TYPE,
  CC_TYPE,
} from "../constants";

const workflowLists = {
  "ORDER": [
    {
      title: "Order Consult",
      adminTitle: "Order Admin Consult",
      pages: [
        "dstUnsigned",
      ],
      default: "dstUnsigned",
    },
  ],
  "RECEIVE": [
    {
      type: VA_TYPE,
      title: "Receive VA Consult",
      pages: [
        "consultReviewVa",
        "dstSigned",
        "contactAttemptsVa",
        "patientPreferences",
        "consultHistory",
        "userSettings",
      ],
      default: "consultReviewVa",
    },
    {
      type: CC_TYPE,
      title: "Receive CC Consult",
      pages: [
        "consultReviewCc",
        "dstSigned",
        "contactAttemptsCc",
        "patientPreferences",
        "adminScreening",
        "clinicalTriage",
        "dodPage",
        "consultHistory",
        "userSettings",
      ],
      default: "consultReviewCc",
      validateCCEligible: true,
    },
    {
      noBasic: true,
      title: "Receive CC Consult",
      pages: [
        "nbeReceive",
      ],
      default: "nbeReceive",
      noAction: true,
    },
  ],
  "COMMENT": [
    {
      type: VA_TYPE,
      title: "VA CONSULT COMMENT",
      pages: [
        "consultReviewVa",
        "dstSigned",
        "contactAttemptsVa",
        "patientPreferences",
        "consultHistory",
        "userSettings",
      ],
      default: "consultReviewVa",
    },
    {
      type: CC_TYPE,
      title: "CC CONSULT COMMENT",
      pages: [
        "consultReviewCc",
        "dstSigned",
        "contactAttemptsCc",
        "patientPreferences",
        "adminScreening",
        "clinicalTriage",
        "dodPage",
        "apptTracking",
        "requestService",
        "consultCompletion",
        "consultHistory",
        "userSettings",
      ],
      default: "consultReviewCc",
    },
    {
      consultNameRegex: "^COMMUNITY CARE-HARDSHIP DETERMINATION",
      title: "HARDSHIP DETERMINATION",
      pages: [
        "hardshipDetermination",
        "consultHistory",
        "userSettings",
      ],
      default: "hardshipDetermination",
    },
  ],
  "DISCONTINUE": [
    {
      title: "Discontinue Consult",
      pages: [
        "discontinueConsult",
      ],
      default: "discontinueConsult",
      noAction: true,
    },
  ],
  "ADMINISTRATIVE COMPLETE": [
    {
      title: "ADMIN COMPLETE",
      pages: [
        "adminComplete",
        "consultHistory",
        "userSettings",
      ],
      default: "adminComplete",
    },
  ],
  "SIGNIFICANT FINDING": [
    {
      title: "Significant Findings",
      pages: [
        "significantFindings",
        "requestService",
        "consultHistory",
        "userSettings",
      ],
      default: "significantFindings",
    },
  ],
  "CANCEL-DENY": [
    {
      type: CC_TYPE,
      title: "CANCEL CC CONSULT",
      pages: [
        "ccCancel",
        "consultHistory",
        "userSettings",
      ],
      default: "ccCancel",
    },
    {
      type: VA_TYPE,
      title: "CANCEL VA CONSULT",
      pages: [
        "vaCancel",
        "consultHistory",
        "userSettings",
      ],
      default: "vaCancel",
    },
  ],
  "FORWARD": [
    {
      title: "FORWARD CONSULT TO CC",
      pages: [
        "forwardCC",
        "dstSigned",
        "patientPreferences",
        "consultHistory",
        "userSettings",
      ],
      default: "forwardCC",
      validateCCEligible: true,
    },
    {
      noBasic: true,
      title: "FORWARD CONSULT TO CC",
      pages: [
        "nbeForward",
      ],
      default: "nbeForward",
      noAction: true,
    },
  ],

  // Error handling workflows
  "USER ERROR": [
    {
      title: "Unauthorized User",
      pages: [
        "userError",
      ],
      default: "userError",
      noAction: true,
    },
  ],
  [UNSUPPORTED_WORKFLOW]: [
    {
      title: "Unsupported Workflow",
      pages: [
        "unsupportedWorkflow",
      ],
      default: "unsupportedWorkflow",
      noAction: true,
    },
  ],

  // For testing purposes only
  "TEST": [
    {
      title: "Test",
      pages: [
        "controlLibrary",
        "userSettings",
        "cameronChiltonControls",
        "dodPage",
        "consultReviewCc",
        "contactAttemptsCc",
        "contactAttemptsVa",
        "consultReviewVa",
        "consultCompletion",
        "vaCancel",
        "forwardCC",
        "apptTracking",
      ],
      default: "controlLibrary",
    },
  ],
};

export default workflowLists;
