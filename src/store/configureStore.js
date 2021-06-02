import { createStore, compose, applyMiddleware } from "redux";
import reduxImmutableStateInvariant from "redux-immutable-state-invariant";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "../reducers";

/* istanbul ignore next */
function configureStoreProd(initialState) {
  const middlewares = [
    // thunk middleware can also accept an extra argument to be passed to each thunk action
    // https://github.com/gaearon/redux-thunk#injecting-a-custom-argument
    thunk,
  ];

  return createStore(rootReducer, initialState, compose(
      applyMiddleware(...middlewares)
    )
  );
}

/* istanbul ignore next */
function configureStoreDev(initialState) {
  const middlewares = [
    // Redux middleware that spits an error on you when you try to mutate your state inside or between dispatches.
    reduxImmutableStateInvariant({
      ignore: [], // For parts of the store that are overly complex to check
    }),

    // thunk middleware can also accept an extra argument to be passed to each thunk action
    // https://github.com/gaearon/redux-thunk#injecting-a-custom-argument
    thunk,
  ];

  const composeEnhancers = composeWithDevTools || compose; // add support for Redux dev tools
  const store = createStore(rootReducer, initialState, composeEnhancers(
      applyMiddleware(...middlewares)
    )
  );
  console.log(store.getState());
  console.log("My store contents:");
  /* istanbul ignore if */
  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept("../reducers", () => {
      const nextReducer = require("../reducers").default; // eslint-disable-line global-require
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}

const configureStore = process.env.NODE_ENV === "production" ? configureStoreProd : configureStoreDev;

export default configureStore;
