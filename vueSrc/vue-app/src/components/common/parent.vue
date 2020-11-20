<template>
<<<<<<< HEAD
  <div class="parent">
    <child :obj="obj" :msg="msg" v-bind="$attrs" />
  </div>
</template>

<script>
import child from "./childs";
=======
<div class="parent">
  <child type='123' v-bind="obj" />
</div>
</template>

<script>
import child from "./childs"
>>>>>>> 1d65d7d40293552fa3ffb32ba6efd48dfea99843

export default {
  name: "parent",
  data() {
    return {
      obj: {
<<<<<<< HEAD
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
=======
        name: 'lily',
        age: '16'
      }
    }
  },
  components: {
    child
  }
}
</script>

<style scoped>

</style>
>>>>>>> 1d65d7d40293552fa3ffb32ba6efd48dfea99843
