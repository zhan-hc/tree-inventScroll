<template>
  <div class="treenode-wrap">
    <ul>
      <li @click.self="handleClick">
        <i class="iconfont icon-right"
          v-if="treeItem.children && treeItem.children.length > 0"
          :class="treeItem.expand ? 'icon-bottom': 'icon-right'"
          @click.self="handleClick">
        </i>
        <i class="iconfont icon-tree" :style="`margin-left:${typeof(treeItem.expand) === 'undefined' ? 20 : 0}px`"></i>{{treeItem.title}}
        <div v-if="treeItem.expand">
          <tree-node v-for="item in treeItem.children" :key="item.key" :treeItem="item" />
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'TreeNode',
  props: ['treeItem'],
  data () {
    return {
    }
  },
  methods: {
    handleClick () {
      let status = !this.treeItem.expand
      this.$set(this.treeItem, 'expand', status)
    }
  }
}
</script>

<style scoped lang="scss">
.treenode-wrap{
  ul{
    padding-left: 20px;
    li{
      list-style: none;
      .icon-tree{
        color: #ff9600;
        margin-right: 10px;
      }
    }
  }

}

</style>
