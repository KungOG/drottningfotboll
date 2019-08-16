<template>
<main class="pager">
    <section class="pager-section">
        <div :class="{ active : activeSlide == 0 }" @click="$router.push('/about')"></div>
        <div :class="{ active : activeSlide == 1 }" @click="middleSwipe"></div>
        <div :class="{ active : activeSlide == 2 }" @click="$router.push('/stats')"></div>
    </section>
</main>
</template>

<script>
export default {
    name: 'pager',
    props: ['activeSlide'],
    computed: {
    currentUser() {
        return this.$store.getters.getCurrentUser;
    },
    adminUser() {
        return this.$store.getters.getAdminUser;
    }
  },
  methods: {
    middleSwipe () { 
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
<style lang="css" scoped>
.pager {
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
}

.active {
   background-color: #F19344;
}
.pager-section {
    display: flex;
    justify-content: space-between;
    width: 3rem;
    margin: 1rem 0;
}
div {
    width: .6rem;
    height: .6rem;
    background-color: #666;
    border-radius: 999rem;
}
    
</style>