<template>
    <div id="app">
        <Button></Button>
        <ui-icon :icon="'back'"></ui-icon>
        <carousel></carousel>
    </div>
</template>

<script>
    import Button from "./examples/button";
    import UiIcon from "./packages/icon/icon";

    import carousel from './examples/carousel'

    export default {
        name: "App",
        components: {
            UiIcon,
            Button,
            carousel
        },
    };
</script>

<style lang="scss">
</style>
