<template>
  <div class="child">
    <p>child:---------name:{{ $attrs.obj.name }}-----age:{{ $attrs.obj.age }}</p>
    <grandson v-bind="$attrs" />
  </div>
</template>

<script>
import grandson from "./grandson";

export default {
  name: "childs",
  props: [],
  components: {
    grandson,
  },

  created() {
    console.log("child:", this.$attrs);
  },
};
</script>

<style scoped>
</style>
