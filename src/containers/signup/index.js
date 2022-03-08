import { Grid, Button, Form, Message } from "semantic-ui-react";
import { useHistory } from "react-router-dom";
import { Formik } from "formik";
import { signupValidationSchema } from "utils/validations";
import { signupUser } from "redux/actions/loginSignup";
import { setEasyAssignUser } from "utils/utilities";
import { LoaderWithinWrapper } from "components/global/loader";
import { useDispatch, useSelector } from "react-redux";
import { signupSelector } from "redux/selectors";

const Signup = ({}) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { signupStatus, signupErrorMsg } = useSelector(signupSelector);

  const signupHandler = ({ values }) => {
    dispatch(signupUser(values)).then((action) => {
      if (action.type === "USER_SIGNUP_SUCCESS") {
        setEasyAssignUser(action.payload);
        history.push("/problems");
      }
    });
  };

  return (
    <Grid centered columns={4}>
      {signupStatus === "loading" && (
        <LoaderWithinWrapper text="creating user..." />
      )}
      {signupStatus === "failed" && (
        <Message error header="" content={signupErrorMsg} />
      )}
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          type: "student",
        }}
        validationSchema={signupValidationSchema}
        onSubmit={(values, { setSubmitting }) => {
          signupHandler({ values });
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
                  name="firstName"
                  placeholder="First name"
                  type="text"
                  onChange={handleChange}
                  error={errors.firstName !== undefined}
                />
                {errors.firstName !== undefined && (
                  <span className="input-error-text">{errors.firstName}</span>
                )}
              </Form.Field>
              <Form.Field>
                <Form.Input
                  name="lastName"
                  placeholder="Last name"
                  type="text"
                  onChange={handleChange}
                  error={errors.lastName !== undefined}
                />
                {errors.lastName !== undefined && (
                  <span className="input-error-text">{errors.lastName}</span>
                )}
              </Form.Field>
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
        Already have an account?{" "}
        <a
          href="/create-account"
          onClick={(e) => {
            e.preventDefault();
            history.push("/login");
          }}
        >
          Login
        </a>
      </span>
    </Grid>
  );
};

export default Signup;
