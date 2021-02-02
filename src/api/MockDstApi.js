import delay from "./delay";

class MockDstApi {

  /**
   * Initial data load for everything.
   *
   * @param {string} edipi DSV's internal identifier for this patient
   */
  static getPatientInfo(edipi) {
    return new Promise( (resolve, reject) => {
       if (edipi && edipi.length > 0) {
        setTimeout( () => {
          resolve({ ...patientInformation });
        }, delay);
       } else {
         reject("Error communicating with the server! Check error message.");
       }
    });
  }

  static getAddrAndElig(icn) {
    return new Promise( (resolve, reject) => {
      if (icn && icn.length > 1) {
        setTimeout( () => {
          resolve({ ...addressEligibility });
        }, delay);
      } else {
        reject("Error communicating with the server! Check error message.");
      }
    });
  }

  static getFacilityInfo(arbitraryLocation, svcName=null, stopCode=null) {
    return new Promise( (resolve, reject) => {
      if (arbitraryLocation) {
        setTimeout( () => {
          if (svcName && stopCode === "MS003") {
            resolve({ ...facilityLists.driveEligible });
          } else {
            resolve({ ...facilityInformation });
            // resolve({ ...facilityLists.emptyFacilities });
          }
        }, delay);
      }
    });
  }

  static getConsultServices() {
    return new Promise( (resolve, reject) => {
      setTimeout( () => {
        resolve({ ...clinicalServices });
        // reject("MOCK TEST ERROR -- getConsultServices");
      }, delay);
    });
  }

  static getSeocsForService(svcName) {
    return new Promise( (resolve, reject) => {
      if (svcName && svcName.length > 0) {
        setTimeout( () => {
          resolve({ ...seocList });
          // reject("MOCK TEST ERROR -- getSeocsForService");
        }, delay);
      } else {
        reject("MockDstApi getSeocsForService -- svcName invalid!");
      }
    });
  }

}

/***********************************************************/
/*                     Mock Data                           */
/***********************************************************/

export const edipi = "1920633861";

export const patientInformation = {
  name: {
    first: "Inpatient",
    middle: "",
    last: "Ten",
  },
  dob: "01/18/1938",
  age: "81",
  ssn: "666000810",
  icn: "1000",
  errored: false,
};

export const consultInformation = {
	name: {
		first: "Any",
		middle: "A",
    last: "DSTPatient",
    suffix: "",
	},
	dob: "01/18/1938",
	age: "81",
	ssn: "123-44-4567",
	gender: "f",
	clinicalSvc: {
    // svcType: "Primary Care/Mental Health",
    svcType: "Specialty Care",
    svcName: "Cardiology",
    stopCode: "123",
    consultName: "Advanced Heart Failure Slc",
    // svcName: "",
    // consultName: "Community Care-Heart Surgery",
    // svcName: null,
    // consultName: "COMMUNITY CARE-ADMIN VCCPE",
    // consultName: "Community Care-Admin Vccpe",
    // svcName: "Mock Service #07",
		urgency: "Routine",
    noEarlier: "03/07/2019",
		noLater: "04/15/2019",
  },
  signedConsult: false,
  manualClinicalSvc: true,
  ccConsult: false,
  ccAdminConsult: false,
  errored: false,
};

export const vetInfoInput = {
	name: {
		first: "First",
		middle: "Middle-Initial",
		last: "Last",
		suffix: "not-used-atm"
	},
	dob: "01/18/1938",
	ssn: "123-44-4567",
	gender: "f"
};

export const vetICN = {
  icn: "1011491687V235101",
  errored: false,
};

export const addressEligibility = {
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
		staticElig: false,
    urgentElig: true,
		grandfathered: true,
		hardship: false,
    noVaFacility: false,
    basic: false
  },
  errored: false,
};

export const facilityInfoInput = {
  address: {
    line1: "1234 Example Rd.",
    city: "West Branch",
    state: "CO",
    zipcode: "97734",
    lat: "12345",
    lng: "23456",
  },
  svcName: "Cardiology",
  stopCode: "123",
};

