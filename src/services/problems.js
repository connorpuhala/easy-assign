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

export const getProblemsByTags = ({ tags }) => fetchService({
  method: 'POST',
  url: '/get-all-tags',
  body: JSON.stringify(tags),
  isUrl: false,
  myHeaders: {
    'Content-Type': 'application/json',
  },
});
