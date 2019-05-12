<template>
    <main class="content">
        <section>
            <p>Burgar</p>
            <p>Addera</p>
        </section>
        <section>
            <h3>{{group.name}}</h3>
            <addgroupplayer v-for="player in group.players" :key="player.uid" :group="group.id" :player="player"/>
        </section>
        <a href="#" @click="$router.push('/groups')">Grupper</a>
    </main>
</template>

<script>
import addgroupplayer from '@/components/Admin/AddGroupPlayer.vue';
export default {
    name : 'editgroups',
    components : {
        addgroupplayer
    },
    computed: {
        group () {
            return this.$store.getters.getChosenGroup(
                this.$route.params.id
        );
      }
    }
}
</script>