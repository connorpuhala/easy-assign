import types from "../types/loginSignup";
const initialState = {
  isLogging: false,
  user: null,
  isLoggedIn: false,
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

    default:
      return state;
  }
};

export default loginSignup;
