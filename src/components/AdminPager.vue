<template>
<main class="pager">
    <section class="pager-section">
        <div :class="{ active : activeSlide == 0 }"></div>
        <div :class="{ active : activeSlide == 1 }"></div>
        <div :class="{ active : activeSlide == 2 }"></div>
        <div :class="{ active : activeSlide == 3 }"></div>
        <div :class="{ active : activeSlide == 4 }"></div>
    </section>
</main>
</template>

<script>
export default {
    name: 'adminPager',
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
    flex-direction: row;
    justify-content: space-between;
    width: 6rem;
    height: 1rem;
}
div {
    width: .6rem;
    height: .6rem;
    background-color: #D8D8D8;
    border-radius: 999rem;
}
    
</style>