<template>
  <card>
      <b-overlay :show="status" opacity="1" variant="transparent" spinner-variant="primary">

    <div>
      <div class="row">
        <div class="col-5" v-if="$slots.header">
          <slot name="header"></slot>
        </div>
        <div class="col-7" v-if="$slots.content">
          <slot name="content"></slot>
        </div>
      </div>
      <div v-if="$slots.footer">
        <hr/>
        <slot name="footer"></slot>
      </div>
    </div>
      </b-overlay>
  </card>
</template>
<script>
import Card from './Card.vue';

export default {
  name: 'stats-card',
  components: {
    Card,
  },
  computed: {
    status() {
      return this.$store.state.manager.status === 'loading';
    },
  },
};
</script>
<style>
</style>
