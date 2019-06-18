<template>
  <main class="about-page" v-touch:swipe.left="rightSwipe">
    <section class="about-logo">
      <ul class="slider" :class="'slide-' + activeSlide"></ul>
      <img src="@/assets/img/crown.png" alt="">
      <img src="@/assets/img/fotball.png" alt="">
    </section>
    <section class="about-text">
      <h2>Kung Fotboll</h2>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</p>
    </section>
  </main>
</template>

<script>
export default {
  name: 'about',
    methods: {
        /* Swipe funktionen */
        rightSwipe () {
            this.$store.commit('swipe', 1);
            this.$router.push('/home')
            console.log('Right S')
        },
        activeSlide () {
            return this.$store.state.activeSlide;
        }
    }
}
</script>