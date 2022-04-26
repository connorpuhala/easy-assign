import fetchService from "services";

export const sendResetPasswordLink = (values) =>
  fetchService({
    method: "POST",
    url: "users/send-reset-password-link",
    body: JSON.stringify(values),
    isUrl: false,
    myHeaders: {
      "Content-Type": "application/json",
    },
  });

export const resetPassword = (values) =>
  fetchService({
    method: "POST",
    url: "users/reset-password",
    body: JSON.stringify(values),
    isUrl: false,
    myHeaders: {
      "Content-Type": "application/json",
    },
  });
