import Vue from 'vue';
import Axios from 'axios';
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);
Vue.config.productionTip = false;
Vue.prototype.$hostname = 'https://personal-safety.azurewebsites.net';
Axios.defaults.baseURL = Vue.prototype.$hostname;
const token = localStorage.getItem('token');
if (token) {
  Axios.defaults.headers.common.Authorization = `Bearer ${token}`;
}

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
