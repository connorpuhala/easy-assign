import fetchService from "./index";

export const getAllTags = () =>
  fetchService({
    method: "GET",
    url: "tags",
    isUrl: false,
    myHeaders: {
      "Content-Type": "application/json",
    },
  });

export const getProblemsByTags = (body) =>
  fetchService({
    method: "POST",
    url: "problems/tags",
    body: JSON.stringify(body),
    isUrl: false,
    myHeaders: {
      "Content-Type": "application/json",
    },
  });

export const createProblem = (body) =>
  fetchService({
    method: "POST",
    url: "problems",
    body: JSON.stringify(body),
    isUrl: false,
    myHeaders: {
      "Content-Type": "application/json",
    },
  });

export const editProblem = (body, id) =>
  fetchService({
    method: "PUT",
    url: `problems/${id}`,
    body: JSON.stringify(body),
    isUrl: false,
    myHeaders: {
      "Content-Type": "application/json",
    },
  });

export const deleteProblem = (id) =>
  fetchService({
    method: "DELETE",
    url: `problems/${id}`,
    isUrl: false,
    myHeaders: {
      "Content-Type": "application/json",
    },
  });

export const createNewTag = (body) =>
  fetchService({
    method: "POST",
    url: "tags",
    body: JSON.stringify(body),
    isUrl: false,
    myHeaders: {
      "Content-Type": "application/json",
    },
  });

export const deleteTag = (id) =>
  fetchService({
    method: "DELETE",
    url: `tags/${id}`,
    isUrl: false,
    myHeaders: {
      "Content-Type": "application/json",
    },
  });
