<template>
  <div>
      <b-table :fields="fields" :items="items">
          <template v-slot:cell(Name)="data">
              <h5 @click="getchildren(data.item.id)" class="district">{{ data.item.value }} </h5>
          </template>
          <template v-slot:cell(Type)="data">
              <h5>{{ data.item.typeName }} </h5>
          </template>
          <template v-slot:cell(btns)="data">
              <b-button class="table-btns" @click="addModal(data.item.id, data.item.value)"><b-icon-plus></b-icon-plus></b-button>
              <b-button class="table-btns" @click="renameModal(data.item.id)"><b-icon-pencil></b-icon-pencil></b-button>
          </template>
      </b-table>
      <modal-component ref="renameDistribution">
      <template v-slot:header>
        <h3 class="modal-name">Rename Distribution</h3>
      </template>
      <template v-slot:body>
        <b-overlay :show="status" opacity="1" variant="transparent" spinner-variant="primary">
        <input required type="text" v-model="renamedDistribution.value"
        name="distribution"
        placeholder="Rename selected Distribution"
        class="modal-input">
        </b-overlay>
        <div style="color: red; margin: 0 auto;">{{messages}}</div>
      </template>
      <template v-slot:footer>
        <div @click="renameDistribution()">
        <new-button  action="confirm" class="modalbtn"></new-button>
        </div>
      </template>
    </modal-component>
    <modal-component ref="addDistribution">
      <template v-slot:header>
        <h3 class="modal-name">add Distribution inside {{parentValue}}</h3>
      </template>
      <template v-slot:body>
        <b-overlay :show="status" opacity="1" variant="transparent" spinner-variant="primary">
        <input required autocomplete="off" type="text" v-model="addedDistribution.value"
        name="distribution"
        placeholder= "add New Distribution"
        class="modal-input">
        </b-overlay>
        <div style="color: red; margin: 0 auto;">{{messages}}</div>
      </template>
      <template v-slot:footer>
        <div @click="addDistribution()">
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
  components: {
    modalComponent,
    newButton,
  },
  data() {
    return {
      show: false,
      fields: ['Name', 'Type', { key: 'btns', label: ' ' }],
      items: [
        {
          value: 'Egypt',
          typeName: 'Country',
          parentId: null,
          typeId: 1,
          id: 1,
        },
      ],
      renamedDistribution: {
        id: null,
        value: '',
      },
      addedDistribution: {
        parentId: null,
        value: '',
      },
      parentValue: '',
    };
  },
  computed: {
    distributions() {
      return this.$store.state.register.distributions;
    },
    status() {
      return this.$store.state.register.status === 'loading';
    },
    messages() {
      return this.$store.state.register.message;
    },
  },
  destroyed() {
    this.$store.state.register.message = '';
  },
  methods: {
    getchildren(id) {
      const { distributions } = this.$store.state.register;
      const childs = distributions.filter((item) => item.parentId === id);
      this.items = childs;
    },
    renameDistribution() {
      this.$store.dispatch('register/renameDistribution', this.renamedDistribution)
        .then(() => { this.getchildren(null); });
    },
    renameModal(id) {
      this.renamedDistribution.id = id;
      this.renamedDistribution.value = '';
      this.$store.state.register.message = '';
      this.$refs.renameDistribution.openModal();
    },
    addDistribution() {
      this.$store.dispatch('register/addDistribution', this.addedDistribution);
      console.log(this.addedDistribution);
    },
    addModal(id, parentValue) {
      this.addedDistribution.parentId = id;
      this.parentValue = parentValue;
      this.addedDistribution.value = '';
      this.$store.state.register.message = '';
      this.$refs.addDistribution.openModal();
    },
  },
};
</script>

<style lang='scss' scoped>
.district{
    cursor: pointer;
}
.label {
  margin-bottom: 1rem;
  float: left;
  color: gray;
}
.table-btns{
    float: right;
    margin-right: 10px;
    background-color: gray;
    padding: 0.3rem;
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
.modal-input{
  background: none;
  border: none;
  color: gray;
  border-radius: 7px;
  box-shadow: 0px 7px 7px -2px #888888;
  padding: 10px;
  width: 100%;
}
</style>
