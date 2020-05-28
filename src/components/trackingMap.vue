<template>
  <GmapMap ref="trackingMap" :center="center" :zoom="zoom" style="height:100%; ">
    <GmapCluster :grid-size="30">
        <GmapMarker v-for="department in departments" :key="department.departmentId"
            ref="departmentMarker"
            :position="{lat: department.longitude, lng:department.latitude}"
            :icon='icons[department.authorityTypeName].icon'
        >
        </GmapMarker>
    </GmapCluster>
  </GmapMap>
</template>

<script>
import GmapCluster from 'vue2-google-maps/dist/components/cluster';

export default {
  components: { GmapCluster },
  data() {
    return {
      map: null,
      myCoordinates: {
        lat: 0,
        lng: 0,
      },
      center: {
        lat: 26.98555720237665,
        lng: 31.638810825000014,
      },
      zoom: 6,
      icons: {
        TowTruck: {
          icon: '/TowTruck.png',
        },
        Ambulance: {
          icon: '/Ambulance.png',
        },
        Police: {
          icon: '/Police.png',
        },
        Firefighting: {
          icon: '/Firefighting.png',
        },
      },
    };
  },
  created() {
    this.$getLocation({})
      .then((coordinates) => {
        this.myCoordinates.lat = coordinates.lat;
        this.myCoordinates.lng = coordinates.lng;
      })
      .catch((error) => console.log(error));
  },
  mounted() {
    this.$refs.trackingMap.$mapPromise.then((map) => {
      this.map = map;
    });
  },
  computed: {
    departments() {
      return this.$store.state.manager.departments;
    },
  },
  methods: {
    handleDrag() {
      const lat = this.$refs.departmentMarker.$markerObject.getPosition().lat();
      const lng = this.$refs.departmentMarker.$markerObject.getPosition().lng();
      this.myCoordinates.lat = lat;
      this.myCoordinates.lng = lng;
      console.log(lat, lng);
    },
  },
};
</script>

<style>
</style>
