<template>
  <div id="app">
    <div class="view">123</div>
    <div
      class="item"
      :key="index"
      v-for="(item, index) in list"
      ref="refList"
    ></div>
    <parent />
  </div>
</template>

<script>
import parent from "../src/components/common/parent";
export default {
  name: "app",
  data() {
    return {
      list: [1, 2, 3],
    };
  },
  components: {
    parent,
  },
  mounted() {
    console.log(this.$refs.refList);
  },
};
</script>

<style>
</style>