import { useHistory } from "react-router-dom";
import { Formik } from "formik";
import { signupValidationSchema } from "utils/validations";
import { signupUser } from "redux/actions/loginSignup";
import { setEasyAssignUser } from "utils/utilities";
import { LoaderWithinWrapper } from "components/global/loader";
import { useDispatch, useSelector } from "react-redux";
import { signupSelector } from "redux/selectors";
import { ReactComponent as MailIconSvg } from "../../images/msg.svg";
import { ReactComponent as PasswordIconSvg } from "../../images/password.svg";

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
    <div className="login_container">
      <div className="login_detail">
        {signupStatus === "loading" && (
          <LoaderWithinWrapper text="creating user..." />
        )}
        {signupStatus === "failed" && <div>{signupErrorMsg}</div>}
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
              <form onSubmit={handleSubmit}>
                <div className="field_input">
                  <input
                    name="firstName"
                    placeholder="First name"
                    type="text"
                    onChange={handleChange}
                    error={errors.firstName !== undefined}
                  />
                  {errors.firstName !== undefined && (
                    <span className="input-error-text">{errors.firstName}</span>
                  )}
                </div>
                <div className="field_input">
                  <input
                    name="lastName"
                    placeholder="Last name"
                    type="text"
                    onChange={handleChange}
                    error={errors.lastName !== undefined}
                  />
                  {errors.lastName !== undefined && (
                    <span className="input-error-text">{errors.lastName}</span>
                  )}
                </div>
                <div className="field_input">
                  <label>Email</label>
                  <span className="field_icon">
                    <MailIconSvg />
                  </span>
                  <input
                    name="email"
                    placeholder="Email"
                    type="text"
                    onChange={handleChange}
                    error={errors.email !== undefined}
                  />
                  {errors.email !== undefined && (
                    <span className="input-error-text">{errors.email}</span>
                  )}
                </div>
                <div className="field_input">
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
                <button type="submit">Submit</button>
              </form>
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
      </div>
    </div>
  );
};

export default Signup;
