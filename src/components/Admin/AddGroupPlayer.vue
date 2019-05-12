<template>
     <article class="main" v-touch:swipe.right="deletePlayer">
        <section class="list-wrapper">
            <section class="container">
                {{player.name}}
                <aside :style="{color: activeColor}">X</aside>
            </section>
        </section>
    </article>
</template>

<script>
export default {
    name : 'addgroupplayer',
    props: ['player', 'group'],
    computed: {},
    methods: {
        deletePlayer () {
            console.log('swoyush')
            this.$store.dispatch('deleteGroupPlayer', {
                group: this.group,
                player: this.player.uid
            });
        }
    }
}
</script>