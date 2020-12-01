<template>
    <div>
        <button @click="show">点击按钮</button>
    </div>
</template>

<script>
    import Message from '../packages/message'

    export default {
        name: "message",
        setup() {
            const show = () => {
                Message.success({message: 'successfully!'})
            };

            return {
                show
            }
        }
    }
</script>

<style scoped>

</style>