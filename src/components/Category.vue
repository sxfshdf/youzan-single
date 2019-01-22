<template>
  <div>
    <div class="container with-bottom-nav" style="min-height: 667px; height: 667px;">
      <div class="custom-search js-search-bar">
        <form>
          <input type="search" class="custom-search-input" autocomplete="off" name="keyword" value="" placeholder="搜索更赞的商品">
          <span class="icon-custom-search"></span>
        </form>
        <button class="custom-search-type-selection-btn">商品</button>
        <span class="cancel">取消</span>
        <div class="search-type-dropdown-menu" style="display: none;">
        <span class="search-type-dropdown-menu-indicator">
            <i></i>
        </span>
          <div class="drop-menu-content">
            <div class="search-type-goods">
              <i class="icon-goods"></i>
              <span>商品</span>
            </div>
            <div class="search-type-dropdown-menu-divider"></div>
            <div class="search-type-shop">
              <i class="icon-shop"></i>
              <span>店铺</span>
            </div>
          </div>
        </div>
      </div>
      <div class="search-content" style="display: none;"></div>
      <div class="content" style="height: 617px;">
        <div class="class-nav">
          <div id="scroll-nav" style="height: 100%;">
            <ul class="nav" id="scroll-nav-content" style="height: 540px; transform: translate3d(0px, 0px, 0px);">
              <li class="category-name js-category-name"
                  v-for="(list,index) in topList" :key="index" :data-cid="list.id"
                  :class="{active:index === currentIndex}"
                  @click = "getSublist(index,list.id)"
              >{{list.name}}</li>
            </ul>
          </div>
        </div>
        <div class="class-category">
          <div id="scroll-main-wrap" class="main-content">
            <div id="scroll-main-content"
                 class="js-main-content inner-content"
                 style="height: 943px; transform: translate3d(0px, 0px, 0px);"
                 v-if="currentIndex === 0 && ranklist">
              <div class="hot-wrap">
                <div class="hot-goods">
                  <div class="hot-title">
                    <p class="pull-left">热销商品榜</p>
                  </div>
                  <ul>
                    <li class="goods-item" v-for="(list,index) in ranklist.hotGoods" :key="index">
                      <a href="#">
                        <div class="thumb badge center-img">
                          <img :src="list.img">
                          <span class="num">{{index+1}}</span>
                        </div>
                        <div class="detail">
                          <div class="title">{{list.name}}</div>
                          <div class="price">￥{{list.price | formatPrice}}</div>
                          <div class="recommend">
                            <span>推荐值:</span>
                            <span>{{list.recommend}}</span>
                          </div>
                        </div>
                      </a>
                    </li>
                  </ul>
                </div>
                <div class="hot-shops" style="position: relative;">
                  <div class="hot-title">
                    <p class="pull-left">TOP店铺榜</p>
                  </div>
                  <ul>
                    <li class="shop-item" v-for="(list,index) in ranklist.hotShops" :key="index">
                      <div class="shop-title">
                        <span class="badge">{{index+1}}</span>
                        <a href="https://h5.youzan.com/v2/showcase/homepage?kdt_id=10695955&amp;source=yzapp">{{list.name}}</a>
                        <span class="follows"> / 关注度: {{list.follows}}</span>
                      </div>
                      <ul class="shop-images">
                        <li v-for="(list,index) in list.imgs" :key="index">
                          <a href="#">
                            <img :src="list">
                          </a>
                        </li>
                      </ul>
                    </li>
             
                  </ul>
                </div>
                <div class="hot-keywords">
                  <div class="hot-title">
                    <p class="pull-left">热搜词排行</p>
                  </div>
                  <ul class="keywords-list">
                    <li v-for="(item,index) in ranklist.hotKeywords" :key="index">
                      <a href="javascript:;" class="js-hot-keyword">{{item}}</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div id="scroll-main-content"  v-else
                 class="js-main-content inner-content"
                 style="height: 534px; transform: translate3d(0px, 0px, 0px);">
              <h3 class="category-title">热门品牌 </h3>
              <ul class="category-content" v-if="sublist">
                <li class="category-item js-category-item"
                    v-for="(brand,index) in sublist.brandList" :key="index"
                    :data-item-id="brand.id"
                    :data-item-name="brand.name">
                  <img :src="brand.img" alt="良品铺子" class="category-img">
                  <span class="category-item-name">
                {{brand.name}}            </span>
                </li>
              </ul>
              <h3 class="category-title"> 热门分类  </h3>
              <ul class="category-content" v-if="sublist">
                <li class="category-item js-category-item"
                    v-for="(category,index) in sublist.categoryList" :key="index"
                    :data-item-id="category.id"
                    :data-item-name="category.name">
                  <img :src="category.img" alt="生鲜" class="category-img">
                  <span class="category-item-name">
                {{category.name}}           </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <TabBar></TabBar>
  </div>

</template>

<script>
  
  import TabBar from './TabBar.vue'
  import qs from 'qs'
  import url from '../modules/js/api.js'

    export default {
        name: "Category",

      data(){
        return {
          topList: null,
          currentIndex: 0,
          sublist: null,
          ranklist: null
        }
      },
      methods: {
        getTopList(){
          this.$http.get(url.topLists).then( res => {
            this.topList = res.data.lists
          })
        },
        getSublist(index,id) {
          this.currentIndex = index
          if(index === 0) {
            this.getRanklist()
          }else {
            this.$http.get(url.subLists,qs.stringify({id})).then(res => {
              this.sublist = res.data.data
            })
          }
        },
        getRanklist(){
          this.$http.get(url.rank).then(res => {
            console.log(res)
            this.ranklist = res.data.data
          })
        }
      },
      created(){
        this.getTopList()
        this.getSublist(0)
      },
      components: {
        TabBar
      }
    }
</script>

<style scoped src="../modules/css/common.css"></style>
<style scoped src="../modules/css/category.css"></style>
<style scoped lang="css">
  /*@import "../modules/css/common.css";*/
  /*@import "../modules/css/category.css";*/
</style>
