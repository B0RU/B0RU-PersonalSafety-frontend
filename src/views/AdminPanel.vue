<template>
    <div class="adminPanel">
        <div class="side">
            <router-link to="/admin/register-agent">
                <add-button name="Agent"></add-button>
            </router-link>
            <router-link to="/admin/register-manager">
                <add-button name="Manager"></add-button>
            </router-link>
        </div>
        <router-view/>
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
.adminPanel{
  display: inline;
  background-color: #3C4357;
}
.side{
  width: 15rem;
  height: 100%;
  margin: 50px 0px 0px 30px;
  position: fixed;
}
</style>
