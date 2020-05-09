<template>
      <b-table :fields="fields" :items="items" caption-top>
          <template v-slot:table-caption>
                  <b> bar</b>
          </template>
          <template v-slot:cell(Name)="data">
              <h5 @click="getchildren(data.item.id)" class="district">{{ data.item.value }} </h5>
          </template>
          <template v-slot:cell(Type)="data">
              <h5>{{ data.item.typeName }} </h5>
          </template>
          <template v-slot:cell(btns)>
              <b-button class="table-btns"><b-icon-plus></b-icon-plus></b-button>
              <b-button class="table-btns"><b-icon-pencil></b-icon-pencil></b-button>
          </template>
      </b-table>
</template>

<script>
export default {
  data() {
    return {
      fields: ['Name', 'Type', 'Number of Children', { key: 'btns', label: ' ' }],
      items: [
        {
          value: 'Egypt',
          typeName: 'Country',
          parentId: null,
          typeId: 1,
          id: 1,
        },
      ],
    };
  },
  computed: {
    distributions() {
      return this.$store.state.register.distributions;
    },
  },
  methods: {
    getchildren(id) {
      const { distributions } = this.$store.state.register;
      const childs = distributions.filter((item) => item.parentId === id);
      this.items = childs;
    },
  },
};
</script>

<style lang='scss'>
.table {
    width: 90%;
    margin: 0 auto;
}
.table thead th {
    border-bottom: 2px solid gray;
    color: gray;
    border-top: none ;
}
.table td {
    border-top: none ;
    border-bottom: 1px solid gray;
}
.table-btns{
    margin-right: 10px;
    background-color: gray;
    padding: 0.3rem;
}
.district{
    cursor: pointer;
}
</style>
