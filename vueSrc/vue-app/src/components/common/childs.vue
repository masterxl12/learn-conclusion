<template>
<div class="child">child:---------name:{{ name }}-----age:{{ age }}</div>
</template>

<script>
export default {
  name: "childs",
  props: {
    name: "",
    age: "",
  },
  created() {
    const data = () => ({
      a: 1
    });
  }
};
</script>

<style scoped>
</style>
