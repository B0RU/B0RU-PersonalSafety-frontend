import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import adminModule from './modules/admin';
import personnelModule from './modules/personnel';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    messages: [],
    status: '',
    token: localStorage.getItem('token') || '',
    errorMessage: null,
  },
  mutations: {
    login_request(state) {
      state.status = 'loading';
    },
    login_success(state, token) {
      state.status = 'success';
      state.token = token;
    },
    login_messages(state, messages) {
      state.messages = messages;
    },
    authError(state, message) {
      state.errorMessage = message;
      state.status = 'error';
    },
    logout(state) {
      state.status = '';
      state.token = '';
      state.messages = [];
      state.admin = {};
      state.personnel = {};
    },
  },
  actions: {
    login({ commit }, user) {
      return new Promise((resolve, reject) => {
        commit('login_request');
        axios.post('https://personalsafety.azurewebsites.net/api/Account/Login', user)
          .then((res) => {
            const token = res.data.result;
            const { messages } = res.data;
            localStorage.setItem('token', token);
            // eslint-disable-next-line prefer-template
            axios.defaults.headers.common.Authorization = 'Bearer ' + token;
            commit('login_success', token);
            commit('login_messages', messages);
            resolve(res);
          })
          .catch((err) => {
            commit('authError', err.response.data.messages[0]);
            localStorage.removeItem('token');
            reject(err);
          });
      });
    },
    logout({ commit }) {
      return new Promise((resolve) => {
        commit('logout');
        localStorage.removeItem('token');
        delete axios.defaults.headers.common.Authorization;
        resolve();
      });
    },
  },
  getters: {
    isLoggedIn: (state) => !!state.token,
    authStatus: (state) => state.status,
    user: (state) => state.messages[2],
    SOSRequests: (state) => state.personnel.Requests,
  },
  modules: {
    admin: adminModule,
    personnel: personnelModule,
  },
});
