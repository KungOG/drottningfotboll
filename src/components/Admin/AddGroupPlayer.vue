<template>
    <main class="addgroupplayer">
        <article v-touch:swipe.right="deletePlayer">
            <section class="list-wrapper">
                <section class="container">
                    <p>{{player.name}}</p>
                </section>
            </section>
        </article>
    </main>
</template>
<script>
export default {
    name : 'addgroupplayer',
    props: ['player', 'group'],
    computed: {},
    methods: {
        deletePlayer () {
            this.$store.dispatch('deleteGroupPlayer', {
                group: this.group,
                player: this.player.uid
            });
            this.$emit('update')
        }
    }
}
</script>