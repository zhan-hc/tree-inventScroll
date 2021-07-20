import Vue from 'vue'
import Router from 'vue-router'
import index from '@/Pages/Index/index'
import normalTree from '@/Pages/Index/normalTree'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/normalTree',
      name: 'normalTree',
      component: normalTree
    }
  ]
})
