// sendResetPasswordLink
import types from "redux/types/resetPassword";
import * as API from "../../services";

export const sendResetPasswordLink = (values) => {
  return async (dispatch) => {
    dispatch({
      type: types.RESET_PASSWORD_LINK_REQUEST,
    });
    try {
      const results = await API.sendResetPasswordLink(values);
      console.log("results ====", results);
      return dispatch({
        type: types.RESET_PASSWORD_LINK_SUCCESS,
      });
    } catch (error) {
      console.log("errorrr sendResetPasswordLink", error);
      return dispatch({
        type: types.RESET_PASSWORD_LINK_ERROR,
        payload: error.message,
      });
    }
  };
};
