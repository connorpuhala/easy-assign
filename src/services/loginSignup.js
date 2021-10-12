import fetchService from './index';

export const loginUser = ({ values }) => fetchService({
  method: 'POST',
  url: '/easy-assign',
  body: JSON.stringify(values),
  isUrl: false,
  myHeaders: {
    'Content-Type': 'application/json',
  },
});
