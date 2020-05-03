<template>
  <div class='actions'>
    <ul>
      <li v-for="(action, index) in actions" :key="index">
            {{action}}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    actions: {
      type: Array,
    },
  },
};
</script>

<style scoped>
.actions{
    border-radius: 19px;
    background: #5E657A;
    padding: 20px 20px 20px 30px;
    color: gray;
}
ul{
  list-style-type: none;
  margin: 0;
  padding: 0;
  text-align: left;
}
li{
  cursor: pointer;
  margin: 5px;
}
</style>
