import { Formik } from "formik";
import React from "react";
import { useHistory } from "react-router-dom";
import { forgetPasswordValidationSchema } from "utils/validations";
import LogoImg from "../../images/Logo.svg";
import { ReactComponent as MailIconSvg } from "../../images/msg.svg";

const ForgotPassword = () => {
  const history = useHistory();
  const senRequestHandler = ({ values }) => {
    console.log("call forget password api here");
  };

  return (
    <div className="login_container">
      <div className="login_detail">
        <div className="login_logo">
          <img src={LogoImg} alt="logo" />
        </div>
        <div className="login_heading">
          <h1>Forgot Your Password ?</h1>
          <p>No Worries! Enter your email and we will send you reset link </p>
        </div>
        <Formik
          initialValues={{ email: "" }}
          validationSchema={forgetPasswordValidationSchema}
          onSubmit={(values) => {
            senRequestHandler({ values });
          }}
          validateOnChange={false}
        >
          {({ errors, handleChange, handleSubmit }) => {
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
                <button primary type="submit" className="login_btn">
                  Send Request
                </button>
              </form>
            );
          }}
        </Formik>
        <span className="accont_info">
          Go back to
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

export default ForgotPassword;
