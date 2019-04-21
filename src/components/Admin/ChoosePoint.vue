    
<template>
    <article>
        <section class="content">
            <h3>Poäng vinst</h3>
                <a href="#" :class="[{hide1:select1 == 1}, {hide2:select2 == 1}]" @click="addNumberOfPointsWin(1, 2, 3)" :disabled = isDisabled>1</a>
                <a href="#" :class="[{hide1:select1 == 2}, {hide2:select2 == 2}]" @click="addNumberOfPointsWin(2, 1, 3)" :disabled = isDisabled>2</a>
                <a href="#" :class="[{hide1:select1 == 3}, {hide2:select2 == 3}]" @click="addNumberOfPointsWin (3, 1, 2)" :disabled = isDisabled>3</a>
            <h3>Poäng förlust</h3>
                <a href="#" :class="[{hide1:select3 == 1}, {hide2:select4 == 1}]" @click="addNumberOfPointsLoss(0, 2, 3)" :disabled = isDisabled>0</a>
                <a href="#" :class="[{hide1:select3 == 2}, {hide2:select4 == 2}]" @click="addNumberOfPointsLoss(1, 1, 3)" :disabled = isDisabled>1</a>
                <a href="#" :class="[{hide1:select3 == 3}, {hide2:select4 == 3}]" @click="addNumberOfPointsLoss(2, 1, 2)" :disabled = isDisabled>2</a>
                <br>
                <br>
            <p @click="$router.push('/makegroups')">Klar</p>
                <br>
        </section>
        <router-view />
    </article>
</template>

<script>
export default {
    name : 'choosepoint',
    data () {
        return {
            isDisabled: false,
            select1: undefined,
            select2: undefined,
            select3: undefined,
            select4: undefined


        }
    },
    methods: {
        addNumberOfPointsWin(num, value1, value2) {
            this.isDisabled = true;
            this.select1 = value1;
            this.select2 = value2;
            this.$store.dispatch('setNumberOfWin', num)
        },
        addNumberOfPointsLoss(num, value1, value2) {
            this.isDisabled = true;
            this.select3 = value1;
            this.select4 = value2;
            this.$store.dispatch('setNumberOfLoss', num)
        }
    }
}
</script>

<style lang="scss" scoped>
.hide1,
.hide2 {
    display: none !important;
}
</style>