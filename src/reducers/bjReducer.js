const initialState = {
    articles: []
};

function bjReducer(state = initialState, action) {
    switch (action.type) {
        case "ADD_ARTICLE" :
            return Object.assign({}, state, {
                articles: state.articles.concat(action.payload)
            });
        default: return state;    
    }
}

export default bjReducer;