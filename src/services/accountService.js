import axios from 'axios';

const accountCall = axios.create();
const token = localStorage.getItem('token');

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
        Authorization: `Bearer ${token}`,
      },
    });
  },
};