export const facilityInformation = {
  errored: false,
  facilities: [{
    facilityId: "2o93423a",
    facilityName: "VA Western Colorado HCS",
    minDriveTime: 600000,
    maxDriveTime: 1200000,
    driveDistance: 0,
    waitTime: 1296000000,
  },{
    facilityId: "92374aef9",
    facilityName: "VA Eastern Colorado Health Care System (ECHCS)",
    minDriveTime: 1200000,
    maxDriveTime: 1800000,
    driveDistance: 0,
    waitTime: 1555200000,
  },{
    facilityId: "ae22394723",
    facilityName: "Golden Outpatient Clinic",
    minDriveTime: 1800000,
    maxDriveTime: 2400000,
    driveDistance: 0,
    waitTime: 3024000000,
  },{
    facilityId: "daf93438",
    facilityName: "Glenwood Springs Veterans Community Clinic",
    minDriveTime: 2400000,
    maxDriveTime: 3000000,
    driveDistance: 0,
    waitTime: -2,
  },{
    facilityId: "384723829a",
    facilityName: "Veterans Community Clinic",
    minDriveTime: 3000000,
    maxDriveTime: 3600000,
    driveDistance: 0,
    waitTime: 0,
  },{
    facilityId: "29384ffea29",
    facilityName: "Springs Veterans Clinic",
    minDriveTime: 3600000,
    maxDriveTime: 4200000,
    driveDistance: 0,
    waitTime: -1,
  },{
    facilityId: "",
    facilityName: "",
    maxDriveTime: undefined,
    driveDistance: undefined,
    waitTime: undefined,
  },{
    facilityId: "",
    facilityName: "",
    maxDriveTime: undefined,
    driveDistance: undefined,
    waitTime: undefined,
  },{
    facilityId: "",
    facilityName: "",
    maxDriveTime: undefined,
    driveDistance: undefined,
    waitTime: undefined,
  },{
    facilityId: "",
    facilityName: "",
    maxDriveTime: undefined,
    driveDistance: undefined,
    waitTime: undefined,
  }],
};

export const facilityLists = {
  driveEligible: {
    errored: false,
    facilities: [{
      facilityId: "92374aef9",
      facilityName: "VA Eastern Colorado Health Care System (ECHCS)",
      minDriveTime: 600000,
      maxDriveTime: 1200000,
      driveDistance: 0,
      waitTime: 1555200000,
    },{
      facilityId: "ae22394723",
      facilityName: "Golden Outpatient Clinic",
      minDriveTime: 1200000,
      maxDriveTime: 1800000,
      driveDistance: 0,
      waitTime: 3024000000,
    },{
      facilityId: "daf93438",
      facilityName: "Glenwood Springs Veterans Community Clinic",
      minDriveTime: 1800000,
      maxDriveTime: 2400000,
      driveDistance: 0,
      waitTime: 3024000000,
    },{
      facilityId: "384723829a",
      facilityName: "Veterans Community Clinic",
      minDriveTime: 2400000,
      maxDriveTime: 3000000,
      driveDistance: 0,
      waitTime: 3024000000,
    },{
      facilityId: "29384ffea29",
      facilityName: "Springs Veterans Clinic",
      minDriveTime: 3000000,
      maxDriveTime: 3600000,
      driveDistance: 0,
      waitTime: 3024000000,
    }]
  },
  ppms: {
    errored: false,
    facilities: [{
      facilityId: "2o93423a",
      facilityName: "VA Western Colorado HCS",
      minDriveTime: 600000,
      maxDriveTime: 600000,
      driveDistance: 12,
      waitTime: 1296000000,
    },{
      facilityId: "92374aef9",
      facilityName: "VA Eastern Colorado Health Care System (ECHCS)",
      minDriveTime: 1200000,
      maxDriveTime: 1200000,
      driveDistance: 27,
      waitTime: 1555200000,
    },{
      facilityId: "ae22394723",
      facilityName: "Golden Outpatient Clinic",
      minDriveTime: 1800000,
      maxDriveTime: 1800000,
      driveDistance: 83,
      waitTime: 3024000000,
    },{
      facilityId: "daf93438",
      facilityName: "Glenwood Springs Veterans Community Clinic",
      minDriveTime: 2400000,
      maxDriveTime: 2400000,
      driveDistance: 122,
      waitTime: -2,
    },{
      facilityId: "384723829a",
      facilityName: "Veterans Community Clinic",
      minDriveTime: 3000000,
      maxDriveTime: 3000000,
      driveDistance: 122,
      waitTime: 0,
    },{
      facilityId: "29384ffea29",
      facilityName: "Springs Veterans Clinic",
      minDriveTime: 3600000,
      maxDriveTime: 3600000,
      driveDistance: 122,
      waitTime: -1,
    },{
      facilityId: "",
      facilityName: "",
      maxDriveTime: undefined,
      driveDistance: undefined,
      waitTime: undefined,
    },{
      facilityId: "",
      facilityName: "",
      maxDriveTime: undefined,
      driveDistance: undefined,
      waitTime: undefined,
    },{
      facilityId: "",
      facilityName: "",
      maxDriveTime: undefined,
      driveDistance: undefined,
      waitTime: undefined,
    },{
      facilityId: "",
      facilityName: "",
      maxDriveTime: undefined,
      driveDistance: undefined,
      waitTime: undefined,
    }]
  },
  emptyFacilities: {
    errored: false,
    facilities: [],
  }
};

