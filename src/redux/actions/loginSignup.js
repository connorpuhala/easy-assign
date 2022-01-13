import types from "../types/loginSignup";
import * as API from "../../services";
// import { sleep } from "utils/utilities";
import { loggedInUser } from "mock_data"

export const loginUser = (values) => {
  return async (dispatch) => {
    dispatch({
      type: types.USER_LOGIN_REQUEST,
    });
    try {
      const { results, error } = await API.loginUser(values);
      console.log("results ====", results)
      // await sleep(2000);
      return dispatch({
        type: types.USER_LOGIN_SUCCESS,
        payload: results[0],
      });
    } catch (error) {
      console.log("errorrr loginUser", error);
      return dispatch({
        type: types.USER_LOGIN_ERROR,
        payload: error.message,
      });
    }
  };
};

export const signupUser = (values) => {
  return async (dispatch) => {
    dispatch({
      type: types.USER_SIGNUP_REQUEST,
    });
    try {
      const { results, error } = await API.signUser(values);
      console.log("results ====", results)
      // await sleep(2000);
      return dispatch({
        type: types.USER_SIGNUP_SUCCESS,
        payload: results[0],
      });
    } catch (error) {
      console.log("errorrr loginUser", error);
      return dispatch({
        type: types.USER_SIGNUP_ERROR,
        payload: error.message,
      });
    }
  };
};
