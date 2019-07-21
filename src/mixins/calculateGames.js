export const calculateGames = {
    data () {
        return {
            teamsArray : [],
            schedule : [],
        }
    },
    computed : {
        numberOfTeams () {
            return this.$store.state.numberOfTeams;
        },
        numberOfGames () {
            return this.$store.state.numberOfGames;
        } 
    },
    methods: {
        gameOfTwo () {
            for (let j = 0; j < this.numberOfGames; j++) {
                if (j % 2) {
                    this.schedule.push({round: 0, home: {groupNr: 1, win: false}, away: {groupNr: 2, win:false}})
                } else {
                    this.schedule.push({round: 0, home: {groupNr: 2, win: false}, away: {groupNr: 1, win:false}})
                }
            } 
                /* Addera roundnummer  */ 
            for (let i = 0; i < this.schedule.length; i++) {
                this.schedule[i].round = i + 1;
            }  
            this.$store.dispatch('saveGameDataToDb', this.schedule)
        },

        gameOfThree () {
            for (let j = 0; j < this.numberOfGames; j++) {
                this.schedule.push({round: 0, home: {groupNr: 1, win: false}, away: {groupNr: 2, win:false}})
                this.schedule.push({round: 0, home: {groupNr: 2, win: false}, away: {groupNr: 3, win:false}})
                this.schedule.push({round: 0, home: {groupNr: 3, win: false}, away: {groupNr: 1, win:false}})
            }
                /* Addera roundnummer  */ 
            for (let i = 0; i < this.schedule.length; i++) {
                this.schedule[i].round = i+1;
            } 
            this.$store.dispatch('saveGameDataToDb', this.schedule) 
        },
        gameOfFour () {
            for (let j = 0; j < this.numberOfGames; j++) {
                this.schedule.push({round: 0, home: {groupNr: 1, win: false}, away: {groupNr: 2, win:false}})
                this.schedule.push({round: 0, home: {groupNr: 3, win: false}, away: {groupNr: 4, win:false}})
                this.schedule.push({round: 0, home: {groupNr: 4, win: false}, away: {groupNr: 1, win:false}})
                this.schedule.push({round: 0, home: {groupNr: 2, win: false}, away: {groupNr: 3, win:false}})
                this.schedule.push({round: 0, home: {groupNr: 3, win: false}, away: {groupNr: 1, win:false}})
                this.schedule.push({round: 0, home: {groupNr: 4, win: false}, away: {groupNr: 2, win:false}})
            }
                /* Addera roundnummer  */ 
            for (let i = 0; i < this.schedule.length; i++) {
                this.schedule[i].round = i + 1;
            } 
            this.$store.dispatch('saveGameDataToDb', this.schedule) 
        },
        gameOfFive () {
            for (let j = 0; j < this.numberOfGames; j++) {
                this.schedule.push({round: 0, home: {groupNr: 1, win: false}, away: {groupNr: 2, win:false}})
                this.schedule.push({round: 0, home: {groupNr: 3, win: false}, away: {groupNr: 4, win:false}})
                this.schedule.push({round: 0, home: {groupNr: 5, win: false}, away: {groupNr: 1, win:false}})
                this.schedule.push({round: 0, home: {groupNr: 2, win: false}, away: {groupNr: 3, win:false}})
                this.schedule.push({round: 0, home: {groupNr: 4, win: false}, away: {groupNr: 5, win:false}})
                this.schedule.push({round: 0, home: {groupNr: 1, win: false}, away: {groupNr: 4, win:false}})
                this.schedule.push({round: 0, home: {groupNr: 5, win: false}, away: {groupNr: 3, win:false}})
                this.schedule.push({round: 0, home: {groupNr: 2, win: false}, away: {groupNr: 4, win:false}})
                this.schedule.push({round: 0, home: {groupNr: 3, win: false}, away: {groupNr: 1, win:false}})
                this.schedule.push({round: 0, home: {groupNr: 2, win: false}, away: {groupNr: 5, win:false}})
            }
                /* Addera roundnummer  */ 
            for (let i = 0; i < this.schedule.length; i++) {
                this.schedule[i].round = i + 1;
            }  
            this.$store.dispatch('saveGameDataToDb', this.schedule)
        } 
    }
}