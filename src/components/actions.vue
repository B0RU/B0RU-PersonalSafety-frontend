/* eslint-disable no-restricted-syntax */
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
.active{
  background-color: white;
  opacity: 0.6;
}
.actions{
    border-radius: 19px;
    background: #5E657A;
    padding: 20px 0px;
    color: gray;
    margin-bottom: 10px;
    @media screen and (max-width: 496px) {
      padding: 0.3rem;
    }
}
ul{
  list-style-type: none;
  margin: 0;
  padding: 0;
  text-align: left;
}
li{
  cursor: pointer;
  margin: 5px 0px;
  line-height: 1.8;
  padding-left: 20px;
  border-radius: 5px;
  a{
    color: gray;
    text-decoration: none;
  }
}
</style>
