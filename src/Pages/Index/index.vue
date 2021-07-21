<template>
  <invent-tree :data="tdata"/>
</template>

<script>
import { tdata } from './data.js'
import inventTree from '@/components/tree/inventTree.vue'
export default {
  components: {
    inventTree
  },
  data () {
    return {
      tdata
    }
  }
}
</script>

<style scoped  lang="scss">
</style>
