<template>
    <main>
        <section>
            <p>
                {{goalgroupplayer.name}}
            </p>
            <span @click="addGoal('minus')"> - </span>
            <span> {{goals}} </span>
            <span @click="addGoal('plus')"> + </span>
        </section>
    </main>
</template>

<script>
export default {
    name: 'goalgroupplayer',
    props: ['goalgroupplayer'],
    data () {
        return {
            goals: 0,
            result: false
        }
    },
    mounted () {
        if (localStorage.getItem('goalTracker')) {
            let item = JSON.parse(localStorage.getItem('goalTracker'));
            for(let i = 0; i < item.length; i++) {
                if (this.goalgroupplayer.uid == item[i].player) {
                    this.goals = item[i].goals;
                }
            }
        } else {
            let item = [];
            localStorage.setItem('goalTracker', JSON.stringify(item));
        }
    },
    methods: {
        addGoal (goals) {
            if(goals == 'minus' && this.goals > 0) {
                this.goals--;
            }
            if(goals == 'plus') {
                this.goals++;
            }
            this.goalCount();
        },
        goalCount () {           
        let item = JSON.parse(localStorage.getItem('goalTracker'));
        
        if(!item.length == 0) {                                       
            for(var i=0; i < item.length; i++) {                       
                if(this.goalgroupplayer.uid == item[i].player) {                         
                    this.result = true                                      
                    var a = item.indexOf(item[i])               
                    item.splice(a, 1)                                 
                    item.push({
                            player: this.goalgroupplayer.uid,
                            goals: this.goals
                    })              
                } else {
                    this.result = false                                     
                }               
            } 
           if(this.result === false) {                                          
               item.push({
                            player: this.goalgroupplayer.uid,
                            goals: this.goals
                        })                       
           }      
           this.result = false          

           } else {
                item.push({
                    player: this.goalgroupplayer.uid,
                    goals: this.goals
                })                       
           }
           localStorage.setItem('goalTracker', JSON.stringify(item));
        }
    }
}
</script>
