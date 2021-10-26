import { ALLOWED_FILE_TYPES } from "utils/constants"

export const setEasyAssignUser = (data) => {
  localStorage.setItem("easy-assign-user", JSON.stringify(data));
};

export const getEasyAssignUser = () => {
  let user = localStorage.getItem("easy-assign-user");
  if (user) return JSON.parse(user);
  else return null;
};

export const sleep = (t) => new Promise((resolve) => setTimeout(resolve, t));

export const checkMimetype = (files) => {
  let p = [];
  Object.keys(files).forEach(function (key) {
    let promise = new Promise((resolve, reject) => {
      if (ALLOWED_FILE_TYPES.includes(files[key].type.split("/")[1])) {
        resolve(files[key]);
      } else {
        reject(files[key]);
      }
    });
    p.push(promise);
  });
  return p;
};
