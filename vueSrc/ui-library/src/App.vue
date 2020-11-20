<template>
    <div id="app">
        <Button></Button>
        <ui-icon :icon="'back'"></ui-icon>
    </div>
</template>

<script>
    import Button from "./examples/button";
    import UiIcon from "./packages/icon/icon";

    export default {
        name: "App",
        components: {
            UiIcon,
            Button,
        },
    };
</script>

<style lang="scss">
</style>
