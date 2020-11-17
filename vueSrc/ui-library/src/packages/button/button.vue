<template>
  <div>
    <button></button>
  </div>
</template>

<script>
export default {
  name: "UiButton",
  props: {
    type: {
      type: String,
      default: "primary",
      validator(type) {
        if (
          ["warning", "danger", "info", "success", "primary"].includes(type)
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
};
</script>

<style>
</style>
