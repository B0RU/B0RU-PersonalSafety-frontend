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
        <div class="dashboard">
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
};
</script>

<style>
.side{
  width: 15rem;
  height: 100%;
  margin: 50px 0px 0px 30px;
  position: fixed;
}
.dashboard {
  margin-top: 4%;
}
</style>
