import managerService from '../../services/managerService';

export default {
  namespaced: true,
  state: {
    departments: {},
    departmentRequests: {},
    status: '',
    message: '',
    topCardsData: {},
    SOSPieData: {},
    SOSChartData: {},
    events: {},
  },
  mutations: {
    request(state) {
      state.status = 'loading';
    },
    getDepartments_success(state, departments) {
      state.departments = departments;
      state.status = 'success';
    },
    getDepartmentRequests_success(state, departmentRequests) {
      state.departmentRequests = departmentRequests;
      state.status = 'success';
    },
    getTopCardsData_success(state, topCardsData) {
      state.topCardsData = topCardsData;
      state.status = 'success';
    },
    getSOSPieData_success(state, SOSPieData) {
      state.SOSPieData = SOSPieData;
      state.status = 'success';
    },
    getSOSChartData_success(state, SOSChartData) {
      state.SOSChartData = SOSChartData;
      state.status = 'success';
    },
    getEvents_success(state, events) {
      state.events = events;
      state.status = 'success';
    },
    error(state, errors) {
      state.status = 'error';
      state.message = errors;
    },
  },
  actions: {
    getDepartments({ commit }) {
      return new Promise((resolve, reject) => {
        commit('request');
        managerService.GetDepartments()
          .then((res) => {
            const departments = res.data.result;
            commit('getDepartments_success', departments);
            resolve(res);
          })
          .catch((err) => {
            commit('error', err);
            reject(err);
          });
      });
    },
    getDepartmentRequests({ commit }, departmentId) {
      return new Promise((resolve, reject) => {
        commit('request');
        managerService.GetDepartmentRequests(departmentId)
          .then((res) => {
            const departmentRequests = res.data.result;
            commit('getDepartmentRequests_success', departmentRequests);
            resolve(res);
          })
          .catch((err) => {
            commit('error', err);
            reject(err);
          });
      });
    },
    getTopCardsData({ commit }) {
      return new Promise((resolve, reject) => {
        commit('request');
        managerService.GetTopCardsData()
          .then((res) => {
            const TopCardsData = res.data.result;
            commit('getTopCardsData_success', TopCardsData);
            resolve(res);
          })
          .catch((err) => {
            commit('error', err);
            reject(err);
          });
      });
    },
    getSOSPieData({ commit }) {
      return new Promise((resolve, reject) => {
        commit('request');
        managerService.GetSOSPieData()
          .then((res) => {
            const SOSPieData = res.data.result;
            commit('getSOSPieData_success', SOSPieData);
            resolve(res);
          })
          .catch((err) => {
            commit('error', err);
            reject(err);
          });
      });
    },
    getSOSChartData({ commit }) {
      return new Promise((resolve, reject) => {
        commit('request');
        managerService.GetSOSChartData()
          .then((res) => {
            const SOSChartData = res.data.result;
            commit('getSOSChartData_success', SOSChartData);
            resolve(res);
          })
          .catch((err) => {
            commit('error', err);
            reject(err);
          });
      });
    },
    getEvents({ commit }) {
      return new Promise((resolve, reject) => {
        commit('request');
        managerService.GetEvents()
          .then((res) => {
            const events = res.data.result;
            commit('getEvents_success', events);
            resolve(res);
          })
          .catch((err) => {
            commit('error', err);
            reject(err);
          });
      });
    },
    validateEvent({ commit }, eventId) {
      return new Promise((resolve, reject) => {
        commit('request');
        managerService.ValidateEvent(eventId)
          .then((res) => {
            resolve(res);
          })
          .catch((err) => {
            commit('error', err);
            reject(err);
          });
      });
    },
    invalidateEvent({ commit }, eventId) {
      return new Promise((resolve, reject) => {
        commit('request');
        managerService.InvalidateEvent(eventId)
          .then((res) => {
            resolve(res);
          })
          .catch((err) => {
            commit('error', err);
            reject(err);
          });
      });
    },
  },
};
