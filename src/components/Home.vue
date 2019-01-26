<template>
    <div>
      <div class="container with-bottom-nav" style="min-height: 667px;">
        <div class="content">
          <!--<div class="js-image-swiper custom-image-swiper  custom-image-swiper-single" data-images="1">-->
          <div class="bannerSwipe">
            <swipe :lists="bannerList"></swipe>
          </div>
          <!--</div>-->
          <div class="section-title">优店推荐</div>
          <div class="section-content shops">
            <div class="shop-wrap">
              <div class="shop-item">
                <a href="javascript:;">
                  <img class="fadeIn" src="https://img.yzcdn.cn/upload_files/2016/09/23/FgQUVNXnvpFKFl1DIN2LXhPA1cxy.png?imageView2/2/w/300/h/0/q/75/format/png">
                </a>
              </div>
              <div class="shop-item">
                <a href="javascript:;">
                  <img class="fadeIn" src="https://img.yzcdn.cn/upload_files/2016/08/03/FqNGnCQS1eq9nIhRg48E_UfFf9K2.png?imageView2/2/w/300/h/0/q/75/format/png">
                </a>
              </div>
              <div class="shop-item">
                <a href="javascript:;">
                  <img class="fadeIn" src="https://img.yzcdn.cn/upload_files/2016/08/05/Fv5hhMZrtPZQWE7fape0ddEYtSuy.png?imageView2/2/w/300/h/0/q/75/format/png">
                </a>
              </div>
            </div>
          </div>
          <div class="section-content daily">
            <ul>
            </ul>
          </div>
          <HotGoods :goodsList = "goodsList" @getGoods="getGoods"></HotGoods>
          <div class="js-show-find category-guid" style="display: none;"></div>
        </div>
      </div>
      <div class="bottom-nav">
        <TabBar></TabBar>
        <!--<ul>-->
          <!--<li class="active"><a href="https://maijia.youzan.com/mars/homepage"><i class="icon-home"></i><div>有赞</div></a></li>-->
          <!--<li><a href="https://maijia.youzan.com/mars/category"><i class="icon-category"></i><div>分类</div></a></li>-->
          <!--<li><a href="https://h5.youzan.com/v2/trade/cart?f_platform=yzapp&amp;source=yzapp"><i class="icon-cart"></i><div>购物车</div></a></li>-->
          <!--<li><a href="https://h5.youzan.com/v2/buyer/member"><i class="icon-user"></i><div>我</div></a></li>-->
        <!--</ul>-->
      </div>
    </div>
</template>

<script>


  import swipe from './Swipe.vue'
  import TabBar from './TabBar.vue'
  import HotGoods from './HotGoods.vue'
  import url from '../modules/js/api.js'



    export default {
        name: "Home",
      data(){
        return {
          loading: false,
          bannerList: [],
          goodsList: [],
          pageNum: 1,
          pageSize: 6,
          allLoaded: false
        }
      },
      methods: {
        getBannerList(){
          this.$http.get( url.bannerLists).then( res => {
            this.bannerList = res.data.lists
          })
        },
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
        },
      },
      created(){
        this.getBannerList()
        this.getGoods()
      },
      components: {
        swipe, TabBar, HotGoods
      }
    }
</script>

<!--<style scoped src='../modules/css/common.css'></style>-->
<!--<style scoped src='../modules/css/index.css'></style>-->
<style scoped lang="css">
  @import '../modules/css/common.css';
  @import '../modules/css/index.css';
</style>
