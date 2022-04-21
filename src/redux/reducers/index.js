import { combineReducers } from "redux";
import loginSignup from "./loginSignup";
import problems from "./problems";
import resetPassword from "./resetPassword";

export default combineReducers({
  loginSignup,
  problems,
  resetPassword,
});
