    <template>
    <main class="group-component">
        <section>
            <aside :style="{background: activeColor}">
                <h3>{{group.name}}</h3>
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
            this.activeColor = "#f5e906"
        } else if (number === 3) {
            this.activeColor = "#3737fa"  
        } else if (number === 4) {
            this.activeColor = "#FF780A"
        } else if (number === 5) {
            this.activeColor = "#60b840"    
        } 
    }
}
</script>
