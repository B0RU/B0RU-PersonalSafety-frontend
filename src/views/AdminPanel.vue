<template>
  <div class="adminPanel">
    <div class="side">
      <router-link to="/admin/dashboard">
        <add-button action="Dashboard"></add-button>
      </router-link>
      <side-actions :actions="adminActions"></side-actions>
      <side-actions :actions="coreActions"></side-actions>
    </div>
    <div class="main-actions">
      <router-view />
    </div>
  </div>
</template>

<script>
import addButton from '../components/newButton.vue';
import sideActions from '../components/actions.vue';

export default {
  data() {
    return {
      adminActions: {
        Rescuers: { url: '/admin/track-rescuers', value: 'Track Rescuers' },
        Events: { url: '/admin/events', value: 'Events' },
      },
      coreActions: {
        'Register Agent': { url: '/admin/register-agent', value: 'Register Agent' },
        Managers: { url: '/admin/register-manager', value: 'Managers' },
        'Regional Distribution': { url: '/admin/regional-distribution', value: 'Regional Distribution' },
      },
    };
  },
  components: {
    addButton,
    sideActions,
  },
  created() {
    this.getDistributions();
    this.getDepartments();
    this.getCities();
  },
  methods: {
    getDepartments() {
      this.$store.dispatch('manager/getDepartments')
        .catch(() => { this.$store.dispatch('logout'); });
    },
    getCities() {
      this.$store.dispatch('register/getDistributionsCities')
        .catch(() => { this.$store.dispatch('logout'); });
    },
    getDistributions() {
      this.$store.dispatch('register/getDistributions')
        .catch(() => { this.$store.dispatch('logout').then(() => this.$router.push('/login')); });
    },
  },
};
</script>

<style scoped>
.adminPanel {
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
  background-color: #5e657a;
  height: 500px;
  border-radius: 15px;
}
.table {
    width: 85%;
    margin: 0 auto;
}
.table thead th {
    border-bottom: 2px solid gray;
    color: gray;
    border-top: none ;
}
.table td {
    border-top: none ;
    border-bottom: 1px solid gray;
    color: white;
}
</style>
