import Vue from 'vue';
import Axios from 'axios';
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import * as VueGoogleMaps from 'vue2-google-maps';
import VueGeolocation from 'vue-browser-geolocation';
import App from './App.vue';
import router from './router';
import store from './store';
import location from './plugins/location-hub';
import PaperDashboard from './plugins/paperDashboard';

Vue.config.productionTip = false;
Vue.prototype.$hostname = 'https://personalsafety.azurewebsites.net';
Axios.defaults.baseURL = Vue.prototype.$hostname;
const { token } = store.state.authenticationDetails;
if (token) {
  Axios.defaults.headers.common.Authorization = `Bearer ${token}`;
}

Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);
Vue.use(location);
Vue.use(VueGeolocation);
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyDGzxOwQoYqMYvEYUhrrTRn1GQ_ccWqRac',
    libraries: 'places', // This is required if you use the Autocomplete plugin
  },
});
Vue.use(PaperDashboard);
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
