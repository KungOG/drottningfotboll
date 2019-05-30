export const calculatePoints = {
    beforeMount: function () {
        console.log('Just connected Mixin')
    },
    data () {
        return {
            group1: {
                points : 0,
                win : 0,
                loss : 0,
                tie : 0
            },  
            group2: {
                points : 0,
                win : 0,
                loss : 0,
                tie : 0
            },  
            group3: {
                points : 0,
                win : 0,
                loss : 0,
                tie : 0
            },  
            group4: {
                points : 0,
                win : 0,
                loss : 0,
                tie : 0
            },  
            group5: {
                points : 0,
                win : 0,
                loss : 0,
                tie : 0
            },  
        }
    },
    computed: {
        numberOfGroups() {
            return this.$store.getters.getNumberOfTeams
        }
    },
    methods: {
        savePoints() {
            let winnerArray = this.winner;
            let newArray = [];
            for(let i = 0; i < winnerArray.length; i++) {
                if(winnerArray[i].home.groupNr === 1 || winnerArray[i].away.groupNr === 1) {
                    if(winnerArray[i].home.win === true && winnerArray[i].away.win === false) {
                         /* win */
                        this.group1.points += 3;
                        this.group1.win += 1;   
                        console.log('grupp1 win')            
                       
                    } 
                        if (winnerArray[i].home.win === true && winnerArray[i].away.win === true) {
                            /* tie */
                            this.group1.points += 2;
                            this.group1.tie += 1; 
                            console.log('grupp1 tie') 
                            
                        } 
                        if(winnerArray[i].home.win === false && winnerArray[i].away.win === true) {
                            /* loss */
                            this.group1.points += 1;
                            this.group1.loss += 1; 
                            console.log('grupp1 loss') 
                        }
                }
                if(winnerArray[i].home.groupNr === 2 || winnerArray[i].away.groupNr === 2) {
                    if(winnerArray[i].home.win === true && winnerArray[i].away.win === false) {
                         /* win */
                        this.group2.points += 3;
                        this.group2.win += 1;
                        console.log('grupp2 vinst')               
                       
                    } 
                        if (winnerArray[i].home.win === true && winnerArray[i].away.win === true) {
                            /* tie */
                            this.group2.points += 2;
                            this.group2.tie += 1; 
                            console.log('grupp2 lika') 
                        } 
                        if(winnerArray[i].home.win === false && winnerArray[i].away.win === true) {
                            /* loss */
                            this.group2.points += 1;
                            this.group2.loss += 1;
                            console.log('grupp2 loss') 
                        }
                }
            }
           
            this.$store.dispatch('calculatePoints', {nr1: this.group1, nr2: this.group2})
        }
    }
}