<template>
  <div>

    <!--Stats cards-->
    <div class="row">
      <div class="col-md-6 col-xl-3" v-for="stats in statsCards" :key="stats.title">
        <stats-card>
          <div class="icon-big text-center" :class="`icon-${stats.type}`" slot="header">
            <i :class="stats.icon"></i>
          </div>
          <div class="numbers" slot="content">
            <p>{{stats.title}}</p>
            {{stats.value}}
          </div>
          <div class="stats" slot="footer">
            <i :class="stats.footerIcon"></i> {{stats.footerText}}
          </div>
        </stats-card>
      </div>
    </div>

    <!--Charts-->
    <div class="row">

      <div class="col-md-6 col-12">
        <chart-card title="Requests"
                    :chart-data="preferencesChart.data"
                    chart-type="Pie">
          <!-- <span slot="footer">
            <i class="ti-timer"></i> Campaign set 2 days ago</span> -->
          <div slot="legend">
            Total Requests : {{totalRequests}}
          </div>
        </chart-card>
      </div>

      <div class="col-md-6 col-12">
        <chart-card title="2020 Requests"
                    sub-title="All Requests We Handled"
                    :chart-data="activityChart.data"
                    :chart-options="activityChart.options">
          <span slot="footer">
            <i class="ti-check"></i> Data information certified
          </span>
          <div slot="legend">
             Total Requests : {{totalRequests}}
          </div>
        </chart-card>
      </div>

    </div>

  </div>
</template>
<script>
// import Chartist from 'chartist';
import { StatsCard, ChartCard } from '../components/index';

export default {
  components: {
    StatsCard,
    ChartCard,
  },
  /**
   * Chart data used to render stats, charts. Should be replaced with server data
   */
  data() {
    return {
      statsCards: [
        {
          type: 'warning',
          icon: 'ti-server',
          title: 'Departments',
          value: this.$store.state.manager.topCardsData.departmentsNumber,
          footerText: 'Updated now',
          footerIcon: 'ti-reload',
        },
        {
          type: 'success',
          icon: 'ti-wallet',
          title: 'Agents',
          value: this.$store.state.manager.topCardsData.agentsNumber,
          footerText: 'Last day',
          footerIcon: 'ti-calendar',
        },
        {
          type: 'danger',
          icon: 'ti-pulse',
          title: 'Users',
          value: this.$store.state.manager.topCardsData.usersNumber,
          footerText: 'In the last hour',
          footerIcon: 'ti-timer',
        },
        {
          type: 'info',
          icon: 'ti-pulse',
          title: 'Rescuers',
          value: this.$store.state.manager.topCardsData.rescuersNumber,
          footerText: 'Updated now',
          footerIcon: 'ti-reload',
        },
      ],
      activityChart: {
        data: {
          labels: [
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'Mai',
            'Jun',
            'Jul',
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dec',
          ],
          series: [[0, 0, 0, 0, 0, this.$store.state.manager.SOSPieData.totalRequests, 0, 0, 0, 0, 0, 0]],
        },
        options: {
          seriesBarDistance: 10,
          axisX: {
            showGrid: false,
          },
          height: '245px',
        },
      },
      preferencesChart: {
        data: {
          labels: ['solved', 'pending', 'canceled', 'accepted'],
          series: [],
        },
        options: {},
      },
    };
  },
  computed: {
    requests() {
      const totalRequests = this.$store.state.manager.SOSPieData.totalRequests * 0.01;
      const { solvedRequests } = this.$store.state.manager.SOSPieData;
      const { pendingRequests } = this.$store.state.manager.SOSPieData;
      const { canceledRequests } = this.$store.state.manager.SOSPieData;
      const { acceptedRequests } = this.$store.state.manager.SOSPieData;

      return [solvedRequests / totalRequests, pendingRequests / totalRequests, canceledRequests / totalRequests, acceptedRequests / totalRequests];
    },
    totalRequests() {
      return this.$store.state.manager.SOSPieData.totalRequests;
    },
  },
  watch: {
    requests() {
      this.preferencesChart.data.series = this.requests;
    },
    // totalRequests() {
    //   this.activityChart.data.series = this.totalRequests;
    // },
  },
  created() {
    this.preferencesChart.data.series = this.requests;
    // this.activityChart.data.series = this.totalRequests;
    if (this.$route.matched[0].path === '/admin' || this.$route.matched[0].path === '/manager') {
      this.getTopCardsData();
      this.getSOSPieData();
      this.getSOSChartData();
    }
  },
  methods: {
    getTopCardsData() {
      this.$store.dispatch('manager/getTopCardsData');
    },
    getSOSPieData() {
      this.$store.dispatch('manager/getSOSPieData');
    },
    getSOSChartData() {
      this.$store.dispatch('manager/getSOSChartData');
    },
  },
};
</script>
<style>
</style>
