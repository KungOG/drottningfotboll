<template>
    <main class="group-component">
        <section>
            <aside :style="{background: activeColor}">
                <h3>{{group.name}}</h3>
            </aside>
            <section class="group-item">
                <article class="list-item-group" v-for="player in group.players" :key="player.uid">
                    <p> {{player.name}}</p>
                </article>
            </section>
        </section>
    </main>
</template>

<script>

export default {
    name : 'group',
    props: ['group'],
    data() {
        return {
            activeColor: "red"
        }
    },
    beforeMount() {
        let number = this.group.id;
        if (number === 1) {
                this.activeColor = "green"
            } else if (number === 2) {
                 this.activeColor = "red"
            } else if (number === 3) {
                this.activeColor = "yellow"  
            } else if (number === 4) {
                this.activeColor = "blue"
            } else if (number === 5) {
                this.activeColor = "pink"    
            } 
    }
}
</script>
