<template>
  <div class="parent">
    <child :obj="obj" :msg="msg" v-bind="$attrs" />
  </div>
</template>

<script>
import child from "./childs";

export default {
  name: "parent",
  data() {
    return {
      obj: {
        name: "lily",
        age: "16",
      },
      arr: [0, 1, 2, 3],
      msg: {
        name: "kobe",
        gender: "female",
      },
    };
  },
  components: {
    child,
  },
};
</script>

<style scoped>
</style>