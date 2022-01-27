import types from "../types/loginSignup";
const initialState = {
  isLogging: false,
  user: null,
  isLoggedIn: false,
  isLoggingError: false,
  isLoggingErrorMsg: "",

  signupStatus: "idle",
  signupErrorMsg: "",
};

const loginSignup = (state = initialState, action) => {
  switch (action.type) {
    //
    // USER_LOGIN
    //
    case types.USER_LOGIN_REQUEST:
      return {
        ...state,
        isLogging: true,
        isLoggingError: false,
        isLoggingErrorMsg: "",
      };
    case types.USER_LOGIN_SUCCESS:
      return {
        ...state,
        isLogging: false,
        isLoggedIn: true,
        user: {
          ...action.payload,
        },
      };

    case types.USER_LOGIN_ERROR:
      return {
        ...state,
        isLogging: false,
        isLoggingError: true,
        isLoggingErrorMsg: action.payload,
        user: null,
      };

    //
    // USER_SIGNUP
    //
    case types.USER_SIGNUP_REQUEST:
      return {
        ...state,
        signupStatus: "loading",
      };
    case types.USER_SIGNUP_SUCCESS:
      console.log("USER_SIGNUP_SUCCESS", action.payload);
      return {
        ...state,
        signupStatus: "idle",
      };

    case types.USER_SIGNUP_ERROR:
      return {
        ...state,
        signupStatus: "failed",
        signupErrorMsg: action.payload,
      };

    // USER_LOGOUT
    case types.USER_LOGOUT:
      return {
        ...state,
        user: null,
        isLoggedIn: false,
      };
    default:
      return state;
  }
};

export default loginSignup;
