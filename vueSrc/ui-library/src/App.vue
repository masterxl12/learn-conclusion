<template>
    <div id="app">
        <Button></Button>
        <ui-icon :icon="'back'"></ui-icon>
        <!--   suspense 实验阶段     -->
        <Suspense>
            <template #default>
                <carousel></carousel>
            </template>
            <template #fallback>
                轮播图正在加载中...
            </template>
        </Suspense>
        <br>
        <br>
        <br>
        <Message></Message>

        <br>
        <br>
        <tree></tree>
    </div>
</template>

<script>
    import Button from "./examples/button";
    import UiIcon from "./packages/icon/icon";

    import carousel from './examples/carousel'
    import Message from './examples/message';

    import Tree from "./examples/tree";


    export default {
        name: "App",
        components: {
            UiIcon,
            Button,
            carousel,
            Message,
            Tree
        },
    };
</script>

<style lang="scss">
</style>
