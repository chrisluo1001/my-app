/* istanbul ignore file */

/**
 * Default State of the Redux Store
 */

export default {
  value: 0,
  address: { // The veteran address information provided by the patient demographics endpoint
    line1: "",
    line2: "",
    city: "",
    state: "",
    zipcode: "",
    lat: "",
    lng: "",
  },
  articles: [],
  initialAppState: {}, // The initial state of the application after restore
  appState: {}, // The dynamic object containing the current state of the user's selections
  clinicalServicesList: [], // The list of all clinical services
  consultInfo: { // The consult information passed to the application by CPRS
    lastUpdateDate: "",
    dstId: "",
    workflow: "",
    consultService: "",
    urgency: "",
    cid: "",
    patientFirstName: "",
    patientMiddleName: "",
    patientLastName: "",
    patientDob: "",
    patientSsn: "",
    patientIcn: "",
    providerKey: "",
    siteId: "",
    userId: "",
    outpatient: true,
    consultHistory: "",
  },
  dstConsultInfo: { // The consult information from the DST API
    age: "",
    ccAdminConsult: false,
    ccConsult: false,
    clinicalSvc: {
      consultName: "",
      dstRequired: true,
      noEarler: "",
      stopCode: "",
      svcName: "",
      svcType: "",
      urgency: "",
    },
    dob: "",
    dstId: "",
    errored: false,
    gender: "",
    manualClinicalSvc: true,
    name: {
      first: "",
      last: "",
      middle: "",
    },
    sentToHsrm: false,
    signedConsult: false,
    ssn: "",
  },
  dstId: "", // The DST ID provided by CPRS associated with the consult information and the saved structured text
  eligibility: { // The veteran CC eligibility information provided by the patient demographics endpoint
    basic: true,
    grandfathered: false,
    hardship: false,
    noVaFacility: false,
    staticElig: false,
    urgentElig: false,
    errored: false,
    loading: true,
    driveTimeElig: false,
    waitTimeElig: false,
    staticEligStatus: "", // The current status of the static eligibility, including drive time
    manualElig: false, // Defines if a veteran is eligible based on a manually set reason
    overallElig: false, // The overall eligibility status calculated by the application
  },
  userState: {}, // The object containing the user defined settings used by the application
  userStateUpdates: {}, // The object containing the latest updates to the user defined settings
  facilitiesList: [], // The list of facilities based on the clinical service
  facilitiesLoading: false,
  savedConsultFactors: "", // The previously saved Consult Factors text
  seocsList: [], // The list of SEOCs based on the clinical service
  whatsNew: { // The information from the What's New JSON file
    hideUntilNew: false, // The flag that specifies whether the What's New dialog should be hidden until the application is updated
    whatsNewDate: "",
    releases: [],
  },
  workflowList: { // The pages to be shown with the given workflow
    title: "",
    pages: [],
    default: "", // The page to be shown by default
    type: "", // The workflow type to be displayed i.e. VA or CC
  },
  ctbModal: { // The information needed to display a modal window
    header: "",
    bodyMsg: "",
    customFooter: undefined,
    footerText: "",
    isModalOpen: false,
    options: {},
  },
  isVaCcModalOpen: false,
  currPage: "", // The current page to be displayed
  errors: {}, // The errors found, listed by page
  validation: {}, // The validation rules, listed by page
  pages: {}, // Each page that has been visited with a list of controls on each page
  inputRoles: {}, // Each input with user roles specified that has been rendered
};
