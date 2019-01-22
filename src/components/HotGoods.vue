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
        <li v-for="good in goodsList" :key="good.id" @click="goToDetail(good.id)">
          <div class="goods-item">
            <!--<a href="#">-->
              <div class="thumb img-box">
                <img class="fadeIn" :src="good.img">
              </div>
              <div class="detail">
                <div class="title">{{good.name}}</div>
                <div class="price">￥{{good.price | formatPrice}}</div>
              </div>
            <!--</a>-->
          </div>
        </li>
      </ul>
      <div class="loading-more"><span></span></div>
    </div>
  </div>
</template>

<script>

  import Vue from 'vue'
  import { InfiniteScroll } from 'mint-ui'
  Vue.use(InfiniteScroll)

    export default {
      name: "HotGoogs",
      props:{
        goodsList: {
          type: Array,
          required: true
        }
      },
      methods: {
        goToDetail(id) {
          this.$router.push({
            name: 'detail',
            query: {id}
          })
        },
        getGoods(){
          this.$emit('getGoods')
        }
      },
      created() {

      }
    }
</script>

<style scoped>
  @import '../modules/css/index.css';
  @import '../modules/css/common.css';
</style>
