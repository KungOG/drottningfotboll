<template>
    <main>
        <input type="date" v-model="date" @change="saveDate">
        <select v-model="time" @change="saveTime">
            <option v-for="date in filterTime" :value="date.time">{{date.time}}</option>
        </select>
    </main>
</template>
<script>
export default {
    name: 'calender',
    mounted () {
        if(this.$store.state.date) {
            this.date = this.$store.state.date;
        }
        if(this.$store.state.time) {
            this.time = this.$store.state.time;
        }
    },
    data () {
        return {
            date: '',
            time: ''
        }
    },
    computed: {
        filterTime() {
            return this.$store.getters.filterTime;
        }
    },
    methods: {
        saveDate () {
            this.$store.dispatch('saveDate', this.date) 
            this.$emit('changeDate')
        },
        saveTime () {
            this.$store.dispatch('saveTime', this.time) 
            this.$emit('changeDate')
        }
    }
        
}
</script>
