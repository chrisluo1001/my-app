import { combineReducers } from "redux";
import articles from "./bjReducer";
import counter from "./counterSlice";
import consultInfo from "./ConsultInfoReducer";
import eligibility from "./EligibilityReducer";
import workflowList from "./WorkflowListReducer";
import address from "./AddressReducer";

const rootReducer = combineReducers({
  articles,
  counter,
  consultInfo,
  workflowList,
  eligibility,
  address,
});

export default rootReducer;