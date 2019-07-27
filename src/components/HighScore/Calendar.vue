<template>
    <main class="calendar-page">
        <section class="calendar">
            <article class="date-container">
                <img src="@/assets/icon/arrow-down.svg"/>
                <datepicker 
                v-model="date"
                placeholder="Datum"
                :highlighted="highlighted"
                :language="sv"
                @change="saveDate"
                ></datepicker>
            </article>
            <article class="time-container">
                <img src="@/assets/icon/arrow-down.svg"/>
                <select v-model="time" @change="saveTime">
                    <option value="" disabled>Tid</option>
                    <option 
                    v-for="(date, index) in filterTime" 
                    :value="date.time" :key="index"
                    >{{date.time}}</option>
                </select>
            </article>
        </section>
    </main>
</template>
<script>
import Datepicker from 'vuejs-datepicker';
import {sv} from 'vuejs-datepicker/dist/locale';

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
            },
            sv: sv
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
            if (this.$store.state.date) {
                if (array.length !== 0) {
                    if (Number.isInteger(array[0].time)) {
                        array.forEach((x) => {
                        let num = x.time.toString();
                        let num2;
                        if (num.length === 3) {
                            var res1 = num.substr(0, 1);    
                            var res2 = num.substr(1, 3);
                            num2 = '0' + res1 + ':' + res2;
                        } else {
                            var res1 = num.substr(0, 2);    
                            var res2 = num.substr(2, 4);
                            num2 = res1 + ':' + res2;
                        }
                        x.time = num2;
                    })
                        return array;
                    } else {
                        return array;
                    }
                    return;
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
