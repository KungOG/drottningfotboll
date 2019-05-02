<template>
    <main>
        <h1>Admin grupper</h1>
        <section class="aboutContent" v-for="one in groupOne" :key="one.uid">
           <p>1: {{one.name}}</p>
        </section>
        <section class="aboutContent" v-for="two in groupTwo" :key="two.uid" >
           <p>2: {{two.name}}</p>
        </section>
        <section class="aboutContent" v-for="three in groupThree" :key="three.uid">
           <p>3: {{three.name}}</p>
        </section>
        <section class="aboutContent" v-for="four in groupFour" :key="four.uid">
           <p>4: {{four.name}}</p>
        </section>
        <section class="aboutContent" v-for="five in groupFive" :key="five.uid">
           <p>5: {{five.name}}</p>
        </section>
    </main>
</template>

<script>
export default {
    name : 'groups',
    computed: {
        groupOne () {
            return this.$store.getters.groupOne;
        },
        groupTwo () {
            return this.$store.getters.groupTwo;
        },
        groupThree () {
            return this.$store.getters.groupThree;
        },
        groupFour () {
            return this.$store.getters.groupFour;
        },
        groupFive () {
            return this.$store.getters.groupFive;
        },
    }
}
</script>