export const dynamicEligibilities = {
  facilityList: [{
    facilityId: "2o93423a",
    driveTimeElig: false,
    waitTimeElig: false
  },{
    facilityId: "92374aef9",
    driveTimeElig: false,
    waitTimeElig: false
  },{
    facilityId: "ae22394723",
    driveTimeElig: false,
    waitTimeElig: true
  },{
    facilityId: "daf93438",
    driveTimeElig: true,
    waitTimeElig: true
  },{
    facilityId: "384723829a",
    driveTimeElig: true,
    waitTimeElig: true
  },{
    facilityId: "29384ffea29",
    driveTimeElig: true,
    waitTimeElig: true
  }]
};

export const ccFormSample = {
  overallElig: false,
  bmiElig: true,
  bmiOption: "4",
  bmiReason: "Sample BMI Reason",
  vetChoice: "2",
  chosenSeoc: {
    id: "MSC_CARDIOLOGY COMPREHENSIVE_1.0.3_PRCT",
    name: "Cardiology Comprehensive",
    category: "CARDIOLOGY IMAGING",
    ccConsultName: "<generated-Cardiology-Comprehensive-Consult-Name>",
    seocServiceLine: "Medical Specialty Care",
  },
  disableSeocBtn: false,
  isModalOpen: false,
  autoFwdOption: "YES",
  noAvailElig: false,
  nextApptDate: "01/01/2019",
};

export const invalidCCForm = {
  overallElig: false,
  bmiElig: true,
  bmiOption: "4",
  bmiReason: "",
  vetChoice: "2",
  chosenSeoc: {
    id: "MSC_CARDIOLOGY COMPREHENSIVE_1.0.3_PRCT",
    name: "Cardiology Comprehensive",
    category: "CARDIOLOGY IMAGING",
    ccConsultName: "<generated-Cardiology-Comprehensive-Consult-Name>",
    seocServiceLine: "Medical Specialty Care",
  },
  disableSeocBtn: false,
  isModalOpen: false,
  autoFwdOption: "YES",
  noAvailElig: false,
  nextApptDate: "01/01/2019"
};

