<template>
  <div class='actions'>
    <ul>
      <li v-for="(action, index) in actions" :key="index">
        <router-link :to="action.url">
            {{action.value}}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    actions: {
      type: Object,
    },
  },
};
</script>

<style lang='scss' scoped>
.actions{
    border-radius: 19px;
    background: #5E657A;
    padding: 20px 20px 20px 30px;
    color: gray;
    margin-bottom: 10px;
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
  line-height: 1.8;
  a{
    color: gray;
    text-decoration: none;
  }
}
</style>
