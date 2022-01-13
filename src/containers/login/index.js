import { Grid, Button, Form, Message } from "semantic-ui-react";
import { useHistory } from "react-router-dom";
import { Formik } from "formik";
import { loginValidationSchema } from "utils/validations";
import { loginUser } from "redux/actions/loginSignup";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setEasyAssignUser } from "utils/utilities";
import { LoaderWithinWrapper } from "components/global/loader";
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
    <Grid centered columns={4} style={{ paddingTop: "20px" }}>
      <Grid.Column>
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
              <Form onSubmit={handleSubmit}>
                <Form.Field>
                  <Form.Input
                    name="email"
                    placeholder="Email"
                    type="text"
                    onChange={handleChange}
                    error={errors.email !== undefined}
                  />
                  {errors.email !== undefined && (
                    <span className="input-error-text">{errors.email}</span>
                  )}
                </Form.Field>
                <Form.Field>
                  <Form.Input
                    name="password"
                    placeholder="Password"
                    type="password"
                    onChange={handleChange}
                    error={errors.password !== undefined}
                  />
                  {errors.password !== undefined && (
                    <span className="input-error-text">{errors.password}</span>
                  )}
                </Form.Field>
                <Button primary type="submit">
                  Submit
                </Button>
              </Form>
            );
          }}
        </Formik>
        <span>
          Don't have account?{" "}
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
      </Grid.Column>
    </Grid>
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
