<template>
  <div>
    <div class="line-block line-block-gray">
      <div class="lineblock-title">
        <span class="lineblock-font">最热商品推荐</span>
      </div>
    </div>
    <div class="hot-goods js-waterfull-wrap" data-src="">
      <ul class="js-list js-lazy" data-src=""
          v-infinite-scroll="getGoods"
          infinite-scroll-disabled="loading"
          infinite-scroll-distance="20">
        <li v-for="good in goodsList" :key="good.id">
          <div class="goods-item">
            <a href="#">
              <div class="thumb img-box">
                <img class="fadeIn" :src="good.img">
              </div>
              <div class="detail">
                <div class="title">{{good.name}}</div>
                <div class="price">￥{{good.price | formatPrice}}</div>
              </div>
            </a>
          </div>
        </li>
      </ul>
      <div class="loading-more"><span></span></div>
    </div>
  </div>
</template>

<script>

  import Vue from 'vue'
  import url from '../modules/js/api.js'
  import { InfiniteScroll } from 'mint-ui'
  Vue.use(InfiniteScroll)

    export default {
        name: "HotGoogs",
      data(){
          return {
            loading: false,
            goodsList: [],
            pageNum: 1,
            pageSize: 6,
            allLoaded: false
          }
      },
      methods: {
          getGoods(){
            if(this.allLoaded) return
              this.$http.get( url.hotLists, {
                pageNum: this.pageNum,
                pageSize: this.pageSize
              }).then( res => {
                if( res.data.lists.length < this.pageSize ) {
                  this.allLoaded = true
                }
                if(this.goodsList.length) {
                  this.goodsList = this.goodsList.concat(res.data.lists)
                }else {
                  this.goodsList = res.data.lists
                }
                this.pageNum ++
                this.loading = false
              })
          }
      },
      created() {
          this.getGoods()
      }
    }
</script>

<style scoped>
  @import '../modules/css/index.css';
  @import '../modules/css/common.css'
</style>
