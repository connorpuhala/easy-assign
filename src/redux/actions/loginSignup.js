import types from "../types/loginSignup";
// import * as API from "../../services";
import { sleep } from "utils/utilities";

export const loginUser = ({ values }) => {
  return async (dispatch) => {
    dispatch({
      type: types.USER_LOGIN_REQUEST,
    });
    try {
      // const { data, error } = await API.loginUser({ values });
      await sleep(2000);
      let user = {
        id: "123",
        token: "123456",
        userRole: "admin",
        username: "abc",
        email: "abc@gmail.com",
      };
      return dispatch({
        type: types.USER_LOGIN_SUCCESS,
        payload: user,
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
