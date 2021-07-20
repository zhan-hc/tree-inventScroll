<template>
  <div class="tree-wrap">
    <tree-node v-for="(item,idx) in data" :key="idx" :treeItem="item" />
  </div>
</template>

<script>
import TreeNode from './treeNode.vue'
export default {
  name: 'Tree',
  props: ['data'],
  data () {
    return {
    }
  },
  components: {
    TreeNode
  }
}
</script>

<style scoped  lang="scss">
.tree-wrap{
  // padding: 0;
}
</style>
