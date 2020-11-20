<template>
<<<<<<< HEAD
  <div class="child">
    <p>child:---------name:{{ $attrs.obj.name }}-----age:{{ $attrs.obj.age }}</p>
    <grandson v-bind="$attrs" />
  </div>
=======
<div class="child">
  <p>child:---------name:{{ name }}-----age:{{ age }}</p>
  <p>传来的值: {{type}}</p>
</div>
>>>>>>> 1d65d7d40293552fa3ffb32ba6efd48dfea99843
</template>

<script>
import grandson from "./grandson";

export default {
  name: "childs",
<<<<<<< HEAD
  props: [],
  components: {
    grandson,
=======
  props: {
    name: "",
    age: "",
    type: {
      type: String,
      default: 'primary'
    }
>>>>>>> 1d65d7d40293552fa3ffb32ba6efd48dfea99843
  },

  created() {
    console.log("child:", this.$attrs);
  },
};
</script>

<style scoped>
</style>
