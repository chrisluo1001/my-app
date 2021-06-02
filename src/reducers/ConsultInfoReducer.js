import initialState from "./initialState";

const ConsultInfoReducer = (state=initialState.consultInfo, action) => {
  switch (action.type) {
    case "SET_CONSULT_INFO":
      return {
        ...action.consultInfo,
      };
    default:
      return {
        ...state,
      };
  }
};

export default ConsultInfoReducer;