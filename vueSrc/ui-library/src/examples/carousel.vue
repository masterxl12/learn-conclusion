<template>
    <ui-carousel
            style="width: 300px"
            :autoplay="true"
            :delay="1500"
            :initialIndex="1"
            :loop="true"
            height="300px">
        <ui-carousel-item v-for="slide in sliderList" :key="slide.id">
            <img :src="slide.url" style="max-width: 100%;height: 100%">
        </ui-carousel-item>
        <!--        <ui-carousel-item style="background: #00BB33">面板1</ui-carousel-item>-->
        <!--        <ui-carousel-item style="background: red">面板2</ui-carousel-item>-->
        <!--        <ui-carousel-item style="background: skyblue">面板3</ui-carousel-item>-->
    </ui-carousel>
</template>

<script>
    import {reactive, ref, toRefs} from "vue";
    import UiCarouselItem from "../packages/carousel/carousel-item";


    export default {
        name: "carousel",
        components: {UiCarouselItem},
        async setup(props) {
            const state = reactive({
                sliderList: []
            });

            let r = await fetch("http://jsonplaceholder.typicode.com/photos");

            let result = await r.json();

            state.sliderList = result.slice(0, 3);

            return {
                ...toRefs(state)
            }
        }
    }
</script>

<style lang="scss">

</style>