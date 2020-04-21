<template>
<b-card class="main" title="Create" sub-title="New Password" bg-variant="dark">
  <b-container fluid>
    <b-form @submit="onSubmit" @reset="onReset" v-if="show">
            <div class="password">
                <b-col sm="2">
                    <label for="password" class="label">password</label>
                </b-col>
                <b-col sm="5">
                    <b-form-input v-model="form.newPassword" id="password" size="lg"></b-form-input>
                </b-col>
                <b-col sm="3">
                <label for="confirm-email" class="label">Confirm Password</label>
                </b-col>
                <b-col sm="5">
                    <b-form-input id="confirm-email"
                    v-model="form.confirmPassword"
                    size="lg"
                    placeholder="Retype the password, please"
                    required
                    ></b-form-input>
                </b-col>
            </div>
            <div>{{getMessages}}</div>
      <b-button type="submit" variant="primary">Submit</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
    </b-form>
  </b-container>

</b-card>
</template>

<script>
export default {
  name: 'ResetPaasword',
  data() {
    return {
      form: {
        email: localStorage.getItem('email'),
        token: localStorage.getItem('token'),
        newPassword: '',
        confirmPassword: '',
      },
      show: true,
    };
  },
  computed: {
    getMessages() {
      return this.$store.getters.passwordMessages;
    },
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      console.log(this.form);
      this.$store.dispatch('personnel/updatePassword', this.form)
        .then(() => {
          if (this.$store.state.personnel.passwordMessages[0] === 'Success! Password was changed successfully.') {
            this.$store.dispatch('logout')
              .then(() => this.$router.push('/login'))
              .catch((err) => console.log(err));
          }
        });
    },
    onReset(evt) {
      evt.preventDefault();
      // Reset our form values
      this.form.email = '';
      this.form.password = '';
      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.main{
    max-width: 70%;
    margin: 0 auto;
    margin-top: 4% ;
    text-align: left;
}
button{
    margin: 1rem;
}
.label{
    margin-bottom: 0.5rem;
}
.email{
    display: inline;
}
</style>
