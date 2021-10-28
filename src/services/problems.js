import fetchService from './index';

export const getAllTags = ({ values }) => fetchService({
  method: 'POST',
  url: '/get-all-tags',
  body: JSON.stringify(values),
  isUrl: false,
  myHeaders: {
    'Content-Type': 'application/json',
  },
});

export const getProblemsByTags = (body) => fetchService({
  method: 'POST',
  url: 'problems-by-tag-ids',
  body: JSON.stringify(body),
  isUrl: false,
  myHeaders: {
    'Content-Type': 'application/json',
  },
});

export const createProblem = (body) => fetchService({
  method: 'POST',
  url: 'problems',
  body: JSON.stringify(body),
  isUrl: false,
  myHeaders: {
    'Content-Type': 'application/json',
  },
});
