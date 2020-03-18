/* eslint-disable max-len */
import axios from 'axios';

// eslint-disable-next-line prefer-const
// let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZG1pbkBhZG1pbi5jb20iLCJqdGkiOiI0NTIxYWU1YS0xYjYwLTRlMWQtODhlYS1iODI0NjgxMGIyYTgiLCJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsImlkIjoiMDhhNjVlYmEtZGY0ZC00OGM2LTkxNGMtNzZhYjU5NTg5YWRkIiwicm9sZSI6IkFkbWluIiwibmJmIjoxNTg0NDY0MTMzLCJleHAiOjE1ODQ0NzEzMzMsImlhdCI6MTU4NDQ2NDEzM30.4adizAZbYmUCzZ15Q0JklgEC3FdsDvSZDuhzekHbb9Q';
// eslint-disable-next-line prefer-template
const token = 'Bearer ' + localStorage.getItem('token');
export default {
  namespaced: true,
  state: {
    message: {},
    status: '',
  },
  mutations: {
    reg_request(state) {
      state.status = 'loading';
    },
    reg_success(state, message) {
      state.status = 'success';
      state.message = message;
    },
    reg_error(state) {
      state.status = 'error';
    },
  },
  actions: {
    register({ commit }, personnel) {
      return new Promise((resolve, reject) => {
        commit('reg_request');
        axios.post('/api/Admin/RegisterPersonnel', personnel, {
          headers: {
            Authorization: token,
          },
        })
          .then((res) => {
            const response = res.data;
            commit('reg_success', response);
            resolve(res);
          })
          .catch((err) => {
            commit('reg_error', err);
            reject(err);
          });
      });
    },
  },
};

// axios.post('/api/Admin/RegisterPersonnel', personnnel, {
//   headers: {
//     // eslint-disable-next-line template-curly-spacing
//     // eslint-disable-next-line prefer-template
//     Authorization: 'Bearer ' + token,
//   },
// })
//   .then((res) => {
//     commit('registerRequest', res.data);
//   }).catch((err) => console.log(err));
// },
// },
