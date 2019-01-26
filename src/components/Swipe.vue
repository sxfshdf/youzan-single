<template>
  <mt-swipe :auto="3000" >
    <mt-swipe-item v-for="(list,index) in lists" :key = "index">
      <router-link class="js-no-follow" to="detail">
        <img class="goods-main-photo fadeIn" :src="list.img">
      </router-link>
    </mt-swipe-item>
  </mt-swipe>
</template>

<script>

  import Vue from 'vue'
  import { Swipe, SwipeItem } from 'mint-ui'


  Vue.component(Swipe.name, Swipe)
  Vue.component(SwipeItem.name, SwipeItem)

    export default {
      name: "Swipe",
      props: {
        lists: {
          type: Array,
          required: true
        }
      },
      data(){
        return {
          bannerList: []
        }
      },
    }
</script>

<style scoped>


</style>
