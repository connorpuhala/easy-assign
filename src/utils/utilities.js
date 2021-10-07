export const setEasyAssignUser = (data) => {
  localStorage.setItem("easy-assign-user", data);
};

export const getEasyAssignUser = (data) => {
  let user = localStorage.getItem("easy-assign-user");
  if (user) return JSON.parse(user);
  else return null;
};
