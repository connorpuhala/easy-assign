import types from "../types/loginSignup";
const initialState = {
  isLogging: false,
  user: null,
  isLoggedIn: false,
  isSigningUp: false,
  isSignUpError: false,
  isSignUpErrorMsg: "",
  isLoggingError: false,
  isLoggingErrorMsg: "",
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
          ...action.payload.data,
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
        isSigningUp: true,
        isSignUpError: false,
        isSignUpErrorMsg: "",
      };
    case types.USER_SIGNUP_SUCCESS:
      return {
        ...state,
        isSigningUp: false,
        user: {
          ...action.payload.data,
        },
        isLoggedIn: true,
      };

    case types.USER_SIGNUP_ERROR:
      return {
        ...state,
        isSigningUp: false,
        user: null,
        isLoggedIn: false,
        isSignUpError: true,
        isSignUpErrorMsg: action.payload,
      };

    case types.CLEAR_ERROR_STATES:
      // debugger
      return {
        ...state,
        isSignUpErrorMsg: "",
        isSignUpError: false,
        isLoggingError: false,
        isLoggingErrorMsg: "",
      };
    case types.CHANGE_AUTH_STATES:
      return {
        ...state,
        isLogging: false,
        isLoggedIn: true,
        user: {
          ...action.payload,
        },
      };
    default:
      return state;
  }
};


export default loginSignup
