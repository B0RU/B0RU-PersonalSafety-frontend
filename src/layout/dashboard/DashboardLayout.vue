<template>
  <div class="wrapper">
    <side-bar>
      <template slot="links" v-if="$route.matched[0].path === '/admin'">
          <sidebar-link to="/admin/dashboard" name="Dashboard" icon="ti-panel"/>
          <sidebar-link to="/admin/departments" name="Departments" icon="ti-user"/>
          <sidebar-link to="/admin/maps" name="Map" icon="ti-map"/>
          <sidebar-link to="/admin/events" name="Events" icon="ti-panel"/>
          <sidebar-link to="/admin/register-agent" name="Agents" icon="ti-user"/>
          <sidebar-link to="/admin/register-manager" name="Managers" icon="ti-user"/>
          <sidebar-link to="/admin/regional-distribution" name="Regional Distribution" icon="ti-user"/>
      </template>
      <template slot="links" v-else-if="$route.matched[0].path === '/manager'">
          <sidebar-link to="/manager/dashboard" name="Dashboard" icon="ti-panel"/>
          <sidebar-link to="/manager/departments" name="Departments" icon="ti-user"/>
          <sidebar-link to="/manager/events" name="Events" icon="ti-panel"/>
          <sidebar-link to="/manager/maps" name="Map" icon="ti-map"/>
      </template>
      <template slot="links" v-else-if="$route.matched[0].path === '/agent'">
          <sidebar-link to="/agent/dashboard" name="Dashboard" icon="ti-panel"/>
          <sidebar-link to="/agent/maps" name="Map" icon="ti-map"/>
          <sidebar-link to="/agent/register-rescuer" name="Register Rescuer" icon="ti-user"/>
      </template>
      <mobile-menu>
        <li class="nav-item" @click="logout">
          <a class="nav-link">
            <i class="ti-panel"></i>
            <p style="color:red">Logout</p>
          </a>
        </li>
        <li class="divider"></li>
      </mobile-menu>
    </side-bar>
    <div class="main-panel">
            <top-navbar></top-navbar>

      <dashboard-content @click.native="toggleSidebar">

      </dashboard-content>

    </div>
  </div>
</template>
<style lang="scss">
</style>
<script>
import DashboardContent from './Content.vue';
import MobileMenu from './MobileMenu.vue';
import TopNavbar from './TopNavbar.vue';

const signalR = require('@aspnet/signalr');

export default {
  components: {
    TopNavbar,
    DashboardContent,
    MobileMenu,
  },
  data() {
    return {
      connection: '',

    };
  },
  created() {
    if (this.$route.matched[0].path === '/admin' || this.$route.matched[0].path === '/manager') {
      if (this.$route.matched[0].path === '/admin') {
        this.getDistributions();
        this.getCities();
      }
      this.getDepartments();
      this.getTopCardsData();
      this.getSOSPieData();
      this.getSOSChartData();
    } else if (this.$route.matched[0].path === '/agent') {
      this.getDepartmentDetails();
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
    }
  },
  destroyed() {
    if (this.connection) {
      this.connection.stop()
        .then(() => { console.log('WS connection Stopped'); });
    }
  },
  mounted() {
    if (this.$route.matched[0].path === '/agent') {
      this.connection.on('AgentRequestsChannel', () => {
        this.getSOSRequests();
        console.log('changes Recieved');
      });
      this.connection.on('AgentRescuersChannel', () => {
        this.getRescuers();
        console.log('rescuers Recieved');
      });
    }
  },
  methods: {
    // Admin/manager methods
    getDepartments() {
      this.$store.dispatch('manager/getDepartments')
        .catch(() => { this.$store.dispatch('logout'); });
    },
    getCities() {
      this.$store.dispatch('admin/getDistributionsCities')
        .catch(() => { this.$store.dispatch('logout'); });
    },
    getDistributions() {
      this.$store.dispatch('admin/getDistributions')
        .catch(() => { this.$store.dispatch('logout').then(() => this.$router.push('/login')); });
    },
    getTopCardsData() {
      this.$store.dispatch('manager/getTopCardsData');
    },
    getSOSPieData() {
      this.$store.dispatch('manager/getSOSPieData');
    },
    getSOSChartData() {
      this.$store.dispatch('manager/getSOSChartData');
    },
    // agent Methods
    getDepartmentDetails() {
      this.$store.dispatch('personnel/getDepartmentDetails');
    },
    getBasicInfo() {
      this.$store.dispatch('personnel/getBasicInfo');
    },
    getSOSRequests() {
      this.$store.dispatch('personnel/getRequests');
    },
    getRescuers() {
      this.$store.dispatch('personnel/getRescuers');
    },
    toggleSidebar() {
      if (this.$sidebar.showSidebar) {
        this.$sidebar.displaySidebar(false);
      }
    },
    logout() {
      this.$store.dispatch('logout')
        .then(() => this.$router.push('/login'))
        .catch((err) => console.log(err));
    },
  },
};
</script>
