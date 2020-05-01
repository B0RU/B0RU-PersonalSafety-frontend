<template>
    <div class="adminPanel">
        <div class="side">
            <router-link to="/admin/dashboard">
                <add-button action="Dashboard"></add-button>
            </router-link>
            <router-link to="/admin/register-agent">
                <add-button action="New Agent"></add-button>
            </router-link>
            <router-link to="/admin/register-manager">
                <add-button action="New Manager"></add-button>
            </router-link>
        </div>
        <div class="main-actions">
        <router-view/>
        </div>
    </div>
</template>

<script>
import addButton from '../components/newButton.vue';

export default {
  components: {
    addButton,
  },
  created() {
    this.getDepartments();
  },
  methods: {
    getDepartments() {
      this.$store.dispatch('manager/getDepartments');
    },
  },
};
</script>

<style>
.adminPanel{
  display: flex;
    margin-top: 30px;
}
.side{
   width: 15%;
    height: 100%;
    margin-left: 25px;
}
.main-actions {
    width: 75%;
    margin: 0 auto;
    float: right;
    background-color: #5E657A;
    height: 500px;
    border-radius: 15px;
}
</style>
