<template>
    <main class="game-component">
        <article>
            <img v-show="show1" src="@/assets/icon/crown.svg">
            <div class="group" :style="{background: activeColor1}">
                <p>Grupp</p>
                <p>{{ game.home.groupNr }}</p>
            </div>  
        </article>
        <div class="line"><hr></div>
        <article>
            <img v-show="show2" src="@/assets/icon/crown.svg">
            <div class="group" :style="{background: activeColor2}">
                <p>Grupp</p>
                <p>{{ game.away.groupNr }}</p>
            </div>
        </article>
    </main>
</template>

<script>
export default {
    name : 'game',
    props: ['game'],
    data() {
        return {
            activeColor1: "red",
            activeColor2: "blue",
            show1: false,
            show2: false
        }
    },
    watch: {
        game() {
            this.setBackgroundColor();
            this.setWinner();
        }
    },
    beforeMount() {
        this.setBackgroundColor();
        this.setWinner();
    },
    methods: {
        setBackgroundColor() {
            let number1 = this.game.home.groupNr;
            let number2 = this.game.away.groupNr;

            switch(number1) {
                case 1:
                    this.activeColor1 = "green"
                    break;
                case 2:
                    this.activeColor1 = "red"
                    break;
                case 3:
                    this.activeColor1 = "orange"
                    break;
                case 4:
                    this.activeColor1 = "blue"
                    break;
                case 5:
                    this.activeColor1 = "pink"
                    break;
            }

            switch(number2) {
                case 1:
                    this.activeColor2 = "green"
                    break;
                case 2:
                    this.activeColor2 = "red"
                    break;
                case 3:
                    this.activeColor2 = "orange"
                    break;
                case 4:
                    this.activeColor2 = "blue"
                    break;
                case 5:
                    this.activeColor2 = "pink"
                    break;
            }
        },
        setWinner() {
                if(this.game.home.win === true) {
                    this.show1 = true
                } else {
                    this.show1 = false
                }
                if(this.game.away.win === true) {
                    this.show2 = true
                } else {
                    this.show2 = false
                }
        }
    }
}
</script>
