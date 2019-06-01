export const calculatePoints = {
 
    data () {
        return { 
            scoreArray: [],
            gameSettings: {},
            allGroups: [
            {
                point : 0,
                win : 0,
                loss : 0,
                tie : 0
            },  
            {
                point : 0,
                win : 0,
                loss : 0,
                tie : 0
            },  
            {
                point : 0,
                win : 0,
                loss : 0,
                tie : 0
            },  
            {
                point : 0,
                win : 0,
                loss : 0,
                tie : 0
            },  
            {
                point : 0,
                win : 0,
                loss : 0,
                tie : 0
            }],  
        }
    },
    mounted() {
        if (localStorage.getItem('gameSettings')) {
            this.gameSettings = JSON.parse(localStorage.getItem('gameSettings')); 
        }    
    },
    computed: {
        numberOfGroups() {
            return this.$store.getters.getNumberOfTeams;
        }
    },
    methods: {
        savePoints() {
            let winnerArray = this.winner; 
            let groups = this.groups;       //0-5     allGroups  0-4
            console.log('poängfunktion körs')
            
            /* tilldela grupperna poäng */
            for(let k = 1; k < groups.length; k++) {
                for(let i = 0; i < winnerArray.length; i++) {            
                    console.log('1')
                    if(winnerArray[i].home.groupNr === k) {
                        console.log('2')
                        if(winnerArray[i].home.win === true && winnerArray[i].away.win === false) {
                            /* win */
                            this.allGroups[k-1].point += this.gameSettings.numberOfWin;
                            this.allGroups[k-1].win += 1;   
                            console.log('grupp' + k + 'win')          
                        } 
                        if (winnerArray[i].home.win === true && winnerArray[i].away.win === true) {
                            /* tie */
                            this.allGroups[k-1].point += this.gameSettings.numberOfEqual;
                            this.allGroups[k-1].tie += 1; 
                            console.log('grupp' + k + 'tie') 
                        } 
                        if(winnerArray[i].home.win === false && winnerArray[i].away.win === true) {
                            /* loss */
                            this.allGroups[k-1].point += this.gameSettings.numberOfLoss;
                            this.allGroups[k-1 ].loss += 1; 
                            console.log('grupp' + k + 'loss') 
                        }
                    }   
                    if(winnerArray[i].away.groupNr === k) {
                        if(winnerArray[i].home.win === false && winnerArray[i].away.win === true) {
                            /* win */
                            this.allGroups[k-1].point += this.gameSettings.numberOfWin;
                            this.allGroups[k-1].win += 1;   
                            console.log('grupp' + k + 'win')          
                        } 
                        if (winnerArray[i].home.win === true && winnerArray[i].away.win === true) {
                            /* tie */
                            this.allGroups[k-1].point += this.gameSettings.numberOfEqual;
                            this.allGroups[k-1].tie += 1; 
                            console.log('grupp' + k + 'tie') 
                        } 
                        if(winnerArray[i].home.win === true && winnerArray[i].away.win === false) {
                            /* loss */
                            this.allGroups[k-1].point += this.gameSettings.numberOfLoss;
                            this.allGroups[k-1 ].loss += 1; 
                            console.log('grupp' + k + 'loss') 
                        }
                    }   
                }
            }

        /* tilldela spelarna poäng */
        for(let i = 0; i < groups.length; i++) {
            for(let s = 0; s < this.allGroups.length; s++) {
                if(groups[i].id === s && s !== 0) {
                    for(let j = 0; j < groups[i].players.length; j++) {
                        this.scoreArray.push({
                            uid: groups[i].players[j].uid, 
                            point: this.allGroups[s-1].point, 
                            win: this.allGroups[s-1].win, 
                            loss: this.allGroups[s-1].loss, 
                            tie: this.allGroups[s-1].tie
                        }) 
                    }
                }
            }
        }
            this.$store.dispatch('calculatePoints', this.scoreArray)
        }
    }
}
