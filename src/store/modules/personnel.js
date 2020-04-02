import axios from 'axios';

export default {
  namespaced: true,
  state: {
    Requests: {},
    status: '',
    rescuers: {},
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
    get_rescuers(state, rescuers) {
      state.rescuers = rescuers;
      state.status = 'success';
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
    acceptRequest({ commit }, requestId, rescuerEmail) {
      return new Promise((resolve, reject) => {
        axios.put(`https://personalsafety.azurewebsites.net/api/Agent/SOS/AcceptSOSRequest?requestId=${requestId}&rescuerEmail=${rescuerEmail}`, {
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
    getResquers({ commit }) {
      return new Promise((resolve, reject) => {
        commit('get_request');
        axios.get('https://personalsafety.azurewebsites.net/api/Agent/Rescuer/GetOnlineRescuers', {
          headers: {
            // eslint-disable-next-line prefer-template
            Authorization: 'Bearer ' + localStorage.getItem('token'),
          },
        })
          .then((res) => {
            const onlineRescuers = res.data.result;
            commit('get_rescuers', onlineRescuers);
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
