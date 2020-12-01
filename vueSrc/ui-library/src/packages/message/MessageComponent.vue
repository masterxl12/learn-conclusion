<template>
    <div :class="classes">
        {{message}}
    </div>
</template>

<script>
    import {computed} from "vue";

    export default {
        name: "MessageComponent",
        props: {
            type: {
                type: String,
                default: 'success'
            },
            message: {
                type: String,
                default: ''
            }
        },
        setup(props) {
            let classes = computed(() => [
                `ui-message-${props.type}`
            ]);

            return {
                classes
            }
        }
    }
</script>

<style scoped>

</style>