<template>
<div class="newBtn"> {{action}} </div>
</template>

<script>
export default {
  name: 'add-button',
  props: {
    action: {
      type: String,
    },
  },
};

</script>

<style scoped>
.newBtn {
  margin: 10px 0px 20px 0px;
  width: 15rem;
  height: 3rem;
  font-size: 1.2em;
  text-align: center;
  padding: 10px;
  border-radius: 19px;
  background: #6c63ff;
  color: #fff;
  font-family: Roboto;
  cursor: pointer;
  font-weight: bolder;
}
</style>
