import Vue from 'vue';
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import Axios from 'axios';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);
Vue.config.productionTip = false;
Vue.prototype.$http = Axios;
// eslint-disable-next-line prefer-template
const token = 'Bearer ' + localStorage.getItem('token');
if (token) {
  Vue.prototype.$http.defaults.headers.common.Authorization = token;
}


new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
