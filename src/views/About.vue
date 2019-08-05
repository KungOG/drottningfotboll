<template>
  <main class="about-page" v-touch:swipe.left="rightSwipe">
    <section class="about-logo">
      <Pager :activeSlide = '0'/>
      <img src="@/assets/img/logo-notext.svg" alt="KungFotboll logo with no text">
    </section>
    <section class="about-text">
      <h1>Kung Fotboll</h1>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</p>
    </section>
  </main>
</template>
<script>
import Pager from '@/components/Pager.vue';
export default {
  name: 'about',
  components: {
    Pager
  },
  computed: {
    currentUser() {
        return this.$store.getters.getCurrentUser;
    },
    adminUser() {
        return this.$store.state.getAdminUser;
    }
  },
  methods: {
    rightSwipe () {
      if (this.adminUser !== null) {
          this.$router.push('/admin')
      } else if (this.currentUser !== null) {
          this.$router.push('/playerinfo');
      } else {
          this.$router.push('/home')
      }
    }
  }
}
</script>