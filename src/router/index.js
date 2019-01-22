import Vue from 'vue'
import Router from 'vue-router'

import Home from '../components/Home.vue'
import Category from '../components/Category.vue'
import GoodDetail from '../components/GoodDetail.vue'
import ChooseSku from '../components/ChooseSku.vue'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },{
      path: '/category',
      name: 'category',
      component: Category
    },{
      path: '/detail',
      name: 'detail',
      component: GoodDetail
    }
  ]
})
