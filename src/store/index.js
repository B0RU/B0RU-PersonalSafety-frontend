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
    login_error(state) {
      state.status = 'error';
    },
    logout(state) {
      state.status = '';
      state.token = '';
      state.messages = [];
    },
  },
  actions: {
    login({ commit }, user) {
      return new Promise((resolve, reject) => {
        commit('login_request');
        axios.post('/api/Account/Login', user)
          .then((res) => {
            const token = res.data.result;
            const { messages } = res.data;
            localStorage.setItem('token', token);
            commit('login_success', token);
            commit('login_messages', messages);
            resolve(res);
          })
          .catch((err) => {
            commit('login_error', err);
            localStorage.removeItem('token');
            reject(err);
          });
      });
    },
    logout({ commit }) {
      return new Promise((resolve) => {
        commit('logout');
        localStorage.removeItem('token');
        resolve();
      });
    },
  },
  getters: {
    isLoggedIn: (state) => !!state.token,
    authStatus: (state) => state.status,
    isAdmin: (state) => state.messages[2],
  },
  modules: {
    admin: adminModule,
    personnel: personnelModule,
  },
});
