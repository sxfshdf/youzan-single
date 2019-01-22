<template>
  <div class="container with-top-search" style="min-height: 667px;">
    <div class="custom-search js-search-bar">
      <form>
        <input type="search" class="custom-search-input" autocomplete="off" name="keyword" value="水果" placeholder="搜索更赞的商品" style="padding-left: 66px;">
        <span class="icon-custom-search"></span>
      </form>
      <button class="custom-search-type-selection-btn custom-search-type-selection-btn-focus">商品</button>
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
    <div class="content">
      <div class="search-wrap js-waterfull-wrap">
        <ul class="js-list">
          <li class="goods-item" v-for="(list,index) in lists" :key="index" @click="toDetail(list.id)">
            <!--<a href="https://h5.youzan.com/v2/showcase/goods?alias=2755moo9i2r1c&amp;source=yzapp&amp;f_platform=yzapp">-->
              <div class="thumb">
                <img v-lazy="list.img">
                <i class="sell-out" v-show="list.isOut"></i>
              </div>
              <div class="detail">
                <div class="title">{{list.name}}</div>
                <div class="meta relative">
                  <span class="price">￥{{list.price | formatPrice}}</span>
                  <span class="ship pull-right" v-show="list.isPostage">包邮</span>
                </div>
              </div>
            <!--</a>-->
          </li>
        </ul>
        <div class="list-finished">已经没有更多了</div>
      </div>
    </div>
    <div class="go-to-top" style="transform-origin: 0px 0px 0px; opacity: 1; transform: scale(1, 1);"
         :style="{display: showToTop?'block':'none'}"
          @click="toTop"></div>
  </div>
</template>

<script>

  import url from '../modules/js/api.js'
    export default {
      name: "Search",
      data(){
        return {
          id: '',
          keyword: '',
          lists: [],
          showToTop: false
        }
      },
      methods:{
        getList() {
          this.$http.get(url.searchList,{
            id: this.id,
            keyword: this.keyword
          }).then( res => {
            this.lists = res.data.lists
          })
        },
        move() {

          if(window.scrollY > 10) {
            this.showToTop = true
          }else {
            this.showToTop = false
          }
        },
        toTop() {
          window.scrollTo(0,0)
        },
        toDetail(id) {
          this.$router.push({
            name: 'detail',
            query: {id}
          })
        }
      },
      created() {
        this.id = this.$route.query.id
        this.keyword = this.$route.query.keyword
        this.getList()
        window.addEventListener('scroll',this.move)
      }
    }
</script>

<style scoped>
@import "../modules/css/common.css";
  @import "../modules/css/search.css";
</style>
