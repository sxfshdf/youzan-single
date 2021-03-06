import Vue from 'vue'
import Router from 'vue-router'

import Home from '../components/Home.vue'
import Category from '../components/Category.vue'
import GoodDetail from '../components/GoodDetail.vue'
import Search from '../components/Search.vue'
import Cart from '../components/Cart.vue'
import User from '../components/User.vue'
import All from '../components/All.vue'
import AddressDetail from '../components/AddressDetail.vue'


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
    },{
      path: '/search',
      name: 'search',
      component: Search
    },{
      path: '/cart',
      name: 'cart',
      component: Cart
    },{
      path: '/user',
      name: 'user',
      component: User,
    },{
      path: '/all',
      name: 'all',
      component: All
    },{
      path: '/address',
      name: 'address',
      component: AddressDetail
    }
  ]
})
