function ConsultInfoReducer = (state=initialState.consultInfo, action) => {

    switch (action.type) {
        case LOAD_CONSULT_INFO:
          return state;
        default:
           return state;
    }
};