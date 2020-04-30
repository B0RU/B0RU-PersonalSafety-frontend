import adminService from '../../services/adminService';
import agentService from '../../services/agentService';

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
        adminService.RegisterAgent(personnel)
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
    resetClient({ commit }, email) {
      return new Promise((resolve, reject) => {
        commit('reg_request');
        adminService.ResetClientState(email)
          .then((res) => {
            resolve(res);
          })
          .catch((err) => {
            commit('get_error');
            reject(err);
          });
      });
    },
    resetRescuer({ commit }, email) {
      return new Promise((resolve, reject) => {
        commit('reg_request');
        adminService.ResetRescuerState(email)
          .then((res) => {
            resolve(res);
          })
          .catch((err) => {
            commit('get_error');
            reject(err);
          });
      });
    },
    registerRescuer({ commit }, rescuer) {
      return new Promise((resolve, reject) => {
        commit('reg_request');
        agentService.RegisterRescuer(rescuer)
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
