<template>
  <div class="container" ref="treeWrap" @scroll="handleScroll">
    <tree :data="[tdata]" />
  </div>
</template>

<script>
import Tree from '@/components/tree/tree.vue'
import { tdata } from './data.js'
export default {
  components: {
    Tree
  },
  data () {
    return {
      tdata
    }
  },
  methods: {
    handleScroll () {
      // console.log(this.$refs.treeWrap.scrollTop)
    }
  }
}
</script>

<style scoped  lang="scss">
.container{
  margin: 0 auto;
  border: 1px solid #ccc;
  width: 500px;
  height: 300px;
  overflow: hidden;
  overflow-y: auto;
  white-space: nowrap;
  text-overflow: ellipsis;
  box-sizing: border-box;
}
</style>
