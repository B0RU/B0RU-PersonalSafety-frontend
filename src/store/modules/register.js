import adminService from '../../services/adminService';
import agentService from '../../services/agentService';

export default {
  namespaced: true,
  state: {
    message: '',
    status: '',
    cities: {},
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
      // eslint-disable-next-line prefer-destructuring
      state.message = errors.messages[0];
    },
    getCities_success(state, cities) {
      state.cities = cities;
      state.status = 'success';
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
    registerManager({ commit }, manager) {
      return new Promise((resolve, reject) => {
        commit('reg_request');
        adminService.RegisterManager(manager)
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
    getDistributionsCities({ commit }) {
      return new Promise((resolve, reject) => {
        commit('reg_request');
        adminService.GetDistributionCities()
          .then((res) => {
            const cities = res.data.result;
            commit('getCities_success', cities);
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
