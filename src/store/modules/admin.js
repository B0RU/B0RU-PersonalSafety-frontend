import adminService from '../../services/adminService';

export default {
  namespaced: true,
  state: {
    message: '',
    status: '',
    cities: {},
    distributions: {},
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
      state.message = errors;
    },
    getCities_success(state, cities) {
      state.cities = cities;
      state.status = 'success';
    },
    getDistributions_success(state, distributions) {
      state.distributions = distributions;
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
            commit('reg_error', err);
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
            commit('reg_error', err);
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
    getDistributions({ commit }) {
      return new Promise((resolve, reject) => {
        commit('reg_request');
        adminService.GetDistributionNodes()
          .then((res) => {
            const distributions = res.data.result;
            commit('getDistributions_success', distributions);
            resolve(res);
          })
          .catch((err) => {
            commit('reg_error', err);
            reject(err);
          });
      });
    },
    renameDistribution({ commit, dispatch }, distribution) {
      return new Promise((resolve, reject) => {
        commit('reg_request');
        adminService.RenameDistribution(distribution)
          .then((res) => {
            const messages = res.data;
            commit('reg_success', messages);
            dispatch('getDistributions');
            resolve(res);
          })
          .catch((err) => {
            commit('reg_error', err);
            reject(err);
          });
      });
    },
    addDistribution({ commit, dispatch }, distribution) {
      return new Promise((resolve, reject) => {
        commit('reg_request');
        adminService.AddNewDistribution(distribution)
          .then((res) => {
            const messages = res.data;
            commit('reg_success', messages);
            dispatch('getDistributions');
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
