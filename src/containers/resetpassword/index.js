import { Formik } from "formik";
import React from "react";
import LogoImg from "../../images/Logo.svg";

const ResetPassword = () => {
  return (
    <div className="login_container">
      <div className="login_detail">
        <div className="login_logo">
          <img src={LogoImg} alt="logo" />
        </div>
        <div className="login_heading">
          <h1>Reset Your Password ?</h1>
        </div>
        <Formik initialValues={{ new_password: "" }} validateOnChange={false}>
          {}
        </Formik>
      </div>
    </div>
  );
};

export default ResetPassword;
