<template>
  <card class="mainActions">
    <h3>Register Manager</h3>
    <p class="subhead">Enter the new Manager's Account Details</p>
    <b-container fluid class="register">
      <b-form @submit="onSubmit" @reset="onReset" v-if="show">
        <div class="name">
          <b-col sm="6">
            <b-col sm="5">
              <label for="firstName" class="label">First Name</label>
            </b-col>
            <b-col sm="12">
              <b-form-input
                v-model="firstName"
                id="firstName"
                size="md"
                placeholder="Type Manager First Name"
                type="text"
                required
              ></b-form-input>
            </b-col>
          </b-col>
          <b-col sm="6">
            <b-col sm="5">
              <label for="lastName" class="label">last Name</label>
            </b-col>
            <b-col sm="12">
              <b-form-input
                v-model="lastName"
                id="lastName"
                size="md"
                placeholder="Type Manager Last Name"
                type="text"
                required
              ></b-form-input>
            </b-col>
          </b-col>
        </div>
        <div class="email">
          <b-col sm="6">
            <b-col sm="5">
              <label for="email" class="label">Email</label>
            </b-col>
            <b-col sm="12">
              <b-form-input
                v-model="form.email"
                id="email"
                size="md"
                placeholder="Type Manager Email"
                type="email"
                required
              ></b-form-input>
            </b-col>
          </b-col>
          <b-col sm="6">
            <b-col sm="5">
              <label for="confirm-email" class="label">Confirm Email</label>
            </b-col>
            <b-col sm="12">
              <b-form-input
                id="confirm-email"
                v-model="confirm"
                :state="emailState"
                size="md"
                placeholder="Retype the Email, please"
                type="email"
                required
                v-bind:value="form.email"
              ></b-form-input>
            </b-col>
          </b-col>
        </div>
        <div class="password">
          <b-col sm="6">
            <b-col sm="5">
              <label for="password" class="label">password</label>
            </b-col>
            <b-col sm="12">
              <b-form-input v-model="form.password" id="password" size="md" disabled></b-form-input>
            </b-col>
          </b-col>
          <b-col sm="6" class="btns">
            <b-col sm="7">
              <label class="label">Distribution</label>
            </b-col>
            <b-col sm="14" style="margin-left:15px">
              <b-button @click="$refs.selectDistribution.openModal()">Select Distribution</b-button>
            </b-col>
          </b-col>
        </div>
        <div class="form-btns">
          <div style="margin:0 auto;">
            <b-button type="submit">Submit</b-button>
            <b-button type="reset">Reset</b-button>
          </div>
        </div>
      </b-form>
      <div class="error-message">{{getMessages}}</div>
    </b-container>
    <modal-component ref="selectDistribution">
      <template v-slot:header>
        <h3 class="modal-name">Assign Manager to distribution</h3>
      </template>
      <template v-slot:body>
        <label class="label">distribution:</label>
        <b-dropdown :text="modal.distribution" class="modal-dropdown" v-model="modal.distribution">
          <b-dropdown-item v-for="distribution in distributions"
          :key="distribution.id"
          @click="modal.distribution = distribution.value + ' ' + distribution.typeName; form.distributionId = distribution.id">
          {{distribution.value + ' ' + distribution.typeName}}
          </b-dropdown-item>
        </b-dropdown>
      </template>
      <template v-slot:footer>
        <div @click="$refs.selectDistribution.closeModal()">
        <new-button  action="confirm" class="modalbtn"></new-button>
        </div>
      </template>
    </modal-component>
  </card>
</template>

<script>
import modalComponent from './modalComponent.vue';
import newButton from './newButton.vue';

export default {
  name: 'RegisterManager',
  components: {
    modalComponent,
    newButton,
  },
  data() {
    return {
      firstName: '',
      lastName: '',
      confirm: '',
      show: true,
      isLoading: false,
      passwordLength: 15,
      modal: {
        distribution: 'Select Distribution from below',
      },
      form: {
        fullName: '',
        email: '',
        password: '',
        distributionId: 0,
      },
    };
  },
  destroyed() {
    this.$store.state.admin.message = '';
  },
  mounted() {
    this.generatePassword();
  },
  computed: {
    emailState() {
      return this.confirm === this.form.email;
    },
    getMessages() {
      return this.$store.state.admin.message;
    },
    distributions() {
      return this.$store.state.admin.distributions;
    },
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      this.form.fullName = `${this.firstName} ${this.lastName}`;
      this.$store.dispatch('admin/registerManager', this.form);
      console.log(this.form);
    },
    onReset(evt) {
      evt.preventDefault();
      // Reset our form values
      this.firstName = '';
      this.lastName = '';
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
        password += characters.charAt(
          Math.floor(Math.random() * characters.length),
        );
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
.mainActions {
  display: block;
  text-align: left;
  padding: 20px;
}
.subhead {
  color: gray;
}
.register {
  margin-top: 50px;
}
button {
  background-color: #212120;
  border: none;
  font-size: 0.9rem;
  &:first-of-type{
  margin-right: 1rem;
  }
}
.modal-dropdown{
  margin-bottom: 15px;
}
.label {
  margin-bottom: 1rem;
  float: left;
  color: gray;
}
.email {
  display: flex;
  margin-top: 20px;
}
.name {
  display: flex;
  margin-top: 20px;
}
.password {
  display: flex;
  margin-top: 20px;
}
#password {
  background-color: #212120;
  border: none;
}
.btns {
  display: grid;
}
.form-btns {
    margin: 0 auto;
    display: flex;
    margin-top: 40px;
}
.modal-name{
  margin: 0 auto;
  color: gray;
}
.modalbtn{
    background: #FF6584;
    width: 20%;
    margin: 0 auto;
    height: 2rem;
    line-height: 10px;
}
</style>
