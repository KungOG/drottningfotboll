<template>
    <main>
        <!-- <input type="date" v-model="date" @change="saveDate"> -->

        <datepicker 
        v-model="date"
        :highlighted="highlighted"
        @change="saveDate"
        ></datepicker>

        <select v-model="time" @change="saveTime">
            <option v-for="date in filterTime" :value="date.time">{{date.time}}</option>
        </select>
    </main>
</template>
<script>
import Datepicker from 'vuejs-datepicker';
export default {
    name: 'calender',
    mounted () {
        if(this.$store.state.date) {
            this.date = this.$store.state.date;
        }
        if(this.$store.state.time) {
            this.time = this.$store.state.time;
        }
        this.setHighlightedDates();
    },
    data () {
        return {
            date: '',
            time: '',
            highlighted: {
                dates: []
            }
        }
    },
    components: {
        Datepicker
    },
    watch: {
        date() {
            this.saveDate()
        },
        specificTeamData() {
            this.setHighlightedDates()
        }
    },
    computed: {
        filterTime() {
            return this.$store.getters.filterTime;
        },
        specificTeamData() {
            return this.$store.getters.getSpecificTeamData;
        }
    },
    methods: {
        saveDate () {
            let date = this.date.toISOString().slice(0,10);
            this.$store.dispatch('saveDate', date)
            console.log(date) 
            this.$emit('changeDate')
        },
        saveTime () {
            this.$store.dispatch('saveTime', this.time) 
            this.$emit('changeDate')
        },
        setHighlightedDates() {
            this.highlighted.dates.length = 0;
            for(let i = 0; i < this.specificTeamData.length; i++) {
                this.highlighted.dates.push(new Date (this.specificTeamData[i].date))
                console.log('sada')
            }
        }
    }
        
}
</script>
