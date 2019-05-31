export const calculatePoints = {
 
    data () {
        return { 
            scoreArray : [],
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
    computed: {
        numberOfGroups() {
            return this.$store.getters.getNumberOfTeams;
        }
    },
    methods: {
        savePoints() {
            let winnerArray = this.winner; 
            let groups = this.groups;       //0-5     allGroups  0-4
            
            /* tilldela grupperna poäng */
            for(let k = 1; k < groups.length; k++) {
                for(let i = 0; i < winnerArray.length; i++) {            
                    
                    if(winnerArray[i].home.groupNr === k || winnerArray[i].away.groupNr === k) {
                        if(winnerArray[i].home.win === true && winnerArray[i].away.win === false) {
                            /* win */
                            this.allGroups[k-1].point += 3;
                            this.allGroups[k-1].win += 1;   
                            console.log('grupp' + k + 'win')          
                        } 
                        if (winnerArray[i].home.win === true && winnerArray[i].away.win === true) {
                            /* tie */
                            this.allGroups[k-1].point += 2;
                            this.allGroups[k-1].tie += 1; 
                            console.log('grupp' + k + 'tie') 
                        } 
                        if(winnerArray[i].home.win === false && winnerArray[i].away.win === true) {
                            /* loss */
                            this.allGroups[k-1].point += 1;
                            this.allGroups[k-1 ].loss += 1; 
                            console.log('grupp' + k + 'loss') 
                        }
                    }     
                }
            }

        /* tilldela spelarna poäng */
        for(let i = 0; i < groups.length; i++) {
            for(let s = 1; s < this.allGroups.length; s++) {
                if(groups[i].id === s) {
                    for(let j = 0; j < groups[i].players.length; j++) {
                        this.scoreArray.push({
                            uid: groups[i].players[j].uid, 
                            point: this.allGroups[s].point, 
                            win: this.allGroups[s].win, 
                            loss: this.allGroups[s].loss, 
                            tie: this.allGroups[s].tie
                        }) 
                    }
                }
            }
        }
            this.$store.dispatch('calculatePoints', this.scoreArray)
        }
    }
}
