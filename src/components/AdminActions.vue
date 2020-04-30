<template>
    <div class="mainActions">
        <div class="col-md-6">
            <jumbotron-component name="Client" action="resetClient"></jumbotron-component>
        </div>
        <div class="col-md-6">
            <jumbotron-component name="Rescuer" action="resetRescuer"></jumbotron-component>
        </div>
    </div>
</template>

<script>
import jumbotronComponent from './JumbotronComponent.vue';

export default {
  components: {
    jumbotronComponent,

  },
};
</script>

<style scoped>
.mainActions {
    display: flex;
    width: 80%;
    float: right;
}
</style>
