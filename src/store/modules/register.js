import axios from 'axios';

export default {
  namespaced: true,
  state: {
    message: '',
    status: '',
  },
  mutations: {
    reg_request(state) {
      state.status = 'loading';
    },
    reg_success(state, message) {
      state.status = 'success';
      // eslint-disable-next-line prefer-destructuring
      state.message = message.messages[0];
    },
    reg_error(state, errors) {
      state.status = 'error';
      state.message = errors;
    },
  },
  actions: {
    registerPersonnel({ commit }, personnel) {
      return new Promise((resolve, reject) => {
        commit('reg_request');
        axios.post('/api/Admin/RegisterAgent', personnel, {
          headers: {
            // eslint-disable-next-line prefer-template
            Authorization: 'Bearer ' + localStorage.getItem('token'),
          },
        })
          .then((res) => {
            const response = res.data;
            commit('reg_success', response);
            resolve(res);
          })
          .catch((err) => {
            commit('reg_error', err.response.data);
            reject(err);
          });
      });
    },
    registerRescuer({ commit }, rescuer) {
      return new Promise((resolve, reject) => {
        commit('reg_request');
        axios.post('/api/Agent/Rescuer/RegisterRescuer', rescuer, {
          headers: {
            // eslint-disable-next-line prefer-template
            Authorization: 'Bearer ' + localStorage.getItem('token'),
          },
        })
          .then((res) => {
            const response = res.data;
            commit('reg_success', response);
            resolve(res);
          })
          .catch((err) => {
            commit('reg_error', err.response.data);
            reject(err);
          });
      });
    },
  },
};
