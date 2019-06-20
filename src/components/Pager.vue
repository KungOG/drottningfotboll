<template>
    <ul>
        <li></li>
        <li :class=”{ active : activePage == 1 }”></li>
        <li></li>
    </ul>
</template>

<script>
export default {
    name: 'pager',
    props: [pager]
}
</script>