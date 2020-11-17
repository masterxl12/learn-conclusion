<template>
<div class="child">
  <p>child:---------name:{{ name }}-----age:{{ age }}</p>
  <p>传来的值: {{type}}</p>
</div>
</template>

<script>
export default {
  name: "childs",
  props: {
    name: "",
    age: "",
    type: {
      type: String,
      default: 'primary'
    }
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
