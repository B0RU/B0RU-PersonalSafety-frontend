import axios from 'axios';

export default {
  namespaced: true,
  state: {
    Requests: {},
    status: '',
  },
  mutations: {
    get_request(state) {
      state.status = 'loading';
    },
    getRequests_success(state, Requests) {
      state.Requests = Requests;
      state.status = 'success';
    },
    get_error(state) {
      state.status = 'error';
    //   state.message = errors;
    },
  },
  actions: {
    getRequests({ commit }) {
      return new Promise((resolve, reject) => {
        commit('get_request');
        axios.get('https://personalsafety.azurewebsites.net/api/Agent/SOS/GetAllAuthorityRequests', {
          headers: {
            // eslint-disable-next-line prefer-template
            Authorization: 'Bearer ' + localStorage.getItem('token'),
          },
        })
          .then((res) => {
            const SOSRequests = res.data.result;
            commit('getRequests_success', SOSRequests);
            resolve(res);
          })
          .catch((err) => {
            commit('get_error');
            reject(err);
          });
      });
    },
    acceptRequest({ commit }, requestId) {
      return new Promise((resolve, reject) => {
        axios.put(`https://personalsafety.azurewebsites.net/api/Agent/SOS/AcceptSOSRequest?requestId=${requestId}`, {
          headers: {
            // eslint-disable-next-line prefer-template
            Authorization: 'Bearer ' + localStorage.getItem('token'),
          },
        }).then((res) => {
          resolve(res);
        })
          .catch((err) => {
            commit('get_error');
            reject(err);
          });
      });
    },
  },
  getters: {
  },
};
