<template>
    <div class="ui-carousel" :style="styles">
        <div class="view-port">
            <slot></slot>
        </div>
    </div>
</template>

<script>

    import {reactive, provide, onMounted, computed, toRefs} from 'vue'

    export default {
        name: "UiCarousel",
        props: {
            height: {
                type: String,
                default: '200px'
            },
            autoplay: {
                type: Boolean,
                default: true
            },
            delay: {
                type: Number,
                default: 3000
            },
            initialIndex: {
                type: Number,
                default: 1
            },
            loop: {
                type: Boolean,
                default: true
            }

        },
        setup(props) {
            const state = reactive({
                currentIndex: 0, // 当前用于标记节点的索引
                len: 0,    // 默认没有孩子
                currentSelected: props.initialIndex // 当前显示索引
            });

            const changeIndex = () => {
                state.currentIndex++;
            };

            provide('current', {state, changeIndex}); // provide 在子组件中使用

            onMounted(() => {
                state.len = state.currentIndex;
            });

            let styles = computed(() => {
                return {
                    height: props.height
                }
            });

            return {
                styles,
                ...toRefs(state)
            }
        }
    }
</script>

<style lang="scss">

</style>