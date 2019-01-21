<template>
  <mt-swipe :auto="3000" >
    <mt-swipe-item v-for="(list,index) in bannerList" :key = "index">
      <a class="js-no-follow" :href="list.clickUrl">
        <img class="goods-main-photo fadeIn" :src="list.img">
      </a>
    </mt-swipe-item>
  </mt-swipe>
</template>

<script>

  import Vue from 'vue'
  import { Swipe, SwipeItem } from 'mint-ui'
  import url from '../modules/js/api.js'

  Vue.component(Swipe.name, Swipe)
  Vue.component(SwipeItem.name, SwipeItem)

    export default {
        name: "Swipe",
        data(){
          return {
            bannerList: []
          }
        },
        created(){
          this.getBannerList()
        },
        methods: {
          getBannerList(){
            this.$http.get( url.bannerLists).then( res => {
              this.bannerList = res.data.lists
            })
          }
        }
    }
</script>

<style scoped>


</style>
