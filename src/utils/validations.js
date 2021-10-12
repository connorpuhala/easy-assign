import * as Yup from "yup";

export const loginValidationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email Required"),
  password: Yup.string()
    .min(6, "Password must be of 6 characters in length")
    .max(50, "Password Too Long! Msut be of 50 characters max")
    .required("Password Required"),
});
