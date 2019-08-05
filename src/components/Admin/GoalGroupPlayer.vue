<template>
    <main>
        <section>
            <span>{{goalgroupplayer.name}}</span>
            <section>
                <span @click="addGoal('minus')"> - </span>
                <span> {{goal}} </span>
                <span @click="addGoal('plus')"> + </span>
            </section>
        </section>
    </main>
</template>
<script>
export default {
    name: 'goalgroupplayer',
    props: ['goalgroupplayer'],
    data () {
        return {
            goal: 0,
            result: false
        }
    },
    mounted () {
        if (localStorage.getItem('goalTracker')) {
            let item = JSON.parse(localStorage.getItem('goalTracker'));
            for(let i = 0; i < item.length; i++) {
                if (this.goalgroupplayer.uid == item[i].player) {
                    this.goal = item[i].goal;
                }
            }
        } else {
            let item = [];
            localStorage.setItem('goalTracker', JSON.stringify(item));
        }
    },
    methods: {
        addGoal (goal) {
            if(goal == 'minus' && this.goal > 0) {
                this.goal--;
            }
            if(goal == 'plus') {
                this.goal++;
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
                            goal: this.goal
                    })              
                } else {
                    this.result = false                                     
                }               
            } 
           if(this.result === false) {                                          
               item.push({
                            player: this.goalgroupplayer.uid,
                            goal: this.goal
                        })                       
           }      
           this.result = false   
           } else {
                item.push({
                    player: this.goalgroupplayer.uid,
                    goal: this.goal
                })                       
           }
           localStorage.setItem('goalTracker', JSON.stringify(item));
        }
    }
}
</script>
