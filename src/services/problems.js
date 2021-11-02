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
    url: "problems-by-tag-ids",
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
