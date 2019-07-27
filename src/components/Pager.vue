<template>
<main class="pager">
    <section class="pager-section">
        <div :class="{ active : activeSlide == 0 }"></div>
        <div :class="{ active : activeSlide == 1 }"></div>
        <div :class="{ active : activeSlide == 2 }"></div>
    </section>
</main>
</template>

<script>
export default {
    name: 'pager',
    props: ['activeSlide']
}
</script>
<style lang="css" scoped>
.pager {
    display: flex;
    justify-content: center;
    align-items: center;
}

.active {
   background-color: #F19344;
}
.pager-section {
    display: flex;
    justify-content: space-between;
    width: 3rem;
    margin: 1rem 0;
}
div {
    width: .6rem;
    height: .6rem;
    background-color: black;
    border-radius: 999rem;
}
    
</style>