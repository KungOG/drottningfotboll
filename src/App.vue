<template>
  <div id="app">
    <div id="nav">
      <router-link to="/home">Home</router-link> |
      <router-link to="/about">About</router-link>|
      <router-link to="/stats">Stats</router-link>|
      <router-link to="/admin">Admin</router-link> |
      <router-link to="/players">Players</router-link>|
      <router-link to="/makegames">Make games</router-link> |
      <router-link to="/makegroups">Make groups</router-link>|
      <router-link to="/schedules">Schedules</router-link>|
      <router-link to="/editplayer">Edit Player</router-link>|
      <router-link to="/playerinfo">Player info</router-link>
    </div>
    <router-view/>
  </div>
</template>

<script>
  export default {
    name: "App",

  };
</script>

<style lang="scss">
@import '@/scss/main.scss';
</style>
