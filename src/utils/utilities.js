import { ALLOWED_FILE_TYPES } from "utils/constants";

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

export const getImageWidthHeight = ({ url }) => {
  let str = url.substring(url.indexOf("height"), url.lastIndexOf("px") + 2);
  str = str.split("-");
  return {
    imgWidth: +str[3].replace("px", ""),
    imgHeight: +str[1].replace("px", ""),
  };
};

export const isValidHttpUrl = (string) => {
  let url;
  try {
    url = new URL(string);
  } catch (_) {
    return false;
  }
  return url.protocol === "http:" || url.protocol === "https:";
};
