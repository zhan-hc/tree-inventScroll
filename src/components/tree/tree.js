import tree from './tree.vue'
import Vue from 'vue'
const TreeComponent = Vue.extend(tree)
export default class Tree {
  constructor (el, data) {
    this.el = el
    this.data = data
  }
  init () {
    console.log('初始化')
    const treec = new TreeComponent()
    treec.$mount()
    this.el.appendChild(treec.$el)
    treec.datas = this.data
  }
}
