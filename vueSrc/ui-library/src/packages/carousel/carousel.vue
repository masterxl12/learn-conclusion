<template>
    <div
            @mouseenter="onmouseenter"
            @mouseleave="onmouseleave"
            class="ui-carousel"
            :style="styles">
        <div class="view-port">
            <slot></slot>
        </div>
        <div class="dots">
            <span
                    v-for="item in len"
                    :key="item"
                    @click="go(item-1)"
                    :class="{active:item-1 === currentSelected}">
                {{item}}
            </span>
        </div>
        <ui-button @click="go(currentSelected+1,true)">向左</ui-button>
        <ui-button @click="go(currentSelected-1,true)">向右</ui-button>
    </div>
</template>

<script>

    import {reactive, provide, onMounted, computed, toRefs, nextTick} from 'vue'
    import UiButton from "../button/button";

    export default {
        name: "UiCarousel",
        components: {UiButton},
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
                len: 0,             // 默认没有孩子
                currentSelected: props.initialIndex, // 当前显示索引 核心要控制的值
                reverse: false // 是否正向动画
            });

            const changeIndex = () => {
                state.currentIndex++;
            };

            provide('current', {state, changeIndex}); // provide 在子组件中使用

            onMounted(() => {
                state.len = state.currentIndex;
                methods.run();
            });

            let timer;
            const methods = {
                onmouseenter() {
                    clearInterval(timer);
                    timer = null;
                },
                onmouseleave() {
                    methods.run();
                },
                go(newIndex, flag) {
                    let index = state.currentSelected;

                    // 临界条件判断 最后一张的下一张是第一张  第一张的前一张是最后一张
                    if (newIndex === state.len) newIndex = 0;
                    if (newIndex === -1) newIndex = state.len - 1;

                    // 根据上一次的值和当前值比较 判断是否反着走
                    state.reverse = index > newIndex; // 表示是反着走
                    if ((timer || flag) && props.loop) { // 如果是自动轮播 处理最后的边界条件
                        //  3 -> 0  正
                        if (index === 0 && newIndex === state.len - 1) { // 0 -> 3 反着走
                            state.reverse = true;
                        }

                        if (index === state.len - 1 && newIndex === 0) {
                            state.reverse = false;
                        }
                    }
                    // 保证样式的dom已经添加上去 再去更新dom
                    nextTick(() => {
                        state.currentSelected = newIndex;
                    })
                },
                run() {
                    if (props.autoplay) {
                        timer = setInterval(() => {
                            let index = state.currentSelected;
                            // let newIndex = index + 1;  // 正向动画
                            let newIndex = index - 1;  // 反向动画
                            methods.go(newIndex);
                        }, props.delay)
                    }
                }
            };

            let styles = computed(() => {
                return {
                    height: props.height
                }
            });

            return {
                styles,
                ...toRefs(state),
                ...methods
            }
        }
    }
</script>

<style lang="scss">

</style>