<template>
  <div id="app">
    <div class="nav">
     <router-link :to="{name: 'Home'}"> <div class="logo">Personal Safety</div> </router-link>
     <span v-if="isLoggedIn"><div class="logIn-Out" @click="logout">LOGOUT</div></span>
     <router-link class="logIn-Out" :to="{name: 'login'}" v-else> <div >LOGIN</div></router-link>
     </div>
    <router-view/>
  </div>
</template>

<script>

export default {
  name: 'App',
  created() {
    this.$http.interceptors.response.use(undefined, (err) => new Promise(() => {
      // eslint-disable-next-line no-underscore-dangle
      if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
        this.$store.dispatch('logout');
      }
      throw err;
    }));
  },
  computed: {
    isLoggedIn() { return this.$store.getters.isLoggedIn; },
  },
  methods: {
    logout() {
      this.$store.dispatch('logout')
        .then(() => this.$router.push('/login'))
        .catch((err) => console.log(err));
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: white;
}
.nav{
  display: flow-root;
}
body {
  background: url("./assets/LOGOextract.png"), linear-gradient(#3C4357, #46548B) no-repeat center center fixed;
  background-size: cover;
  font-size: 16px;
  font-family: 'Lato', sans-serif;
  font-weight: 300;
  margin: 0;
  color: #666;
}
.logo{
  font-family: 'Berlin Sans FB Regular';
  font-size: 45px;
  float: left;
  color: white;
  padding-left: 15px;
}
.logIn-Out{
  float: right;
  font-family: 'Roboto', sans-serif;
  font-size: 20px;
  margin-top: 25px;
  margin-right: 75px;
  text-decoration: none;
  color: white;
  cursor: pointer;
}
</style>
