export const setEasyAssignUser = (data) => {
  localStorage.setItem("easy-assign-user", JSON.stringify(data));
};

export const getEasyAssignUser = () => {
  let user = localStorage.getItem("easy-assign-user");
  if (user) return JSON.parse(user);
  else return null;
};

export const sleep = (t) => new Promise((resolve) => setTimeout(resolve, t));
