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
            <div id="scroll-main-content" class="js-main-content inner-content" style="height: 534px; transform: translate3d(0px, 0px, 0px); display: none;">
              <h3 class="category-title">热门品牌 </h3>
              <ul class="category-content">
                <li class="category-item js-category-item" data-item-id="85" data-item-name="良品铺子">
                  <img src="https://img.yzcdn.cn/o_1a2m590lg110p1mp21nr11ffmpsl9.jpg?imageView2/2/w/120/h/0/q/75/format/jpg" alt="良品铺子" class="category-img">
                  <span class="category-item-name">
                良品铺子            </span>
                </li>
                <li class="category-item js-category-item" data-item-id="83" data-item-name="周黑鸭">
                  <img src="https://img.yzcdn.cn/o_1a2m59s44mo61kid1ikd5mv1cc9.jpg?imageView2/2/w/120/h/0/q/75/format/jpg" alt="周黑鸭" class="category-img">
                  <span class="category-item-name">
                周黑鸭            </span>
                </li>
                <li class="category-item js-category-item" data-item-id="82" data-item-name="来伊份">
                  <img src="https://img.yzcdn.cn/o_1a2m5abjoa441fjg1hdi6aeqf79.jpg?imageView2/2/w/120/h/0/q/75/format/jpg" alt="来伊份" class="category-img">
                  <span class="category-item-name">
                来伊份            </span>
                </li>
                <li class="category-item js-category-item" data-item-id="81" data-item-name="五谷磨房">
                  <img src="https://img.yzcdn.cn/o_1a2m5arho1icm2ncs6tdj473j9.jpg?imageView2/2/w/120/h/0/q/75/format/jpg" alt="五谷磨房" class="category-img">
                  <span class="category-item-name">
                五谷磨房            </span>
                </li>
                <li class="category-item js-category-item" data-item-id="80" data-item-name="龙润">
                  <img src="https://img.yzcdn.cn/o_1a2m5c6f91qe3f0v13t1516cuo9.jpg?imageView2/2/w/120/h/0/q/75/format/jpg" alt="龙润" class="category-img">
                  <span class="category-item-name">
                龙润            </span>
                </li>
                <li class="category-item js-category-item" data-item-id="79" data-item-name="齐峰果业">
                  <img src="https://img.yzcdn.cn/upload_files/2015/12/31/FgZ1wJ7Ag95pPFZUte2he6bzrtSk.jpg?imageView2/2/w/120/h/0/q/75/format/jpg" alt="齐峰果业" class="category-img">
                  <span class="category-item-name">
                齐峰果业            </span>
                </li>
              </ul>
              <h3 class="category-title"> 热门分类  </h3>
              <ul class="category-content">
                <li class="category-item js-category-item" data-item-id="10" data-item-name="水果">
                  <img src="https://img.yzcdn.cn/upload_files/2015/12/28/Fk8hpTtgWFr_q7FCCGdzqXsOkYms.jpg?imageView2/2/w/120/h/0/q/75/format/jpg" alt="水果" class="category-img">
                  <span class="category-item-name">
                水果            </span>
                </li>
                <li class="category-item js-category-item" data-item-id="835" data-item-name="生鲜">
                  <img src="https://img.yzcdn.cn/upload_files/2015/12/28/FhUo5oH7FREcNyOQVNaSgeF3IHUw.jpg?imageView2/2/w/120/h/0/q/75/format/jpg" alt="生鲜" class="category-img">
                  <span class="category-item-name">
                生鲜            </span>
                </li>
                <li class="category-item js-category-item" data-item-id="839" data-item-name="饼干蛋糕">
                  <img src="https://img.yzcdn.cn/upload_files/2015/12/28/FqLVzz7mqblDP1pYEYruiDXZu7Dj.jpg?imageView2/2/w/120/h/0/q/75/format/jpg" alt="饼干蛋糕" class="category-img">
                  <span class="category-item-name">
                饼干蛋糕            </span>
                </li>
                <li class="category-item js-category-item" data-item-id="842" data-item-name="坚果炒货">
                  <img src="https://img.yzcdn.cn/upload_files/2015/12/28/FvVAsr7PzPg_GB1lmGwtkjQDyMAM.jpg?imageView2/2/w/120/h/0/q/75/format/jpg" alt="坚果炒货" class="category-img">
                  <span class="category-item-name">
                坚果炒货            </span>
                </li>
                <li class="category-item js-category-item" data-item-id="9" data-item-name="休闲零食">
                  <img src="https://img.yzcdn.cn/upload_files/2015/12/28/FoezLgMYiSvKhumdMDrfQ0xmgg_d.jpg?imageView2/2/w/120/h/0/q/75/format/jpg" alt="休闲零食" class="category-img">
                  <span class="category-item-name">
                休闲零食            </span>
                </li>
                <li class="category-item js-category-item" data-item-id="14" data-item-name="茶饮">
                  <img src="https://img.yzcdn.cn/upload_files/2015/12/28/FhoZy7_wrnk78MoFX_iz7sXHWR_F.jpg?imageView2/2/w/120/h/0/q/75/format/jpg" alt="茶饮" class="category-img">
                  <span class="category-item-name">
                茶饮            </span>
                </li>
                <li class="category-item js-category-item" data-item-id="845" data-item-name="酒水">
                  <img src="https://img.yzcdn.cn/upload_files/2015/12/28/FkSkqBCLt_Y3NdRqYtzGAKSQNzEY.jpg?imageView2/2/w/120/h/0/q/75/format/jpg" alt="酒水" class="category-img">
                  <span class="category-item-name">
                酒水            </span>
                </li>
                <li class="category-item js-category-item" data-item-id="13" data-item-name="粮油干货">
                  <img src="https://img.yzcdn.cn/upload_files/2015/12/28/FhrpDJ99PvIO5jbahU_V-a1Jcqnz.jpg?imageView2/2/w/120/h/0/q/75/format/jpg" alt="粮油干货" class="category-img">
                  <span class="category-item-name">
                粮油干货            </span>
                </li>
                <li class="category-item js-category-item" data-item-id="16" data-item-name="营养保健品">
                  <img src="https://img.yzcdn.cn/upload_files/2015/12/28/Ft9GDVJJ39BaoliQ2fUn546haQ8C.jpg?imageView2/2/w/120/h/0/q/75/format/jpg" alt="营养保健品" class="category-img">
                  <span class="category-item-name">
                营养保健品            </span>
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
