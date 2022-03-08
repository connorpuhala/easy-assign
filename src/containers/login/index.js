import { Grid, Button, Form, Message } from "semantic-ui-react";
import { useHistory } from "react-router-dom";
import { Formik } from "formik";
import { loginValidationSchema } from "utils/validations";
import { loginUser } from "redux/actions/loginSignup";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setEasyAssignUser } from "utils/utilities";
import { LoaderWithinWrapper } from "components/global/loader";
import LogoImg from "../../images/Logo.svg";
import { ReactComponent as MailIconSvg } from "../../images/msg.svg";
import { ReactComponent as PasswordIconSvg } from "../../images/password.svg";
const Login = ({
  loginUser,
  isLogging,
  isLoggedIn,
  isLoggingError,
  isLoggingErrorMsg,
}) => {
  const history = useHistory();

  const loginHandler = ({ values }) => {
    loginUser(values).then((action) => {
      if (action.type === "USER_LOGIN_SUCCESS") {
        setEasyAssignUser(action.payload);
        history.push("/problems");
      } else {
        console.log("login error----", action);
      }
    });
  };

  return (
    <div className="login_container">
      <div className="login_detail">
        <div className="login_logo">
          <img src={LogoImg} alt="logo" />
        </div>
        <div class="login_heading">
          <h1>Login your account</h1>
        </div>
        {isLogging && <LoaderWithinWrapper text="Logging in..." />}
        {isLoggingError && (
          <Message error header="" content={isLoggingErrorMsg} />
        )}
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={loginValidationSchema}
          onSubmit={(values, { setSubmitting }) => {
            loginHandler({ values });
          }}
          validateOnChange={false}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            /* and other goodies */
          }) => {
            return (
              <form onSubmit={handleSubmit}>
                <div className="field_input">
                  <label>Email</label>
                  <span className="field_icon">
                    <MailIconSvg />
                  </span>
                  <input
                    name="email"
                    placeholder="Your email address"
                    type="text"
                    onChange={handleChange}
                    error={errors.email !== undefined}
                  />
                  {errors.email !== undefined && (
                    <span className="input-error-text">{errors.email}</span>
                  )}
                </div>
                <div className="field_input mb-0">
                  <label>Password</label>
                  <span className="field_icon">
                    <PasswordIconSvg />
                  </span>
                  <input
                    name="password"
                    placeholder="Password"
                    type="password"
                    onChange={handleChange}
                    error={errors.password !== undefined}
                  />
                  {errors.password !== undefined && (
                    <span className="input-error-text">{errors.password}</span>
                  )}
                </div>
                <div className="remeber_me_forgot">
                  <div className="remeber_check">
                    <div className="check_box login-check">
                      <div className="geners_check">
                        <input
                          type="checkbox"
                          id="check"
                          className="custom-control-input"
                        />
                        <label for="check" className="geners_chek_label">
                          Remember me
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="forgot">
                    <a href="javascript:;">Forgot password?</a>
                  </div>
                </div>
                <button primary type="submit" className="login_btn">
                  Login
                </button>
              </form>
            );
          }}
        </Formik>
        <span className="accont_info">
          Don't have account?
          <a
            href="/create-account"
            onClick={(e) => {
              e.preventDefault();
              history.push("/create-account");
            }}
          >
            Create Account
          </a>
        </span>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  let { isLogging, isLoggedIn, isLoggingError, isLoggingErrorMsg } =
    state.loginSignup;
  return { isLogging, isLoggedIn, isLoggingError, isLoggingErrorMsg };
};
const mapDispatch = (dispatch) =>
  bindActionCreators(
    {
      loginUser,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatch)(Login);
