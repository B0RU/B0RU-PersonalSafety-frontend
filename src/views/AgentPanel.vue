<template>
  <div class="agentPanel">
    <div class="side">
      <router-link to="/agent/dashboard">
        <add-button action="Dashboard"></add-button>
      </router-link>
      <side-actions :actions="agentActions"></side-actions>
    </div>
    <div class="main-actions">
        <router-view />
    </div>
  </div>
</template>

<script>
import addButton from '../components/newButton.vue';
import sideActions from '../components/actions.vue';

const signalR = require('@aspnet/signalr');

export default {

  data() {
    return {
      connection: '',
      agentActions: {
        Rescuers: { url: '/agent/track-rescuers', value: 'Track Rescuers' },
        Register: { url: '/agent/register-rescuer', value: 'Register Rescuers' },
      },
    };
  },
  components: {
    addButton,
    sideActions,
  },

  created() {
    this.getBasicInfo();
    this.getSOSRequests();
    this.getRescuers();
    this.connection = new signalR.HubConnectionBuilder()
      .withUrl(`${this.$hostname}/hubs/agent`, {
        accessTokenFactory: () => this.$store.state.authenticationDetails.token,
      })
      .configureLogging(signalR.LogLevel.Information)
      .build();

    this.connection.start()
      .catch((error) => {
        console.log(error);
      });
  },
  destroyed() {
    this.connection.stop()
      .then(() => { console.log('WS connection Stopped'); });
  },
  mounted() {
    this.connection.on('AgentRequestsChannel', () => {
      this.getSOSRequests();
      console.log('changes Recieved');
    });
    this.connection.on('AgentRescuersChannel', () => {
      this.getRescuers();
      console.log('rescuers Recieved');
    });
  },
  methods: {
    getBasicInfo() {
      this.$store.dispatch('personnel/getBasicInfo');
    },
    getSOSRequests() {
      this.$store.dispatch('personnel/getRequests');
    },
    getRescuers() {
      this.$store.dispatch('personnel/getRescuers');
    },
  },
};
</script>

<style scoped>
.agentPanel {
  display: flex;
  margin-top: 30px;
}
.side {
  width: 15%;
  height: 100%;
  margin-left: 25px;
}
.main-actions {
  width: 75%;
  margin: 0 auto;
  float: right;
  /* background-color: #5e657a; */
  height: 500px;
  border-radius: 15px;
}
</style>
