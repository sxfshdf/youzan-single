// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Axios from 'axios'

Vue.prototype.$http = Axios
Vue.config.productionTip = false

import  './modules/css/my-mint.css'




/* eslint-disable no-new */

Vue.filter('formatPrice',(price) => {
  if(!price) return '0.00'
  //取整数
  let intPart = parseInt(price,10)
  // 整数部分逢三一断
  let intPartFormat = intPart.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')

  let array = price.toString().split('.')
  if(array.length === 2){
    // 原来的数据有小数点 获取小数后面的数据
    let value = array[1]
    if(value.length===1){
      return intPartFormat + '.' + value + '0'
    }else{
      return intPartFormat + '.' + value
    }
  }else{
    return intPartFormat + '.00'
  }
})
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
})
