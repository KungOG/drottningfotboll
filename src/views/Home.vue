<template>
  <main>
    <section class="logo">
      <h3>Här kommer en logga</h3>
    </section>
    <router-view />
  </main>
</template>

<script>

export default {
  name: 'home',
      beforeMount() {
        this.$router.push('/playerinfo')
    }

}
</script>
