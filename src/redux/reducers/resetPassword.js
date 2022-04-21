import types from "redux/types/resetPassword";
const initialState = {
  resetPasswordLinkStatus: "idle",
  resetPasswordLinkErrorMsg: "",
};
const resetPassword = (state = initialState, action) => {
  switch (action.type) {
    case types.RESET_PASSWORD_LINK_REQUEST:
      return {
        ...state,
        resetPasswordLinkStatus: "loading",
      };
    case types.RESET_PASSWORD_LINK_SUCCESS:
      return {
        ...state,
        resetPasswordLinkStatus: "idle",
      };
    case types.RESET_PASSWORD_LINK_ERROR:
      return {
        ...state,
        resetPasswordLinkStatus: "failed",
        resetPasswordLinkErrorMsg: action.payload,
      };
    default:
      return state;
  }
};
export default resetPassword;
