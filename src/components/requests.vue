<template>
  <card class="mainActions">
    <h3>Monitor Requests</h3>
    <p class="subhead">You can Monitor Department Requests</p>
    <b-overlay :show="status" opacity="1" variant="transparent" spinner-variant="primary">
    <requests-component :aria-hidden="show ? 'true' : null"></requests-component>
    </b-overlay>
  </card>
</template>

<script>
import requestsComponent from './request.vue';

export default {
  data() {
    return {
      show: false,
    };
  },
  created() {
    console.log(this.$route.name);
  },
  components: {
    requestsComponent,
  },
  computed: {
    getDepartments() {
      return this.$store.state.manager.departments;
    },
    status() {
      return this.$store.state.manager.status === 'loading';
    },
  },
};
</script>

<style lang='scss' scoped>

.mainActions {
  display: block;
  text-align: left;
  padding: 20px;
}
.subhead {
  color: gray;
}
</style>
