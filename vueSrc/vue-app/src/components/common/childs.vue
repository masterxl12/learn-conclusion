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
};
</script>

<style scoped>
</style>
