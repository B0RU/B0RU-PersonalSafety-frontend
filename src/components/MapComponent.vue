<template>
  <modal-component ref="chooseLocation">
    <template v-slot:header>
    </template>
    <template v-slot:body>
      <div>
        <div
          style="max-width: 800px; color: gray; margin: 0 auto; justify-content: space-between"
        >
            <h5>Drag Pin on the Department Location</h5>
        </div>
        <GmapMap ref="mapRef" :center="myCoordinates" :zoom="zoom" style="height:360px; ">
          <GmapMarker
            ref="myMarker"
            :position="myCoordinates"
            :clickable="true"
            :draggable="true"
            @click="center=myCoordinates"
            @dragend="handleDrag"
          />
        </GmapMap>
      </div>
    </template>
    <template v-slot:footer>
      <div @click="sendLocation">
        <new-button action="confirm" class="modalbtn"></new-button>
      </div>
    </template>
  </modal-component>
</template>

<script>
import modalComponent from './modalComponent.vue';
import newButton from './newButton.vue';

export default {
  components: {
    modalComponent,
    newButton,
  },
  data() {
    return {
      map: null,
      myCoordinates: {
        lat: 0,
        lng: 0,
      },
      zoom: 7,
    };
  },
  created() {
    this.$getLocation({})
      .then((coordinates) => {
        this.myCoordinates = coordinates;
      })
      .catch((error) => console.log(error));
  },
  mounted() {
    this.$refs.chooseLocation.openModal().then(() => {
      this.$refs.mapRef.$mapPromise.then((map) => {
        this.map = map;
      });
    });
  },
  methods: {
    handleDrag() {
      const lat = this.$refs.myMarker.$markerObject.getPosition().lat();
      const lng = this.$refs.myMarker.$markerObject.getPosition().lng();
      this.myCoordinates.lat = lat;
      this.myCoordinates.lng = lng;
    },
    sendLocation() {
      this.$refs.chooseLocation.$store.commit('updateLocation', this.myCoordinates);
      this.$refs.chooseLocation.closeModal();
    },
  },
};
</script>

<style scoped>
.modalbtn{
    background: #FF6584;
    width: 20%;
    margin: 0 auto;
    height: 2rem;
    line-height: 10px;
}
</style>
