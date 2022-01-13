import * as Yup from "yup";

export const loginValidationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email Required"),
  password: Yup.string()
    // .min(6, "Password must be of 6 characters in length")
    .max(50, "Password Too Long! Msut be of 50 characters max")
    .required("Password Required"),
});

export const signupValidationSchema = Yup.object().shape({
  firstName: Yup.string().required("First name required"),
  lastName: Yup.string().required("Last name required"),
  email: Yup.string().email("Invalid email").required("Email required"),
  password: Yup.string()
    // .min(6, "Password must be of 6 characters in length")
    .max(50, "Password Too Long! Msut be of 50 characters max")
    .required("Password required"),
});
