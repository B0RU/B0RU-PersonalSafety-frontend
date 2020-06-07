<template>
  <div id="app">
    <div :class="{'nav-open': $sidebar.showSidebar}">
    <notifications></notifications>
    <router-view></router-view>
  </div>
  </div>
</template>

<script>

export default {
  name: 'App',
  methods: {
    logout() {
      this.$store.dispatch('logout')
        .then(() => this.$router.push('/login'))
        .catch((err) => Promise.reject(err));
    },
  },
};
</script>

<style lang="scss">
.btn-secondary.dropdown-toggle{
    background: none;
    border: none;
    color: gray;
    border-radius: 7px;
    box-shadow: 0px 7px 7px -2px #888888;
}
.error-message{
  color: red;
  width: 30%;
  margin: 0 auto;
}
.vue-notifyjs.notifications {
  .alert {
    z-index: 10000;
  }
  .list-move {
    transition: transform 0.3s, opacity 0.4s;
  }
  .list-item {
    display: inline-block;
    margin-right: 10px;
  }
  .list-enter-active {
    transition: transform 0.2s ease-in, opacity 0.4s ease-in;
  }
  .list-leave-active {
    transition: transform 1s ease-out, opacity 0.4s ease-out;
  }

  .list-enter {
    opacity: 0;
    transform: scale(1.1);
  }
  .list-leave-to {
    opacity: 0;
    transform: scale(1.2, 0.7);
  }
}
</style>
