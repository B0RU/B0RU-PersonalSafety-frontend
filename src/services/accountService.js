import axios from 'axios';

export default {
  Login(user) {
    return axios.post('/api/Account/Login', user);
  },
  ResetPassword(userPassword) {
    return axios.post('/api/Account/ResetPassword', userPassword);
  },
  ChangePassword(userPassword) {
    return axios.post('/api/Account/ChangePassword', userPassword);
  },
};
