<template>
  <div class="mainActions">
    <h3>Register Agent</h3>
    <p class="subhead">Enter the new Agent's Account Details</p>
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
                placeholder="Type Rescuer First Name"
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
                placeholder="Type Rescuer Last Name"
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
                placeholder="Type Rescuer Email"
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
              <label class="label">Department Details</label>
            </b-col>
            <b-col sm="14" style="margin-left:15px">
              <b-button @click="$refs.selectDepartment.openModal()">Select Department</b-button>
              <b-button @click="$refs.newDepartment.openModal()">New Department</b-button>
            </b-col>
          </b-col>
        </div>
        <div>{{getMessages}}</div>
        <div class="form-btns">
          <div style="margin:0 auto;">
            <b-button type="submit">Submit</b-button>
            <b-button type="reset">Reset</b-button>
          </div>
        </div>
      </b-form>
    </b-container>
    <modal-component ref="newDepartment">
      <template v-slot:header>
        <h3 class="modal-name">Add New Department</h3>
      </template>
      <template v-slot:body>
        <label class="label">Authority Type</label>
        <b-dropdown :text="modal.authorityType" class="modal-dropdown" v-model="modal.authorityType">
          <b-dropdown-item v-for="authority in authorityOptions"
          :key="authority.value" @click="modal.authorityId = authority.value; modal.authorityType = authority.text">
          {{authority.text}}
          </b-dropdown-item>
        </b-dropdown>
        <label class="label">Destribution </label>
        <b-dropdown :text="modal.cityName" class="modal-dropdown" v-model="modal.cityName">
          <b-dropdown-item v-for="city in cities"
          :key="city.id" @click="modal.cityId = city.id; modal.cityName = city.value">
          {{city.value}}
          </b-dropdown-item>
        </b-dropdown>
        <div class="location">
          <input type="number" v-model="modal.departmentLongitude" name="Longitude" placeholder="Longitude" class="modal-input">
          <input type="number" v-model="modal.departmentLatitude" name="Latitude" placeholder="Latitude" class="modal-input">
          <button class="modal-input__btn">
            <a :href="`https://maps.google.com?q=loc:${modal.cityName}`" target="_blank">
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='10'
                    height='15'
                    viewBox='0 0 16 20'>
                    <path
                      class='pin'
                      d='M78.625,0a8.061,8.061,0,0,0-8.052,8.052c0,
                      5.51,7.206,13.6,7.513,13.941a.725.725,0,0,0,
                      1.079,0c.307-.342,7.513-8.431,7.513-13.941A8.062,
                      8.062,0,0,0,78.625,0Zm0,12.1a4.051,4.051,0,1,1,4.051-4.051A4.056,
                      4.056,0,0,1,78.625,12.1Z'
                      transform='translate(-70.573)'
                    />
                  </svg>
            </a>
          </button>
        </div>
      </template>
      <template v-slot:footer>
        <div @click="modalConfirm()">
        <new-button  action="confirm" class="modalbtn"></new-button>
        </div>
      </template>
    </modal-component>
    <modal-component ref="selectDepartment">
      <template v-slot:header>
        <h3 class="modal-name">Assign Agent to Department</h3>
      </template>
      <template v-slot:body>
        <label class="label">Department:</label>
        <b-dropdown :text="modal.department" class="modal-dropdown" v-model="modal.department">
          <b-dropdown-item v-for="department in departments"
          :key="department.id"
          @click="modal.department = department.distributionName + ' ' + department.authorityTypeName; form.existingDepartmentId = department.distributionId">
          {{department.distributionName + ' ' + department.authorityTypeName}}
          </b-dropdown-item>
        </b-dropdown>
      </template>
      <template v-slot:footer>
        <div @click="$refs.selectDepartment.closeModal()">
        <new-button  action="confirm" class="modalbtn"></new-button>
        </div>
      </template>
    </modal-component>
  </div>
</template>

<script>
import modalComponent from './modelComponent.vue';
import newButton from './newButton.vue';

export default {
  name: 'RegisterRescuer',
  components: { modalComponent, newButton },
  data() {
    return {
      firstName: '',
      lastName: '',
      confirm: '',
      show: true,
      isLoading: false,
      passwordLength: 15,
      authorityOptions: [
        { value: 1, text: 'police' },
        { value: 2, text: 'Ambulance' },
        { value: 3, text: 'Firefighting' },
        { value: 4, text: 'TowTruck' },
      ],
      modal: {
        authorityType: 'Select Authority Type',
        authorityId: null,
        cityName: 'Select City From below',
        cityId: null,
        departmentLongitude: null,
        departmentLatitude: null,
        department: 'Select Department from Below',
      },
      form: {
        fullName: '',
        email: '',
        password: '',
        existingDepartmentId: 0,
        authorityType: null,
        distributionId: null,
        departmentLongitude: 0,
        departmentLatitude: 0,
      },
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
    cities() {
      return this.$store.state.register.cities;
    },
    departments() {
      return this.$store.state.manager.departments;
    },
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      // this.$store.dispatch('register/registerAgent', this.form);
      this.form.fullName = `${this.firstName} ${this.lastName}`;
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
    modalConfirm() {
      this.form.departmentLongitude = +this.modal.departmentLongitude;
      this.form.departmentLatitude = +this.modal.departmentLatitude;
      this.form.authorityType = +this.modal.authorityId;
      this.form.distributionId = +this.modal.cityId;
      this.$refs.newDepartment.closeModal();
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
  background-color: #293147;
  border: none;
  font-size: 0.9rem;
  &:first-of-type{
  margin-right: 1rem;
  }
}
.pin{
  fill: gray;
}
.modal-dropdown{
  margin-bottom: 15px;
}
.modal-input{
  background: none;
  border: none;
  color: gray;
  border-radius: 7px;
  box-shadow: 0px 7px 7px -2px #888888;
  margin: 20px 20px 0px 20px;
  padding: 10px;
  width: 10rem;
  &__btn{
    background: none;
    border: none;
    color: gray;
    border-radius: 7px;
    box-shadow: 0px 7px 7px -2px #888888;
    margin: 20px 20px 0px 20px;
    padding: 10px;
    width: auto;
    float: right;
  }
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
  background-color: #293147;
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
