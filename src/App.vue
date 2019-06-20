<template>
  <div id="app">
        <section class="admin-login">
        <a href="#" @click="$router.push('/admin')" class="admin-login-btn">Admin</a>
    </section>
    <router-view/>
  </div>
</template>

<script>
  export default {
    name: "App",

  };
</script>

<style lang="scss">
@import '@/assets/css/app.scss';
</style>
