import fetchService from "./index";

export const loginUser = (values) =>
  fetchService({
    method: "POST",
    url: "users/login",
    body: JSON.stringify(values),
    isUrl: false,
    myHeaders: {
      "Content-Type": "application/json",
    },
  });

export const signUser = (values) =>
  fetchService({
    method: "POST",
    url: "users/",
    body: JSON.stringify(values),
    isUrl: false,
    myHeaders: {
      "Content-Type": "application/json",
    },
  });