export const clinicalServices = {
  errored: false,
  serviceNames: [{
    svcName: "Cardiology",
    svcType: "Specialty Care",
    stopCode: "MS001",
  },{
    svcName: "Dental",
    svcType: "Specialty Care",
    stopCode: "MS002",
  },{
    svcName: "Dermatology",
    svcType: "Primary Care/Mental Health",
    stopCode: "MS003",
  },{
    svcName: "Emergency Department",
    svcType: "Specialty Care",
    stopCode: "MS004",
  },{
    svcName: "General Internal Medicine",
    svcType: "Primary Care/Mental Health",
    stopCode: "MS005",
  },{
    svcName: "Hematology",
    svcType: "Primary Care/Mental Health",
    stopCode: "MS006",
  },{
    svcName: "Magnetic Resonance Imaging (MRI)",
    svcType: "Specialty Care",
    stopCode: "MS007",
  },{
    svcName: "Podiatry",
    svcType: "Primary Care/Mental Health",
    stopCode: "MS008",
  },{
    svcName: "Primary Care Medicine",
    svcType: "Specialty Care",
    stopCode: "MS009",
  },{
    svcName: "Rheumatology/Arthritis",
    svcType: "Specialty Care",
    stopCode: "MS010",
  },{
    svcName: "Clinical Service Sample With Very Long Title - It Has One Hundred and Sixty Nine Characters - The Text Is Too Long For A Standard List - Clinical Service With Long Title",
    svcType: "Specialty Care",
    stopCode: "MS011",
  },{
    svcName: "Mock Service #12",
    svcType: "Primary Care/Mental Health",
    stopCode: "MS012",
  },{
    svcName: "Mock Service #13",
    svcType: "Specialty Care",
    stopCode: "MS013",
  },{
    svcName: "Clinical Service With Long Title, Clinical Service Sample With Very Long Title - The Text Is Too Long For A Standard List - ",
    svcType: "Specialty Care",
    stopCode: "MS014",
  },{
    svcName: "Mock Service #15",
    svcType: "Specialty Care",
    stopCode: "MS015",
  }]
};

export const clinicalService = {
    svcName: "Cardiology",
    svcType: "Specialty Care",
    stopCode: "MS001",
    driveTimeStd: "30",
    waitTimeStd: "30",
    urgency: "now"
};

export const selectedService = {
  selectedSvc: "Cardiology"
};

