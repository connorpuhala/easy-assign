import types from "../types/loginSignup";
// import * as API from "../../services";
import { sleep } from "utils/utilities";
import { loggedInUser } from "mock_data"

export const loginUser = ({ values }) => {
  return async (dispatch) => {
    dispatch({
      type: types.USER_LOGIN_REQUEST,
    });
    try {
      // const { data, error } = await API.loginUser({ values });
      await sleep(2000);
      return dispatch({
        type: types.USER_LOGIN_SUCCESS,
        payload: loggedInUser,
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
