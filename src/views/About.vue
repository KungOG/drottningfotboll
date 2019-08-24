<template>
  <main class="about-page" v-touch:swipe.left="rightSwipe">
    <section class="about-logo">
      <Pager :activeSlide = '0'/>
      <img src="@/assets/img/logo-queen-notext.svg" alt="Drottning Fotboll logo with no text">
    </section>
    <section class="about-text">
      <section class="text">
        <h1>Drottning Fotboll</h1>
        <p>..är ett begrepp som används i södra Halland efter avslutad säsong, där lagen spelar internt om poäng och vinnaren kan titulera sig '<strong>Drottning Fotboll</strong>' och får även något sorts pris.</p>
        <hr>
        <p>Som inloggad användare sparas en liten del personlig data och du har <strong>alltid möjlighet att ta bort den</strong>. Vid eventuella frågor kan du alltid <a href="mailto:support@drottningfotboll.nu">kontakta oss per mail</a>.</p>
      </section>
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
        return this.$store.getters.getAdminUser;
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