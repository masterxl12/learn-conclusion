<template>
  <button :class="classes"></button>
</template>

<script>
import { computed, ref } from "vue";

export default {
  name: "UiButton",
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
  },
  setup(props) {
    const classes = computed(() => ["ui-button", `ui-button-${props.type}`]);
    return {
      classes,
    };
  },
};
</script>

