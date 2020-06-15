<template>
      <b-overlay :show="status" opacity="1" variant="transparent" spinner-variant="primary">

  <div>

    <!--event cards-->
    <div class="row" v-if="events.length > 0">
      <div class="col-md-6 col-xl-3" v-for="event in events" :key="event.id">
        <card class="card-user">
    <div slot="image">
      <img :src="`https://personalsafety.azurewebsites.net/${event.thumbnailUrl}`" :alt="event.title">
    </div>
    <div>
      <div class="author">
        <p class="avatar border-white"> {{event.eventCategoryName}} </p>
        <h4 class="title">{{event.title}} <i v-if="event.isValidated" class="ti-check text-info" v-b-tooltip.hover title="Valid Event"></i>
          <br>
          <a href="#">
            <small>@{{event.userName}}</small>
          </a>
        </h4>
      </div>
      <p class="description text-center">
        {{event.description}}
      </p>
    </div>
    <hr>
    <div class="text-center">
      <div class="row">
        <div :class="getClasses(2)">
          <h5>{{event.votes}}
            <br>
            <small>Votes</small>
          </h5>
          </div>
          <div :class="getClasses(2)" style="margin-left: 30%">
              <img v-if="event.isPublicHelp" src="../assets/img/megaphone.png" v-b-tooltip.hover title="publicHelp">
        </div>
      </div>
      <hr>
        <div class="text-center" >
         <!-- <img v-if="event.isValidated"
         src="../assets/img/criss-cross.png"
         v-b-tooltip.hover title="Invalidate Event"
         @click="invalidateEvent(event.id)"
         > -->
         <div v-if="event.isValidated" class="validate-event"
         @click="invalidateEvent(event.id)"
         >
         <span>Invalidate Event</span>
         </div>
         <div v-else class="validate-event"
         @click="validateEvent(event.id)"
         >
          <span>Validate Event</span>
         </div>
         <!-- <img v-else
         src="../assets/img/stamp.png"
         v-b-tooltip.hover title="Validate Event"
         @click="validateEvent(event.id)"
         > -->
        </div>
    </div>
  </card>
      </div>
    </div>
    <div v-else>
        <h2>No Events in your distribution Yet.</h2>
    </div>

  </div>
      </b-overlay>
</template>
<script>
// import Chartist from 'chartist';
// import { EventsCard } from '../components/index';

export default {
//   components: {
//     EventsCard,
//   },
  /**
   * Chart data used to render event, charts. Should be replaced with server data
   */
  computed: {
    events() {
      return this.$store.state.manager.events;
    },
    status() {
      return this.$store.state.manager.status === 'loading';
    },
  },

  created() {
    this.getEvents();
  },
  methods: {
    getEvents() {
      this.$store.dispatch('manager/getEvents');
    },
    validateEvent(eventId) {
      this.$store.dispatch('manager/validateEvent', eventId)
        .then(() => { this.getEvents(); });
    },
    invalidateEvent(eventId) {
      this.$store.dispatch('manager/invalidateEvent', eventId)
        .then(() => { this.getEvents(); });
    },
    getClasses(index) {
      const remainder = index % 3;
      if (remainder === 0) {
        return 'col-lg-3 offset-lg-1';
      } if (remainder === 2) {
        return 'col-lg-4';
      }
      return 'col-lg-3';
    },
  },
};
</script>
<style lang='scss' scoped>
.validate-event {
  background-color: #16B68F;
  cursor: pointer;
  color: white;
  border-radius: 3px;
  line-height: 2.5;
  font-size: 1rem;
  font-weight: bold;
}
</style>
