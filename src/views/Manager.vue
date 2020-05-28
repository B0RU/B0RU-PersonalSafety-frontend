<template>
  <div class="managerPanel">
    <div class="side">
      <router-link to="/manager/dashboard">
        <add-button action="Dashboard"></add-button>
      </router-link>
      <side-actions :actions="managerActions"></side-actions>
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
      managerActions: {
        Requests: { url: '/manager/track-rescuers', value: 'Track Rescuers' },
        Events: { url: '/manager/events', value: 'Events' },
      },
    };
  },
  components: {
    addButton,
    sideActions,
  },
  created() {
    this.getDepartments();
  },
  methods: {
    getDepartments() {
      this.$store.dispatch('manager/getDepartments');
    },
  },
};
</script>

<style>
.managerPanel {
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
</style>