export const seocList = {
  errored: false,
  seocs: [{
    id: "PMR_CARDIAC REHAB_1.0.3",
    name: "Cardiac Rehab",
    category: "CARDIOLOGY REHAB",
    previewText: "VHA Office of Community Care - Standardized Episode of Care\nCardiac Rehab\n\nSEOC ID:PMR_CARDIAC REHAB_1.0.3\nDescription:This authorization covers services associated with all medical care listed below for the referred condition.\nDuration:180 days\n\nProcedural Overview:\n1. Initial outpatient evaluation and treatment for referred condition on the consult\r\n2. One visit for cardiac stress test if not already completed by VA\r\n3. Cardiac rehabilitation, no more than 3 visits per week\n\n**Additional consultations needed relevant to the patient complaint/condition require VA review and approval.\r\n**All routine medications must be faxed/sent to the VA to be dispensed by the VA.\r\nUrgent/emergent prescriptions can be provided for a 14-day supply only.     \r\nThe Veteran will be required to pay out of pocket for any urgent/emergent medications and can submit a reimbursement request to their local VA facility.",
    ccConsultName: "<generated-Cardiac-Rehab-Consult-Name>",
    seocServiceLine: "Physical Medicine and Rehabilitation",
  },{
    id: "MSC_CARDIOLOGY COMPREHENSIVE_1.0.3_PRCT",
    name: "Cardiology Comprehensive",
    category: "CARDIOLOGY IMAGING",
    previewText: "VHA Office of Community Care - Standardized Episode of Care\nCardiology Comprehensive\n\nSEOC ID:MSC_CARDIOLOGY COMPREHENSIVE_1.0.3_PRCT\nDescription:This authorization covers services associated with all medical care listed below as clinically indicated.\nDuration:180 days\n\nProcedural Overview:\n1. Initial outpatient evaluation and treatment for the referred condition\r\n2. Diagnostic imaging relevant to the referred condition on the consult\r\n3. Diagnostic studies relevant to the referred condition on the consult\r\n4. Labs and pathology relevant to the referred condition on the consult **\r\n5. One cardiac catheterization with PCI interventions and overnight observation if required\r\n6. Pre-procedure medical and cardiac clearance as indicated, to include H+P/labs, EKG, CXR\r\n7. Anesthesia consultation related to the procedure\r\n8. Procedures to include A-fib ablations, implantation of cardiac devices and emergent or urgent surgical interventions such as: cardiac bypass, TAVR, LVAD, angioplasty\r\n9. 4Inpatient emergent admission post-catheterization for medical/surgical procedure (e.g. CABG) if required including necessary follow up visits in the global period.  ***VA notification is required if emergent procedure is necessary.  Please contact your local Community Care office within 72 hours who initiated the outpatient referral so that the appropriate notification can be made on behalf of the Veteran\r\n10. Follow-up visits for this episode of care\r\n11. Cardiac rehabilitation, up to 36 visits, no more than 3x per week\n\n* If non-emergent bypass grafting is required an additional VA authorization must be acquired.\r\n*Additional consultations needed relevant to the patient complaint/condition require VA review and approval.\r\n* DME, prosthetics and orthotics will be reviewed by the VA for provision.\r\n* All routine medications must be faxed/sent to the VA to be dispensed by the VA.\r\n** Visits for additional services are not included in the frequency total.\r\nThe number of visits authorized for ancillary services are noted within its service line description above.\r\nUrgent/emergent prescriptions can be provided for a 14-day supply only.\r\nThe Veteran will be required to pay out of pocket for any urgent/emergent medications and can submit a reimbursement request to their local VA facility.",
    ccConsultName: "<generated-Cardiology-Comprehensive-Consult-Name>",
    seocServiceLine: "Medical Specialty Care",
  },{
    id: "MSC_CARDIOLOGY – TAVR PRCT_1.2.3_PRCT",
    name: "Cardiology – TAVR PRCT",
    category: "CARDIOLOGY TESTS, PROCEDURES, STUDIES",
    previewText: "VHA Office of Community Care - Standardized Episode of Care\nCardiology – TAVR PRCT\n\nSEOC ID:MSC_CARDIOLOGY – TAVR PRCT_1.2.3_PRCT\nDescription:This authorization covers services associated with all medical care listed below for the referred condition.\nDuration:180 days\n\nProcedural Overview:\n1. Initial outpatient evaluation and treatment for TAVR workup\r\n2. Diagnostic imaging relevant to the patient compliant/condition\r\n3. Diagnostic studies (Cardiac CTA, CTA for chest/abdomen/pelvis, ECHO, pulmonary function tests, EKG, walk test, fragility assessments) and labs relevant to the patient compliant/condition\r\n4. One cardiac catheterization or PCI\r\n5. Inpatient hospitalization to include: TAVR procedure, ECG, TTE or intraoperative TEE, ultrasound, electrophysiology consult, interventional cardiology therapeutic cardiac cath, pacemaker and/or ICD and/or loop implant, balloon aortic valvuloplasty, other interventions deemed necessary by authorized community provider\r\n6. Cardiology follow-up visits for this episode of care\r\n7. Post-operative diagnostic imaging as clinically required\r\n8. Post operative diagnostic studies as clinically required\r\n9. Cardiac rehabilitation\n\n*Additional consultations needed relevant to the patient complaint/condition require VA review and approval.\r\n*DME, prosthetics, and orthotics orders must be submitted to the local VA facility prosthetics department for provision.\r\n*All routine medications must be faxed/sent to the VA to be dispensed by the VA.\r\nUrgent/emergent prescriptions can be provided for a 14-day supply only.\r\nThe Veteran will be required to pay out of pocket for any urgent/emergent medications and can submit a reimbursement request to their local VA facility.",
    ccConsultName: "<generated-Cardiology-TAVR-PRCT-Consult-Name>",
    seocServiceLine: "Medical Specialty Care",
  },{
    id: "SSC_GENERAL SURGERY PRCT_1.0.2_PRCT",
    name: "General Surgery PRCT",
    category: "SURGERY GENERAL",
    previewText: "VHA Office of Community Care - Standardized Episode of Care\nGeneral Surgery PRCT\n\nSEOC ID:SSC_GENERAL SURGERY PRCT_1.0.2_PRCT\nDescription:This authorization covers services associated with all medical care listed below for the referred condition on the consult.\nDuration:180 days\n\nProcedural Overview:\n1. Initial outpatient evaluation and treatment for the referred condition indicated on the consult\r\n2. Diagnostic imaging relevant to the referred condition on the consult\r\n3. Diagnostic studies relevant to the referred condition on the consult\r\n4. Labs and pathology relevant to the referred condition on the consult\r\n5. Procedures relevant to the referred condition on the consult including but not limited to:  I&D, biopsy, lesion excision with repair, etc\r\n6. Anesthesia consultation related to the procedure\r\n7. Pre-operative medical and cardiac clearance as indicated (including H+P/labs, EKG, CXR)\r\n8. Inpatient or observation admission for surgery/procedure if indicated\r\n9. Inpatient admission or observation status for complications related to the surgery/procedure\r\n** VA notification within 72 hours to Facility Community Care Office who initiated the referral is required for complications related to the initial surgery/procedure\r\n10. Follow-up visits for this episode of care relevant to the referred condition on the consult\r\n11. Follow-up imaging as clinically indicated relevant to the referred condition on the consult\r\n12. Follow-up studies as clinically indicated relevant to the referred condition on the consult\n\n*Additional consultations needed relevant to the patient complaint/condition require VA review and approval.\r\n*DME, prosthetics and orthotics orders must be submitted to the local VA facility prosthetics department for provision.\r\n* All routine medications must be faxed/sent to the VA to be dispensed by the VA.\r\n* Urgent/emergent prescriptions can be provided for a 14-day supply only.\r\nThe Veteran will be required to pay out of pocket for any urgent/emergent medications and can submit a  reimbursement request to their local VA facility.",
    ccConsultName: "<generated-General-Surgery-PRCT-Consult-Name>",
    seocServiceLine: "Surgical Specialty Care",
  },{
    id: "MSC_PULMONARY_1.0.3_PRCT",
    name: "Pulmonary",
    category: "PULMONARY",
    previewText: "VHA Office of Community Care - Standardized Episode of Care\nPulmonary\n\nSEOC ID:MSC_PULMONARY_1.0.3_PRCT\nDescription:This authorization covers services associated with all medical care listed below for the referred condition.\nDuration:120 days\n\nProcedural Overview:\n1. Initial outpatient evaluation and treatment for the referred condition on consult\r\n2. Diagnostic imaging relevant to the referred condition on the consult\r\n3. Diagnostic studies relevant to the referred condition on the consult including but not limited to: PFT, Lung volumes, or other maneuvers (bronchial challenge, inspiratory and expiratory pressures, etc)\r\n4. Labs and pathology relevant to the referred condition on the consult\r\n5. Procedures including but not limited to: bronchoscopy and/or EBUS, navigational bronchoscopy, thoracentesis,chest tube placement\r\n6. Inpatient or observation admission for procedure if indicated\r\n7. Inpatient admission or observation status for complications related to the procedure\r\n8. Follow-up visits for this episode of care\r\n9. Follow-up imaging relevant to the referred condition on the consult\n\n*Additional consultations needed relevant to the patient complaint/condition require VA review and approval.\r\n*DME, prosthetics and orthotics orders must be submitted to the local VA facility prosthetics department for provision.\r\n*All routine medications must be faxed/sent to the VA to be dispensed by the VA.\r\nUrgent/emergent prescriptions can be provided for a 14-day supply only.\r\nThe Veteran will be required to pay out of pocket for any urgent/emergent medications and can submit a reimbursement request to their local VA facility.",
    ccConsultName: "<generated-Pulmonary-Consult-Name>",
    seocServiceLine: "Medical Specialty Care",
  },{
    id: "PMR_CARDIAC REHAB_1.0.3-NO_AF",
    name: "Cardiac Rehab (No-AF)",
    category: "CARDIOLOGY REHAB",
    previewText: "VHA Office of Community Care - Standardized Episode of Care\nCardiac Rehab\n\nSEOC ID:PMR_CARDIAC REHAB_1.0.3\nDescription:This authorization covers services associated with all medical care listed below for the referred condition.\nDuration:180 days\n\nProcedural Overview:\n1. Initial outpatient evaluation and treatment for referred condition on the consult\r\n2. One visit for cardiac stress test if not already completed by VA\r\n3. Cardiac rehabilitation, no more than 3 visits per week\n\n**Additional consultations needed relevant to the patient complaint/condition require VA review and approval.\r\n**All routine medications must be faxed/sent to the VA to be dispensed by the VA.\r\nUrgent/emergent prescriptions can be provided for a 14-day supply only.     \r\nThe Veteran will be required to pay out of pocket for any urgent/emergent medications and can submit a reimbursement request to their local VA facility.",
    ccConsultName: "",
    seocServiceLine: "Physical Medicine and Rehabilitation",
  }]
};

export default MockDstApi;
