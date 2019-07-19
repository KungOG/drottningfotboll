<template>
    <main class="calendar-page">
        <section class="calendar">
            <datepicker 
            v-model="date"
            :highlighted="highlighted"
            @change="saveDate"
            ></datepicker>
            <select v-model="time" @change="saveTime">
                <option v-for="(date, index) in filterTime" :value="date.time" :key="index">{{date.time}}</option>
            </select>
        </section>
    </main>
</template>
<script>
import Datepicker from 'vuejs-datepicker';
export default {
    name: 'calendar',
    mounted () {
        if(this.$store.state.date) {            
            this.date = new Date(this.$store.state.date);
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
            let array = this.$store.getters.filterTime;
            console.log(array[0])
            if (this.$store.state.chosenTime) {
                if (Number.isInteger(array[0].time)) {
                    array.forEach((x) => {
                    let num = x.time.toString();
                    var res1 = num.substr(0, 2);
                    var res2 = num.substr(2, 4);
                    let num2 = res1 + ':' + res2;
                    x.time = num2;
                    })
                    return array;
                }
            }
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
            /* this.$emit('changeDate') */
        },
        saveTime () {
            this.$store.dispatch('saveTime', this.time) 
            this.$emit('changeDate')
        },
        setHighlightedDates() {
            this.highlighted.dates.length = 0;
            for(let i = 0; i < this.specificTeamData.length; i++) {
                this.highlighted.dates.push(new Date (this.specificTeamData[i].date))
            }
        }
    }
        
}
</script>
