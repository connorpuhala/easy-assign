import { API_ENDPOINT } from "utils/constants";

const fetchService = ({ method, url, body, myHeaders }) =>
  fetch(`${API_ENDPOINT}${url}`, {
    method, // *GET, POST, PUT, DELETE, etc.
    headers: {
      ...myHeaders,
      Accept: "application/json",
      // Authorization: `Bearer ${Token}`,
    },
    body,
  })
    .then((res) => res.json())
    .then((response) => {
      // console.log("response----", response)
      return response;
      // if (response.meta && response.meta.status === 200) {
      //   return response;
      // }
      // if (response.error === false) {
      //   return response;
      // }
    })
    .catch((error) => {
      console.log("@fetchService error =>", { url, error });
      throw error;
    });

export * from "./loginSignup";
export * from "./problems"
export default fetchService;
