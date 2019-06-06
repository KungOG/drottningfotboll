<template>
    <main>
        <input type="date" v-model="date" @change="saveDate">
    </main>
</template>
<script>
export default {
    name: 'calender',
    data () {
        return {
            date: ""
        }
    },
    computed: {
        
    },
    methods: {
        saveDate () {
            this.$store.dispatch('saveDate', this.date)
        }
    }
}
</script>
