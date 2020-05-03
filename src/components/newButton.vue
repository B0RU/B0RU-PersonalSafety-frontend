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
    margin-bottom: 20px;
    width: 100%;
    height: 3rem;
    font-size: 1.2rem;
    text-align: center;
    padding: 10px;
    border-radius: 19px;
    background: #6c63ff;
    color: #fff;
    cursor: pointer;
}
</style>
