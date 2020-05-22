<template>
  <div>
    <div v-if="isLoggedIn">
      <div class="logIn-Out dropdown">
       <span class="user-name">
           {{userName}} <b-icon-chevron-down></b-icon-chevron-down>
       </span>
        <br />
       <span class="user-role"> {{userRole}} </span>
       <div class="dropdown-content">
           <span style="color: gray; font-size: 0.9rem">logged In As:</span><br>
           <span style="font-size: 1.1rem">{{userEmail}}</span><br>
           <b-button variant="danger"  @click="logout">log Out</b-button>
       </div>
      </div>
    </div>
    <router-link :to="{name: 'login'}" v-else>
      <div class="logIn-Out" style="padding-top: 15px">LOGIN</div>
    </router-link>
  </div>
</template>

<script>
export default {
  computed: {
    isLoggedIn() {
      return this.$store.getters.isLoggedIn;
    },
    userName() {
      return this.$store.state.accountDetails.fullName;
    },
    userRole() {
      return this.$store.state.accountDetails.roles.toString();
    },
    userEmail() {
      return this.$store.state.accountDetails.email;
    },
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

<style lang="scss" scoped>
.logIn-Out{
    float: right;
    font-family: "Roboto", sans-serif;
    line-height: 1;
    padding-right: 2%;
    text-align: left;
    text-decoration: none;
    color: white;
    cursor: pointer;
}
.dropdown-content {
  display: none;
  position: absolute;
  background-color: #5e657a;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  border-radius: 15px;
  padding: 20px;
  z-index: 1;
  right: 0;
  text-align: center;
  .btn {
      margin-top: 20px;
  }
}

.dropdown:hover .dropdown-content {
  display: block;
}

.user-name{
  font-size: 1.1rem;
  @media screen and (max-width: 496px) {
    font-size: 50%;
  }
}
.user-role{
  font-size: 1rem;
  @media screen and (max-width: 496px) {
    font-size: 50%;
  }
}
</style>
