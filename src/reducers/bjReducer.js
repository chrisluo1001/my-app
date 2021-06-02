import initialState from "./initialState";

function bjReducer(state = initialState.articles, action) {
    switch (action.type) {
        case "ADD_ARTICLE" :
            return Object.assign({}, state, {
                articles: state.concat(action.payload)
            });
        default: return state;    
    }
}

export default bjReducer;