<template>
  <div>
  <b-jumbotron class="jumbo">
      <h3>Reset {{name}} Connection</h3>
      <p>Reset the trackers for a particular {{name}}.</p>
    <b-form @submit="onSubmit">
    <b-form-input
          id="input-1"
          v-model="email"
          type="email"
          required
          placeholder="Enter email"
        ></b-form-input>
    <b-button class="submit-btn" variant="danger" type="submit">Reset</b-button>
    </b-form>
  </b-jumbotron>
</div>
</template>

<script>
export default {
  name: 'jumbotron',
  props: {
    name: {
      type: String,
    },
    action: {
      type: String,
    },
  },
  data() {
    return {
      email: '',
    };
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      this.$store.dispatch(`register/${this.action}`, this.email);
      console.log(`register/this is ${this.action}`);
    },
  },
  computed: {
    getMessages() {
      return this.$store.getters.messages;
    },
  },
};
</script>

<style scoped>
.jumbo{
    margin: 20px;
    color: #000;
}
#input-1{
    display: inline-block;
    width: 70%;
}
.submit-btn {
    float: right;
}
</style>
