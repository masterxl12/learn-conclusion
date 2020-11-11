<template>
    <div class="parent">
        <child v-bind="obj"/>
    </div>
</template>

<script>
    import child from "./childs"

    export default {
        name: "parent",
        data() {
            return {
                obj: {
                    name: 'lily',
                    age: '16'
                }
            }
        },
        components: {
            child
        }
    }
</script>

<style scoped>

</style>