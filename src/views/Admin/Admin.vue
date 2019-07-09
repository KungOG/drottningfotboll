<template>
    <main class="admin-page" v-touch:swipe.left="leftSwipe" v-touch:swipe.right="rightSwipe">
        <section class="admin-logout">
            <ul class="slider" :class="'slide-' + activeSlide"></ul>
            <img src="@/assets/icon/entrance.svg" alt="">
            <!-- @click="logout" -->
        </section>
        <section class="admin-logo">
            <img src="@/assets/img/crown.png" alt="">
            <img src="@/assets/img/fotball.png" alt="">
            <h1>ADMIN</h1>
        </section>
        <section class="admin-btn">        
            <section class="admin">
                <div class="one-admin-btn" @click="$router.push('/players')">
                    <img src="@/assets/icon/person.svg" alt=""> 
                    <span>SPELARE</span>
                </div>
                <div class="one-admin-btn" @click="$router.push('/makegames')">
                    <img src="@/assets/icon/settings.svg" alt="">
                    <span>SETUP</span>
                </div>
            </section>       
            <section class="admin">
                <div class="one-admin-btn" @click="$router.push('/groups')">
                    <img src="@/assets/icon/people.svg" alt=""> 
                    <span>GRUPPER</span>
                </div>
                <div class="one-admin-btn" @click="$router.push('/schedules')">
                    <img src="@/assets/icon/calendar-event.svg" alt="">
                    <span>SCHEMA</span>
                </div>
            </section>
        </section>
    </main>
</template>

<script>
export default {
    name : 'admin',
    beforeMount () {
        this.$store.dispatch('setAdminTeamPlayers');
    },
    methods: {

        /* Swipe funktionen */
        activeSlide () {
            return this.$store.state.activeSlide;
        },
        leftSwipe () {
            this.$store.commit('swipe', 2);
            this.$router.push('/stats')
        },
        rightSwipe () {
            this.$store.commit('swipe', 0);
            this.$router.push('/about')  
        }
    }

    /* 
    ! function som du kan logga ut måste göras
     */
}
</script>
