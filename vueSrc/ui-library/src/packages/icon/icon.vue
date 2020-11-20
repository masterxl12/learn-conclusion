<template>
    <svg class="ui-icon" aria-hidden="true">
        <use :xlink:href="`#icon-${icon}`"></use>
    </svg>
</template>

<script>
    import "./iconfont"

    export default {
        name: "UiIcon",
        props: {
            icon: String
        }
    };
</script>

<style>
</style>