import { Formik } from "formik";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import LogoImg from "../../images/Logo.svg";
import { ReactComponent as PasswordIconSvg } from "../../images/password.svg";
import { resetPassword } from "redux/actions/resetPassword";
import { resetPasswordValidationSchema } from "utils/validations";
import { useHistory } from "react-router-dom";
import createNotification from "components/global/createNotification";
import { LoaderWithinWrapper } from "components/global/loader";

const ResetPassword = ({
  resetPassword,
  resetPasswordStatus,
  resetPasswordErrorMsg,
}) => {
  const history = useHistory();
  const resetPasswordHandler = ({ values }) => {
    const token = history?.location?.pathname.split("/").pop();
    resetPassword({ ...values, token }).then((action) => {
      if (action.type === "RESET_PASSWORD_SUCCESS") {
        console.log("action=", action);
        createNotification({
          type: "success",
          msg: action.payload.message,
          timeout: 2000,
        });
        history.push("/login");
      } else {
        createNotification({
          type: "danger",
          msg: action.payload,
          timeout: 2000,
        });
      }
    });
  };


  return (
    <div className="login_container">
      <div className="login_detail">
        <div className="login_logo">
          <img src={LogoImg} alt="logo" />
        </div>
        <div className="login_heading">
          <h1>Reset Your Password </h1>
        </div>
        {resetPasswordStatus === "loading" && <LoaderWithinWrapper />}
        {resetPasswordErrorMsg && <div>{resetPasswordErrorMsg}</div>}

        <Formik
          initialValues={{ new_password: "" }}
          validateOnChange={false}
          onSubmit={(values) => {
            resetPasswordHandler({ values });
          }}
          validationSchema={resetPasswordValidationSchema}
        >
          {({ errors, handleChange, handleSubmit }) => {
            return (
              <form onSubmit={handleSubmit}>
                <div className="field_input">
                  <label>New Password</label>
                  <span className="field_icon">
                    <PasswordIconSvg />
                  </span>
                  <input
                    name="new_password"
                    placeholder="Password"
                    type="password"
                    onChange={handleChange}
                    error={errors.new_password !== undefined}
                  />
                  {errors.new_password !== undefined && (
                    <span className="input-error-text">
                      {errors.new_password}
                    </span>
                  )}
                </div>
                <button primary type="submit" className="login_btn">
                  Reset Password
                </button>
              </form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  let { resetPasswordStatus, resetPasswordErrorMsg } = state.resetPassword;
  return { resetPasswordStatus, resetPasswordErrorMsg };
};

const mapDispatch = (dispatch) =>
  bindActionCreators(
    {
      resetPassword,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatch)(ResetPassword);
