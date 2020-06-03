<template>
  <GmapMap ref="trackingMap" :center="center" :zoom="zoom" style="height:100%;" @click="restoreMap">
    <div v-if="visible">
        <GmapMarker v-for="department in departments" :key="department.id"
            ref="departmentMarker"
            :position="{lat: department.latitude, lng:department.longitude}"
            :icon='departmentIcons[department.authorityTypeName].icon'
            :visible='visible'
            :clickable='true'
            @click="getRescuers(department.id, department.departmentName)"
        >
          <gmap-info-window :opened='ifw'>
            {{department.authorityTypeName}} <br> {{department.distributionName}}
          </gmap-info-window>
        </GmapMarker>
    </div>
    <div v-else>
      <GmapMarker v-for="(rescuer, index) in rescuers" :key="index"
      ref="rescuerMarker"
      :position="rescuer.position"
      :icon="rescuerIcons[rescuer.authorityTypeName].icon"
      >

      </GmapMarker>
    </div>
  </GmapMap>
</template>

<script>
// import GmapCluster from 'vue2-google-maps/dist/components/cluster';

export default {
  // components: { GmapCluster },
  data() {
    return {
      map: null,
      position: {
        lat: 0,
        lng: 0,
      },
      myCoordinates: {
        lat: 0,
        lng: 0,
      },
      center: {
        lat: 26.98555720237665,
        lng: 31.638810825000014,
      },
      zoom: 6,
      ifw: false,
      visible: this.$route.name !== 'agentRescuers',
      rescuers: [],
      departmentName: '',
      interval: null,
      departmentIcons: {
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
      rescuerIcons: {
        TowTruck: {
          icon: '/TowTruckRescuer.png',
        },
        Ambulance: {
          icon: '/AmbulanceRescuer.png',
        },
        Police: {
          icon: '/PoliceRescuer.png',
        },
        Firefighting: {
          icon: '/FirefightingRescuer.png',
        },
      },
    };
  },
  created() {
    if (this.$route.name === 'agentRescuers') {
      this.$locationHub.start().then(() => {
        this.$locationHub.locationOpened(this.$store.state.personnel.info.departmentName);
      });
    }
    this.$locationHub.$on('location-changed', this.locationChanged);
  },
  mounted() {
    this.$refs.trackingMap.$mapPromise.then((map) => {
      this.map = map;
    });
    this.$locationHub.$on('location-changed', this.locationChanged);
  },
  beforeDestroy() {
    this.$locationHub.$off('location-changed', this.locationChanged);
    this.$locationHub.stop();
  },
  watch: {
    onlineRecuers(rescuers) {
      if (rescuers.length > 0) {
        rescuers.forEach((rescuer) => {
          this.rescuers.push({ rescuer, position: null, authorityTypeName: this.$store.state.personnel.info.authorityTypeName });
        });
      } else {
        this.rescuers = [];
      }
      // this.rescuers = rescuers;
      // this.rescuers.forEach((rescuer) => {
      //   // eslint-disable-next-line no-param-reassign
      //   rescuer.position = null;
      //   // eslint-disable-next-line no-param-reassign
      //   rescuer.authorityTypeName = this.$store.state.personnel.info.authorityTypeName;
      // });
      console.log(rescuers);
      console.log(this.rescuers);
    },
  },
  computed: {
    departments() {
      return this.$store.state.manager.departments;
    },
    onlineRecuers() {
      return this.$store.state.personnel.rescuers;
    },
  },
  methods: {
    getRescuers(id, name) {
      const { departments } = this.$store.state.manager;
      const department = departments.filter((item) => item.id === id);
      department[0].rescuersEmails.forEach((rescuer) => {
        this.rescuers.push({ rescuerEmail: rescuer, authorityTypeName: department[0].authorityTypeName, position: { lat: null, lng: null } });
      });
      this.visible = false;
      this.$locationHub.start().then(() => {
        this.$locationHub.locationOpened(name);
      });
      this.rescuers.forEach((rescuer) => {
        if (rescuer.position.lat === null && rescuer.position.lng === null) {
          // eslint-disable-next-line no-param-reassign
          rescuer.position = null;
        }
      });
    },
    locationChanged(payload) {
      this.rescuers.forEach((rescuer) => {
        if (payload.position.lat === null && payload.position.lng === null) {
          // eslint-disable-next-line no-param-reassign
          rescuer.position = null;
        } else {
          // eslint-disable-next-line no-param-reassign
          rescuer.position = payload.position;
        }
      });
    },
    restoreMap() {
      this.visible = true;
      this.rescuers = [];
      this.$locationHub.stop();
    },
  },
};
</script>

<style>
.gm-style-iw{
  color: black;
}
</style>
