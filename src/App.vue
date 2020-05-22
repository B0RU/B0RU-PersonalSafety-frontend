<template>
  <div id="app">
    <div class="nav">
     <router-link :to="{name: 'Home'}"> <div class="logo">Personal Safety</div> </router-link>
     <signing-box></signing-box>
     </div>
    <router-view/>
  </div>
</template>

<script>
import Axios from 'axios';
import signingBox from './components/signingBox.vue';

export default {
  name: 'App',
  components: {
    signingBox,
  },
  created() {
    Axios.interceptors.response.use(undefined, (err) => new Promise(() => {
      if (err.status === 401) {
        this.logout();
      }
      throw err;
    }));
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: white;
  height: 100%;
}
.nav{
  width: 100%;
  display: inline-block;
  background-color: #5e657a;
}
.logo{
  font-family: 'Berlin Sans FB Regular';
  font-size: 2rem;
  float: left;
  color: white;
  padding-left: 15px;
  @media screen and (max-width: 320px) {
    font-size: 1rem;
  }
  @media screen and (max-width: 496px) {
    font-size: 1rem;
  }
}
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
body {
  background-color: #3C4357;
  font-size: 16px;
  font-family: 'Lato', sans-serif;
  font-weight: 300;
  margin: 0;
  color: #666;
  height: 100%;
  padding: 0px;

    @media screen and (max-width: 960px){
     font-size: 80%;
   }
     @media screen and (max-width: 776px){
     font-size: 70%;
   }
     @media screen and (max-width: 496px){
     font-size: 50%;
   }
     @media screen and (max-width: 320px){
     font-size: 40%;
   }
}
</style>
