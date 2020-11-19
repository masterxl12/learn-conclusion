<template>
    <button :class="classes" :disabled="loading">
        <ui-icon :icon="'Loading'" class="loading" v-if="!loading"></ui-icon>
        <ui-icon icon="edit" v-if="loading"></ui-icon>
        <!--   默认插槽     -->
        <span v-if="$slots.default">
            <slot></slot>
        </span>
    </button>
</template>

<script>
    import {computed, ref} from "vue";
    import UiIcon from "../icon/icon";

    export default {
        name: "UiButton",
        components: {UiIcon},
        props: {
            type: {
                type: String,
                default: "primary",
                validator(type) {
                    if (
                        !["warning", "danger", "info", "success", "primary"].includes(type)
                    ) {
                        throw new TypeError(
                            `传入类型错误，应包含` +
                            ["warning", "danger", "info", "success", "primary"].join("、")
                        );
                    }
                    return true;
                },
            },
            loading: {
                type: Boolean,
                default: false
            }
        },
        setup(props) {
            const classes = computed(() => ["ui-button", `ui-button-${props.type}`]);
            return {
                classes,
            };
        },
    };
</script>

