<template>
  <main>
    <section>
      <h3>Home</h3>
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
