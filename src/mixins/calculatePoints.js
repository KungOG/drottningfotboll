export const calculatePoints = {
    beforeMount: function () {
        console.log('Just connected Mixin')
    },
    data () {
        return { 
            scoreArray : [],
            group1: {
                point : 0,
                win : 0,
                loss : 0,
                tie : 0
            },  
            group2: {
                point : 0,
                win : 0,
                loss : 0,
                tie : 0
            },  
            group3: {
                point : 0,
                win : 0,
                loss : 0,
                tie : 0
            },  
            group4: {
                point : 0,
                win : 0,
                loss : 0,
                tie : 0
            },  
            group5: {
                point : 0,
                win : 0,
                loss : 0,
                tie : 0
            },  
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
            let groups = this.groups;
            
            
            //loopen körs för varje object i winner array
            for(let i = 0; i < winnerArray.length; i++) {            
                    
                    if(winnerArray[i].home.groupNr === 1 || winnerArray[i].away.groupNr === 1) {
                        if(winnerArray[i].home.win === true && winnerArray[i].away.win === false) {
                            /* win */
                            this.group1.point += 3;
                            this.group1.win += 1;   
                            console.log('grupp1 win')            
                        
                        } 
                            if (winnerArray[i].home.win === true && winnerArray[i].away.win === true) {
                                /* tie */
                                this.group1.point += 2;
                                this.group1.tie += 1; 
                                console.log('grupp1 tie') 
                                
                            } 
                                if(winnerArray[i].home.win === false && winnerArray[i].away.win === true) {
                                    /* loss */
                                    this.group1.point += 1;
                                    this.group1.loss += 1; 
                                    console.log('grupp1 loss') 
                                }
                    }
     
            
        }

        //tilldela spelarna poäng
        console.log(groups)
        for(let i = 0; i < groups.length; i++) {
            console.log('1')
            if(groups[i].id === 1) {
                console.log('2')
                for(let j = 0; j < groups[1].players.length; j++) {
                    console.log('3')
                    this.scoreArray.push({
                        uid: groups[1].players[j].uid, 
                        point: this.group1.point, 
                        win: this.group1.win, 
                        loss: this.group1.loss, 
                        tie: this.group1.tie
                    }) 
                }
            }
        }
    
            this.$store.dispatch('calculatePoints', this.scoreArray)
        }
    }
}
