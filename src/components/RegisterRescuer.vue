<template>
<b-card class="main" title="Create" sub-title="New Rescuer" bg-variant="dark">
  <b-container fluid>
    <b-form @submit="onSubmit" @reset="onReset" v-if="show">
            <div class="name">
              <b-col sm="2">
                <label for="firstName" class="label">First Name</label>
              </b-col>
              <b-col sm="5">
                <b-form-input
                v-model="form.firstName"
                id="firstName"
                size="lg"
                placeholder="Type Rescuer First Name"
                type="string"
                required
                ></b-form-input>
              </b-col>
              <b-col sm="2">
                <label for="lastName" class="label">last Name</label>
              </b-col>
              <b-col sm="5">
                <b-form-input
                v-model="form.lastName"
                id="lastName"
                size="lg"
                placeholder="Type Rescuer Last Name"
                type="string"
                required
                ></b-form-input>
              </b-col>
            </div>
            <div class="email">
            <b-col sm="2">
                <label for="email" class="label">Email</label>
            </b-col>
            <b-col sm="5">
                <b-form-input
                v-model="form.email"
                id="email"
                size="lg"
                placeholder="Type Rescuer Email"
                type="email"
                required
                ></b-form-input>
            </b-col>
            <b-col sm="2">
                <label for="confirm-email" class="label">Confirm Email</label>
            </b-col>
            <b-col sm="5">
                <b-form-input id="confirm-email"
                v-model="confirm"
                :state="emailState"
                size="lg"
                placeholder="Retype the Email, please"
                type="email"
                required
                v-bind:value="form.email"
                ></b-form-input>
            </b-col>
            </div>
            <div class="password">
                <b-col sm="2">
                    <label for="password" class="label">password</label>
                </b-col>
                <b-col sm="5">
                    <b-form-input v-model="form.password" id="password" size="lg" disabled></b-form-input>
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
  name: 'RegisterRescuer',
  data() {
    return {
      form: {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
      },
      confirm: '',
      show: true,
      isLoading: false,
      passwordLength: 15,
    };
  },
  mounted() {
    this.generatePassword();
  },
  computed: {
    emailState() {
      return this.confirm === this.form.email;
    },
    getMessages() {
      return this.$store.state.register.message;
    },
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      this.$store.dispatch('register/registerRescuer', this.form);
    },
    onReset(evt) {
      evt.preventDefault();
      // Reset our form values
      this.form.firstName = '';
      this.form.lastName = '';
      this.form.email = '';
      this.form.password = '';
      this.confirm = '';
      this.generatePassword();
      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    },
    generatePassword() {
      if (!this.passwordLength) return;
      this.triggerLoading(true);
      let password = '';
      let characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
      characters += '!#$%&*+-;<=>?@';
      for (let i = 0; i < this.passwordLength; i += 1) {
        password += characters.charAt(Math.floor(Math.random() * characters.length));
      }
      this.form.password = password;
      this.triggerLoading(false);
    },
    triggerLoading(state) {
      this.isLoading = state;
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
