<template>
  <div class="mainActions">
    <h3>Regional Distribution</h3>
    <p class="subhead">View and edit information about the geographical distribution of the system</p>
    <distribution-table></distribution-table>
  </div>
</template>

<script>
import distributionTable from './DistributionTable.vue';

export default {
  components: {
    distributionTable,
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
