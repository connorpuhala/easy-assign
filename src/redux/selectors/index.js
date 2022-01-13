export const signupSelector = (state) => {
  return {
    signupStatus: state.loginSignup.signupStatus,
    signupErrorMsg: state.loginSignup.signupErrorMsg,
  };
};
