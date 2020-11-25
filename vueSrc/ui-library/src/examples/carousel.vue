<template>
    <ui-carousel
            style="width: 400px"
            :autoplay="true"
            :delay="3000"
            :initialIndex="1"
            :loop="true"
            height="200px">
        <ui-carousel-item style="background: #00BB33">abc</ui-carousel-item>
        <ui-carousel-item style="background: red">nba</ui-carousel-item>
        <ui-carousel-item style="background: skyblue">cba</ui-carousel-item>
    </ui-carousel>
</template>

<script>
    export default {
        name: "carousel",
    }
</script>

<style lang="scss">

</style>