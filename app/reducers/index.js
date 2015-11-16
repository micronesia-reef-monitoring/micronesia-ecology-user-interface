import {combineReducers} from "redux";

import session from "./session_reducer";
import application from "./application_reducer";
import reports from "./report_reducer";

const rootReducer = combineReducers({
  session,
  application,
  reports
});

export default rootReducer;
