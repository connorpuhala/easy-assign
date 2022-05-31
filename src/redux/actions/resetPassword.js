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
      return dispatch({
        type: types.RESET_PASSWORD_LINK_SUCCESS,
        payload : results.message,
      });
    } catch (error) {
      return dispatch({
        type: types.RESET_PASSWORD_LINK_ERROR,
        payload: error.message,
      });
    }
  };
};

export const resetPassword = (values) => {
  return async (dispatch) => {
    dispatch({
      type: types.RESET_PASSWORD_REQUEST,
    });
    try {
      const results = await API.resetPassword(values);
      return dispatch({
        type: types.RESET_PASSWORD_SUCCESS,
        payload: results,
      });
    } catch (error) {
      return dispatch({
        type: types.RESET_PASSWORD_ERROR,
        payload: error.message,
      });
    }
  };
};
