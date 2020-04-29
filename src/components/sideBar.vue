<template>
  <div class='sidebar'>
  <newButton name="Agent"></newButton>
  <ACTIONS> </ACTIONS>
  </div>
</template>

<script>
import newButton from './newButton.vue';
import ACTIONS from './actions.vue';

export default {
  name: 'side-bar',
  components: {
    newButton,
    ACTIONS,
  },
};
</script>

<style scoped>
.sidebar{
  margin: 50px 0px 0px 30px;
  width: 15rem;
  height: 100%;
  background: transparent;
}
</style>
