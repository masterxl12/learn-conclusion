<template>
    <transition name="carousel">
        <div class="ui-carousel-item" v-if="isVisible" :class="isReverse">
            <slot></slot>
        </div>
    </transition>

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

            const isReverse = computed(() => [state.reverse ? 'reverse' : '']);

            changeIndex();
            return {
                isVisible,
                isReverse
            }
        }
    }
</script>

<style lang="scss">

</style>