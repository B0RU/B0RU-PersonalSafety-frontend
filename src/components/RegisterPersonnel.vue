<template>
<b-card class="main">
  <div>
    <b-form @submit="onSubmit" @reset="onReset" v-if="show">
      <b-form-group
        id="input-group-1"
        label="Email address:"
        label-for="input-1"
      >
        <b-form-input
          id="input-1"
          v-model="form.email"
          type="email"
          required
          placeholder="Enter email"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Authority Name:" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="form.fullName"
          required
          placeholder="Enter name"
          :state="nameState"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-3" label="Password:" label-for="input-3">
        <b-form-input
            id="text-password"
            v-model="form.password"
            type="password"
            required
            placeholder="Password"
            aria-describedby="password-help-block"
        ></b-form-input>
      </b-form-group>
      <b-form-radio-group id="input-group-4" required v-model="form.authorityType" :state="Authoritystate" :options="options" label="Authority Type:">
              <b-form-invalid-feedback :state="Authoritystate"></b-form-invalid-feedback>
              <b-form-valid-feedback :state="Authoritystate"></b-form-valid-feedback>
      </b-form-radio-group>

      <b-button type="submit" variant="primary">Submit</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
    </b-form>
  </div>
  <div> {{getMessages}} </div>

</b-card>
</template>

<script>
export default {
  data() {
    return {
      form: {
        email: '',
        fullName: '',
        password: '',
        authorityType: null,
      },
      show: true,
      options: [
        { text: 'Police', value: 1 },
        { text: 'Ambulance', value: 2 },
        { text: 'Firefighting', value: 3 },
        { text: 'TowTruck', value: 4 },
      ],
    };
  },
  computed: {
    Authoritystate() {
      return Boolean(this.form.authorityType);
    },
    nameState() {
      return this.form.fullName.length > 4;
    },
    getMessages() {
      return this.$store.state.admin.status;
    },
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      // alert(JSON.stringify(this.form));
      console.log(this.form);
      this.$store.dispatch('admin/register', this.form);
    },
    onReset(evt) {
      evt.preventDefault();
      // Reset our form values
      this.form.email = '';
      this.form.fullName = '';
      this.form.password = '';
      this.form.authorityType = null;
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
    max-width: 40%;
    margin: 0 auto;
    margin-top: 4% ;
    color: black;
}
button{
    margin: 1rem;
}
</style>
