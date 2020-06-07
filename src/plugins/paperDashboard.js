import Notify from 'vue-notifyjs';
import * as VueGoogleMaps from 'vue2-google-maps';
import VueGeolocation from 'vue-browser-geolocation';
import SideBar from '../components/SidebarPlugin';
import GlobalComponents from './globalComponents';
import GlobalDirectives from './globalDirectives';
import location from './location-hub';
import 'es6-promise/auto';

// css assets
import 'bootstrap/dist/css/bootstrap.css';
import '../assets/sass/paper-dashboard.scss';
import '../assets/css/themify-icons.css';

export default {
  install(Vue) {
    Vue.use(GlobalComponents);
    Vue.use(GlobalDirectives);
    Vue.use(SideBar);
    Vue.use(Notify);
    Vue.use(location);
    Vue.use(VueGeolocation);
    Vue.use(VueGoogleMaps, {
      load: {
        key: 'AIzaSyDGzxOwQoYqMYvEYUhrrTRn1GQ_ccWqRac',
        libraries: 'places', // This is required if you use the Autocomplete plugin
      },
    });
  },
};
