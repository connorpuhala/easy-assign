import types from "redux/types/resetPassword";
const initialState = {
  resetPasswordLinkStatus: "idle",
  resetPasswordLinkErrorMsg: "",

  resetPasswordStatus: "idle",
  resetPasswordErrorMsg: "",
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
    /// reset password
    case types.RESET_PASSWORD_REQUEST:
      return {
        ...state,
        resetPasswordStatus: "loading",
      };
    case types.RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        resetPasswordStatus: "idle",
      };
    case types.RESET_PASSWORD_ERROR:{
      console.log("actionegdfhfg  ")
      return {
        ...state,
        resetPasswordStatus: "failed",
        resetPasswordErrorMsg: action.payload,
      };
}
    default:
      return state;
  }
};
export default resetPassword;
