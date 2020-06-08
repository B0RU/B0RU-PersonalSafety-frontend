<template>
  <nav class="navbar navbar-expand-lg navbar-light">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">{{routeName}}</a>
      <button
        class="navbar-toggler navbar-burger"
        type="button"
        @click="toggleSidebar"
        :aria-expanded="$sidebar.showSidebar"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-bar"></span>
        <span class="navbar-toggler-bar"></span>
        <span class="navbar-toggler-bar"></span>
      </button>
      <div class="collapse navbar-collapse">
        <ul class="navbar-nav ml-auto">
          <li class="nav-item">
            <div class="logIn-Out dropdown nav-link">
              <span class="user-name">
                {{userName}}
                <b-icon-chevron-down></b-icon-chevron-down>
              </span>
              <br />
              <span class="user-role">{{userRole}}</span>
              <div class="dropdown-content">
                <span style="color: gray; font-size: 0.9rem">logged In As:</span>
                <br />
                <span style="font-size: 1.1rem">{{userEmail}}</span>
                <br />
                <b-button variant="danger" @click="logout">log Out</b-button>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
<script>
export default {
  computed: {
    routeName() {
      const { name } = this.$route;
      return this.capitalizeFirstLetter(name);
    },
    isLoggedIn() {
      return this.$store.getters.isLoggedIn;
    },
    userName() {
      return this.$store.state.accountDetails.fullName;
    },
    userRole() {
      let userRole;
      if (this.$store.state.accountDetails.roles) {
        userRole = this.$store.state.accountDetails.roles.toString();
      }
      return userRole;
    },
    userEmail() {
      return this.$store.state.accountDetails.email;
    },
  },
  data() {
    return {
      activeNotifications: false,
    };
  },
  methods: {
    capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    },
    toggleNotificationDropDown() {
      this.activeNotifications = !this.activeNotifications;
    },
    closeDropDown() {
      this.activeNotifications = false;
    },
    toggleSidebar() {
      this.$sidebar.displaySidebar(!this.$sidebar.showSidebar);
    },
    hideSidebar() {
      this.$sidebar.displaySidebar(false);
    },
    logout() {
      this.$store.dispatch('logout')
        .then(() => this.$router.push('/login'))
        .catch(() => {
          this.$notify({
            message: 'Somthing Went Wrong. Please Try again',
            icon: 'ti-error',
            horizontalAlign: 'right',
            verticalAlign: 'top',
            type: 'danger',
          });
        });
    },
  },
};
</script>
<style lang='scss' scoped>
.logIn-Out{
    float: right;
    font-family: "Roboto", sans-serif;
    line-height: 1;
    padding-right: 2%;
    text-align: left;
    text-decoration: none;
    cursor: pointer;
    color: rgba(0, 0, 0, 0.9);
    margin: 0px !important;

}
.dropdown-content {
  display: none;
  position: absolute;
  background-color: black;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  border-radius: 15px;
  padding: 20px;
  z-index: 2;
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
  display: inline-flex;
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
