<template>
    <main class="group-component">
        <section>
            <aside :style="{background: activeColor}">
                <p>{{group.name}}</p>
            </aside>
            <section class="group-item">
                <article class="list-item-group" v-for="player in group.players" :key="player.uid">
                    <p>{{player.name}}</p>
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
            this.activeColor = "#fa3737"
        } else if (number === 2) {
            this.activeColor = "#ebdf04"
        } else if (number === 3) {
            this.activeColor = "#3737fa"  
        } else if (number === 4) {
            this.activeColor = "#FF780A"
        } else if (number === 5) {
            this.activeColor = "#54b725"    
        } 
    }
}
</script>
