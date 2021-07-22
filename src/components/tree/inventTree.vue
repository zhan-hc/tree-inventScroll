<template>
  <div class="wrap" ref="wrap" @scroll="handleScroll">
    <div class="invent-space" :style="`height:${contentHeight}`"></div><!-- 虚拟滚动高度 -->
    <div class="container" ref="list">
      <div
        :key="i"
        class="tree-item"
        v-show="item.visible"
        @click="handleExpand(item)"
        v-for="(item, i) in renderList"
        :style="`transform:translateX(${item.level * 20}px)`"
      >
        <i class="iconfont icon-right"
          v-if="item.expand !== undefined"
          :class="item.expand ? 'icon-bottom': 'icon-right'"
          >
        </i>
        <span> <i class="iconfont icon-tree" :style="`margin-left:${typeof(item.expand) === 'undefined' ? 20 : 0}px`"></i> {{item.title}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      treeData: [],
      startIndex: 0,
      endIndex: 19,
      itemHeight: 25 // 节点的高度
    }
  },
  computed: {
    contentHeight () { // 已展示的树节点高度，过滤掉未展开显示的
      return (
        (this.treeData || []).filter(item => item.visible).length *
          this.itemHeight +
        'px'
      )
    },
    unHiddenList () { // 已展开未隐藏的树节点
      return (this.treeData || []).filter(item => item.visible)
    },
    renderList () { // 渲染的树形节点数据
      return this.unHiddenList.slice(this.startIndex, this.endIndex)
    }
  },
  methods: {
    handleScroll () {
      this.updateVisibleData(this.$refs.wrap.scrollTop)
    },
    handleExpand (node) { // 点击节点操作
      const status = !node.expand
      node.expand = status
      if (status && node.children.length > 0) {
        node.children.forEach((item) => { // 将点击节点的子节点显示
          item.visible = true
        })
      } else if (!status) {
        this.handleClose(node.children) // 隐藏点击节点的子孙节点
      }
    },
    handleClose (node) { // 隐藏节点
      node.forEach((item) => {
        item.visible = false
        if (item.children.length > 0) {
          item.expand = false
          this.handleClose(item.children)
        }
      })
    },
    // 迭代处理
    flatten_iteration (tree) {
      let flatData = []
      let stack = [...tree]
      let parentIndex = {} // 存储level的索引
      while (stack.length) {
        let node = stack.shift()
        if (!node.level) {
          node.level = 0
          node.visible = true
        }
        if (node.children) {
          parentIndex[node.level] = flatData.length // node的level索引等于flatData的长度，因为接下来push的就是node
          stack.unshift(...node.children.map(item => { // 设置子类的level
            return {...item, level: node.level + 1, visible: node.expand}
          }))
        }
        flatData.push({...node, children: []})
        if (node.level !== 0) { // 添加子类引用（只要不是第一层，node肯定有父节点）
          flatData[parentIndex[node.level - 1]].children.push(flatData[flatData.length - 1]) // 往当前的node的父节点的children属性添加本身
        }
      }
      return flatData
    },
    // 递归处理
    flatten_recursion (data, arr = [], parent = null, level = 0, visible = true, children = [], insert = null) {
      arr.push({...data, level, parent, visible, children})
      if (insert !== null) {
        arr[insert].children.push(arr[arr.length - 1])
      }
      if (data.children) {
        insert = arr.length - 1
        data.children.forEach((item) => {
          this.flatten_recursion(item, arr, arr[arr.length - 1], level + 1, data.expand, [], insert)
        })
      }
      return arr
    },
    updateVisibleData (scrollTop = 0) {
      requestAnimationFrame(() => {
        if (scrollTop < (this.unHiddenList.length - 20) * this.itemHeight) { // 小于可滚动距离（unHiddenList未隐藏的节点列表）
          this.$refs.list.style.transform = 'translate3d(0,' + scrollTop + 'px,0)' // 同步滚动
          this.startIndex = Math.floor(scrollTop / this.itemHeight) // 已滚动的节点数量
          this.endIndex = this.startIndex + 20 // 已滚动的数量加可视区域的数量
        }
      })
    }
  },
  mounted () {
    this.treeData = this.flatten_iteration(this.data)
    // this.treeData = this.flatten_recursion(...this.data)
  }
}
</script>

<style scoped  lang="scss">
.wrap{
  overflow: auto;
  margin: auto;
  width: 400px;
  height: 500px;
  border: 1px solid #ccc;
  box-sizing: border-box;
  .invent-space{
    float: left;
  }
  .container{
    margin: 0 auto;
    padding: 0;
    overflow-x: hidden;
    .tree-item{
      padding: 2px 0;
      width: 300px;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow:hidden;
      .icon-tree{
        color: #ff9600;
      }
      span{
        box-sizing: border-box;
      }
    }
  }
}

</style>
