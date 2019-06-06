<template> 
    <article>
        <section></section>
        <section v-for="group in groups" :key="group.id">
            <h3 v-if="group.players[0]">{{group.name}}</h3>
            <group :group="group.players" />
        </section>
    </article>
</template>

<script>
import db from '@/firebaseInit';
import group from '@/components/Admin/Group.vue';

export default {
    name : 'gamegroup',
    components: {
        group
    },
    data () {
        return {
            currentGame: 'currentGame',
            groups: [],
        }
    },
    mounted() {
   
        var item = db.collection('games').doc(this.currentUser.teams[0]).collection(this.currentGame).doc('1')
        
        item.get().then((doc) => {
            var group = doc.data().groups
            this.groups = group
        })               
    },
    computed: {
        currentUser() {
            return this.$store.getters.getCurrentUser;
        }     
    },
    methods: {
/*         if (date === 1 ) {
            this.currentGame = date
        } else {
            currentGame = 'currentGame'
        } */

    },
}
</script>