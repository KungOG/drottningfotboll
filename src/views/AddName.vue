<template>
    <section>
        <input type="text" placeholder="Namn" label="Name" v-model="name" />
        <br>
        <a href="#" @click="addName">Submit</a>
    </section>
</template>

<script>
export default {
    name: 'addname',
    data () {
        return {
            name: '',
        }
    },
    methods: {
        addName () {
            this.$store.dispatch('addPlayerName', this.name);
            this.$router.push("/playerinfo");
        }
    }
}
</script>