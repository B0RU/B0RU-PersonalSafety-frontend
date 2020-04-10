<template>
<b-card class="main" title="Create" sub-title="New Rescuer" bg-variant="dark">
  <b-container fluid>
    <b-form @submit="onSubmit" @reset="onReset" v-if="show">
            <div class="email">
            <b-col sm="2">
                <label for="email" class="label">Email</label>
            </b-col>
            <b-col sm="5">
                <b-form-input v-model="form.email" id="email" size="lg" placeholder="Type Rescuer Email"></b-form-input>
            </b-col>
            <b-col sm="2">
                <label for="confirm-email" class="label">Confirm Email</label>
            </b-col>
            <b-col sm="5">
                <b-form-input id="confirm-email" size="lg" placeholder="Retype the Email, please"></b-form-input>
            </b-col>
            </div>
            <div class="password">
                <b-col sm="2">
                    <label for="password" class="label">password</label>
                </b-col>
                <b-col sm="5">
                    <b-form-input v-model="form.password" id="password" size="lg" disabled placeholder=""></b-form-input>
                </b-col>
            </div>
      <b-button type="submit" variant="primary">Submit</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
    </b-form>
  </b-container>

</b-card>
</template>

<script>
export default {
  name: 'RegisterAgent',
  data() {
    return {
      form: {
        email: '',
        password: '',
      },
      show: true,
    };
  },
  computed: {
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();
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
    generatePassword() {
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
