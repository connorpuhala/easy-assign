import { combineReducers } from "redux";
import loginSignup from "./loginSignup";
import problems from "./problems";

export default combineReducers({
  loginSignup,
  problems,
});
