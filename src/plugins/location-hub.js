import { HubConnectionBuilder, LogLevel } from '@aspnet/signalr';
import store from '../store';

export default {
  install(Vue) {
    let startedPromise = null;
    const locationHub = new Vue({ store });
    // eslint-disable-next-line no-param-reassign
    Vue.prototype.$locationHub = locationHub;
    const connection = new HubConnectionBuilder()
      .withUrl(`${Vue.prototype.$hostname}/hubs/location`, {
        accessTokenFactory: () => locationHub.$store.state.authenticationDetails.token,
      })
      .configureLogging(LogLevel.Information)
      .build();
    // connection.onclose(() => locationHub.start());


    // use new Vue instance as an event bus
    // every component will use this.$locationHub to access the event bus
    // Forward server side SignalR events through $locationHub, where components will listen to them
    connection.on('LocationChannel', (email, lat, lng) => {
      locationHub.$emit('location-changed', { rescuerEmail: email, position: { lat, lng } });
    });
    connection.on('AlertsChannel', (payload) => {
      locationHub.$emit('rescuers-changed');
      console.log(payload);
    });

    locationHub.locationOpened = (departmentName) => connection.invoke('EnterDepartmentRoom', departmentName);
    locationHub.locationClosed = (departmentName) => connection.invoke('someGroup', departmentName);
    locationHub.start = () => {
      startedPromise = connection.start().catch((err) => {
        console.error('Failed to connect with hub', err);
        return new Promise((resolve, reject) => setTimeout(() => locationHub.start().then(resolve).catch(reject), 5000));
      });
      return startedPromise;
    };
    locationHub.stop = () => {
      connection.stop();
    };
    // start();
  },
};
