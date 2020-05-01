import managerService from '../../services/managerService';

export default {
  namespaced: true,
  state: {
    departments: {},
    departmentRequests: {},
    status: '',
    message: '',
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
  },
};
