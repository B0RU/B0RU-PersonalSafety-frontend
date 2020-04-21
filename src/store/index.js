import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import registerModule from './modules/register';
import personnelModule from './modules/personnel';
import accountService from '../services/accountService';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    email: localStorage.getItem('email') || '',
    messages: {},
    status: '',
    token: localStorage.getItem('token') || '',
    errorMessage: null,
    statusCode: null,
  },
  mutations: {
    login_request(state) {
      state.status = 'loading';
    },
    login_success(state, token) {
      state.status = 'success';
      state.token = token;
      localStorage.setItem('token', token);
    },
    login_messages(state, messages) {
      state.messages = messages;
    },
    login_statusCode(state, statusCode) {
      state.statusCode = statusCode;
    },
    authError(state, message) {
      state.errorMessage = message;
      state.status = 'error';
      localStorage.removeItem('token');
      localStorage.removeItem('email');
    },
    logout(state) {
      state.status = '';
      state.token = '';
      state.messages = {};
      state.personnel.passwordMessages = {};
      state.register.message = '';
      localStorage.removeItem('token');
      localStorage.removeItem('email');
      delete axios.defaults.headers.common.Authorization;
    },
  },
  actions: {
    login({ commit }, user) {
      return new Promise((resolve, reject) => {
        commit('login_request');
        localStorage.setItem('email', user.email);
        accountService.Login(user)
          .then((res) => {
            const token = res.data.result;
            const { messages } = res.data;
            const statusCode = res.data.status;
            commit('login_success', token);
            commit('login_messages', messages);
            commit('login_statusCode', statusCode);
            resolve(res);
          })
          .catch((err) => {
            commit('authError', err.response.data.messages[0]);
            reject(err);
          });
      });
    },
    logout({ commit }) {
      return new Promise((resolve) => {
        commit('logout');
        resolve();
      });
    },
  },
  getters: {
    isLoggedIn: (state) => !!state.token,
    authStatus: (state) => state.status,
    user: (state) => (state.messages ? state.messages[2] : ''),
    statusCode: (state) => state.statusCode,
    SOSRequests: (state) => state.personnel.Requests,
    passwordMessages: (state) => state.personnel.passwordMessages,
    rescuers: (state) => state.personnel.rescuers,
    messages: (state) => state.register.message,
  },
  modules: {
    register: registerModule,
    personnel: personnelModule,
  },
});
