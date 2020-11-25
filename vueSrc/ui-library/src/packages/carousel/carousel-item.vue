<template>
    <div class="ui-carousel-item" v-if="isVisible">
        <slot></slot>
    </div>
</template>

<script>
    import {inject, computed} from "vue";


    export default {
        name: "UiCarouselItem",
        setup() {
            let {state, changeIndex} = inject("current");
            let currentIndex = state.currentIndex;
            let isVisible = computed(() => {
                return state.currentSelected === currentIndex;
            });

            changeIndex();
            return {
                isVisible
            }
        }
    }
</script>

<style lang="scss">

</style>