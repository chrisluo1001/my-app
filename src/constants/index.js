/**
 * A listing of all the constants/enums available for CTB
 */

/* SSO Logout link at top right of UI */
export const SSO_LOGOUT_URL = `https://ssologon.int.iam.va.gov/CentralLogin/CentralLanding.aspx?appid=CTB&target=${window.location.href}`;

export const CTB_HELP_URL = (process.env.NODE_ENV && process.env.NODE_ENV !== "production")
  ? "online-help-ctb.pdf"
  : "/content/v1/static/online-help-ctb.pdf";

export const EXTERNAL_LINKS =
  {
    VA_CONSULT_HELP:
      {
        href: "https://vaww.vha.vaco.portal.va.gov/sites/DUSHOM/10NA/ACAO/ConsultManagement/SitePages/Consult%20Toolbox.aspx",
        name: "Visit VA Consult Help Site for Additional Consult Management Guidance",
        title: "VA Consult Help Site",
      },
    COMMUNITY_CARE_PROVIDER_LOCATOR:
      {
        href: "https://vaww.va.gov/COMMUNITYCARE/Apps/providerlocator/",
        name: "Open Community Care Provider Locator",
        title: "Open Community Care Provider Locator",
      },
  };
export const CTB_DATE_FMT = "MM/DD/YYYY";
export const API_DATE_FMT = "YYYY-MM-DDTHH:mm:ss.SSSZ";

export const DRIVE_TIME_STD_SPECIALTY = 60;
export const DRIVE_TIME_STD_PRIMARY = 30;

export const WAIT_TIME_STD_SPECIALTY = 28;
export const WAIT_TIME_STD_PRIMARY = 20;

export const WTE_NA = "NOT APPLICABLE";

export const STATIC_ELIG_NONE = "none";
export const STATIC_ELIG_NOT_FOUND = "not found";
export const STATIC_ELIG_ELIGIBLE = "eligible";

export const MANUAL_ELIG_1703 = "1703";
export const MANUAL_ELIG_BMIOV = "bmiov";
export const MANUAL_ELIG_PRESUMED_ELIG_HEC = "presumed-elig-hec";
export const MANUAL_ELIG_SERVICE_NOT_AVAIL = "service-not-avail";
export const MANUAL_ELIG_WAIT_TIME = "wait-time";

export const BMIOV_TRAVELING = "traveling";
export const BMIOV_FREQUENCY = "frequency";
export const BMIOV_SIMPLICITY = "simplicity";
export const BMIOV_ATTENDANT = "attendant";
export const BMIOV_CONTINUITY = "continuity";

export const USER_ROLE_CLERK = "clerk";
export const USER_ROLE_NURSE = "nurse";
export const USER_ROLE_PROVIDER = "provider";

export const NO_WORKFLOW_TYPE = "no workflow type";
export const UNSUPPORTED_WORKFLOW = "UNSUPPORTED WORKFLOW";
export const VA_TYPE = "VA";
export const CC_TYPE = "CC";
export const CC_CONSULT_Y = "Y";
export const CC_CONSULT_N = "N";
export const CC_CONSULT_NA = "N/A";

export const CAN_SCORE_NA = "Not available";
export const CAN_SCORE_0_TO_74 = "0 to 74";
export const CAN_SCORE_75_TO_90 = "75 to 90";
export const CAN_SCORE_OVER_90 = "Over 90";

export const NONE_OF_THE_ABOVE = "None of the above";
export const UNDETERMINED = "Undetermined";

// ACCL / CCL
export const ACCL_CCL_URGENT = "Urgent";
export const ACCL_CCL_BASIC = "Basic";
export const ACCL_CCL_MODERATE = "Moderate";
export const ACCL_CCL_COMPLEX = "Complex/Chronic";

// CTR
export const CTR_REQUIRED = "Required";
export const CTR_NOT_REQUIRED = "Not required";

// ACCA
export const ACCA_PROCEED_ADMIN_SCREEN = "Proceed with admin screening";
export const ACCA_PROCEED_CLIN_TRIAGE = "Proceed with clinical triage";
export const ACCA_SEND_FOR_SCHED = "Send for scheduling";
export const ACCA_PROCEED_NOTIFY_CLIN_STAFF = "Proceed with scheduling and notify clinical staff";
export const ACCA_PROCEED_WITH_SCHED = "Proceed with scheduling";

// Last Assessment Type
export const LAST_ADMIN_SCREENING = "Admin Screening";
export const LAST_CLINICAL_TRIAGE = "Clinical Triage";

// Admin Screening and Clinical Triage Start And End Text
export const ADMIN_SCREENING_START = "CLA-Admin Screening Care Coordination:";
export const ADMIN_SCREENING_END = "CLA-------------------------\r\n";
export const CLINICAL_TRIAGE_START = "CLC-Clinical Triage Care Coordination:";
export const CLINICAL_TRIAGE_END = "CLC----------\r\n";

// Significant Findings Start And End Text
export const SIG_FINDINGS_START = "SFD-Significant Finding";
export const SIG_FINDINGS_END = "SFD----------\r\n";

export const WORKFLOW_ERROR = "WORKFLOW_ERROR";
export const WORKFLOW_ERROR_VPP = "WORKFLOW_ERROR_VPP";
