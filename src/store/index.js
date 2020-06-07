import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import adminModule from './modules/admin';
import personnelModule from './modules/personnel';
import managerModule from './modules/manager';
import accountService from '../services/accountService';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    status: '',
    hasErrors: false,
    statusCode: null,
    messages: null,
    authenticationDetails: JSON.parse(localStorage.getItem('authenticationDetails')) || {},
    accountDetails: JSON.parse(localStorage.getItem('accountDetails')) || null,
    location: {},
  },
  mutations: {
    login_request(state) {
      state.status = 'loading';
    },
    login_success(state, payload) {
      state.status = 'success';
      state.authenticationDetails = payload.authenticationDetails;
      state.accountDetails = payload.accountDetails;
      state.statusCode = payload.response.status;
      state.messages = payload.response.messages;
      state.hasErrors = payload.response.hasErrors;
    },
    authError(state, payload) {
      state.status = 'error';
      // eslint-disable-next-line prefer-destructuring
      state.messages = payload.messages[0];
      state.statusCode = payload.status;
      state.hasErrors = payload.hasErrors;
    },
    logout(state) {
      state.status = '';
      state.hasErrors = false;
      state.accountDetails = {};
      state.authenticationDetails = {};
      state.messages = null;
      state.statusCode = null;
    },
    updateLocation(state, location) {
      state.location = location;
    },
  },
  actions: {
    login({ commit }, user) {
      return new Promise((resolve, reject) => {
        commit('login_request');
        accountService.Login(user)
          .then((res) => {
            const response = res.data;
            const { authenticationDetails, accountDetails } = response.result;
            localStorage.setItem('accountDetails', JSON.stringify(accountDetails));
            localStorage.setItem('authenticationDetails', JSON.stringify(authenticationDetails));
            axios.defaults.headers.common.Authorization = `Bearer ${authenticationDetails.token}`;
            commit('login_success', { response, authenticationDetails, accountDetails });
            resolve(res);
          })
          .catch((err) => {
            commit('authError', err.response.data);
            localStorage.removeItem('authenticationDetails');
            localStorage.removeItem('accountDetails');
            reject(err);
          });
      });
    },
    logout({ commit }) {
      return new Promise((resolve) => {
        commit('logout');
        localStorage.removeItem('authenticationDetails');
        localStorage.removeItem('accountDetails');
        delete axios.defaults.headers.common.Authorization;
        resolve();
      });
    },
  },
  getters: {
    isLoggedIn: (state) => !!state.authenticationDetails.token,
    authStatus: (state) => state.status,
    user: (state) => (state.accountDetails ? String(state.accountDetails.roles) : ''),
    statusCode: (state) => state.statusCode,
    SOSRequests: (state) => state.personnel.Requests,
    passwordMessages: (state) => state.personnel.passwordMessages,
    onlineRescuers: (state) => state.personnel.rescuers,
    messages: (state) => state.admin.message,
  },
  modules: {
    admin: adminModule,
    personnel: personnelModule,
    manager: managerModule,
  },
});
