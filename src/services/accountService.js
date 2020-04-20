import axios from 'axios';

const accountCall = axios.create({
  baseURL: 'http://localhost:5000',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export default {
  Login(user) {
    return accountCall.post('/api/Account/Login', user);
  },
  ResetPassword(userPassword) {
    return accountCall.post('/api/Account/ResetPassword', userPassword);
  },
  ChangePassword(userPassword) {
    return accountCall.post('/api/Account/ChangePassword', userPassword, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  },
};
