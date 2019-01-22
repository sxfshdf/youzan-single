<template>
<div>
  <div class="container wap-goods internal-purchase" style="min-height: 617px;">
    <div class="content no-sidebar">
      <div class="content-body">
        <div class="custom-image-swiper custom-goods-swiper js-swp swp" >
          <Swipe :lists = "bannerList" v-if="bannerList"></Swipe>
        </div>
        <div class="goods-header" v-if="detailData">
          <h2 class="title">{{detailData.title}}</h2>
          <span class="hide js-add-wish js-wish-animate wish-add  font-size-12 tag tag-redf30 pull-right">
                喜欢
            </span>
          <div class="goods-price ">
            <div class="current-price">
              <span>¥</span><i class="js-goods-price price">{{detailData.price | formatPrice}}</i>
            </div>
            <span class="btn btn-blue btn-retail hide js-retail-btn">门店有售</span>
            <div class="original-price">
              {{detailData.originalPrice | formatPrice}} </div>
          </div>
          <hr class="with-margin-l">
          <div class="stock-detail">
            <dl>
              <dt>运费:</dt>
              <dd class="js-postage-desc" data-postage="免运费">
                {{detailData.postage}} </dd>
            </dl>
            <dl>
              <dt>剩余:</dt>
              <dd>{{detailData.remain}}</dd>
            </dl>
            <dl>
              <dt>销量:</dt>
              <dd>{{detailData.sales}}</dd>
            </dl>
          </div>
        </div>
        <div class="sku-detail adv-opts">
          <div class="sku-detail-inner adv-opts-inner">
            <dl class="sku-group select-sku js-select-sku" @click="chooseSku(1)">
              <dt><span class="js-sku-label">选择</span>：</dt>
              <dd class="js-sku-value">
                <span class="sku-item">净含量</span> </dd>
            </dl>
          </div>
        </div>
        <div class="js-store-info">
          <div class="block block-list goods-store">
            <div class="custom-store block-item ">
              <a class="custom-store-link clearfix" href="#">
                <div class="custom-store-img"></div>
                <div class="custom-store-name">
                  寻找田野 </div>
                <span class="custom-store-enter">进入店铺</span>
              </a>
            </div>
            <a class="offline-store block-item js-retail-store hide">
              <span class="offline-store-img"></span>
              <span class="offline-store-name">线下门店</span>
              <div class="offline-store-branch js-retail-store-name"></div>
            </a>
            <div class="renzheng block-item">
              <span class="js-rz-item-alert rz-item" data-type="team_certificate_company">
                <span class="rz-name font-size-12 c-gray-darker">企业认证</span>
              </span>
              <span class="js-rz-item-alert rz-item" data-type="is_secured_transactions">
                <span class="rz-name font-size-12 c-gray-darker">担保交易</span>
              </span>
            </div>
          </div>
        </div>
        <a class="js-package-buy-block hide"></a>
        <div class="js-detail-container" style="margin-top: 10px;">
          <div class="js-tabber-container goods-detail">
            <div class="js-tabber tabber tabber-n2 clearfix orange">
              <button v-for="(item, index) in detailTab" data-type="goods"
                      :class="{active: tabIndex === index}"
                      @click="changeTab(index)">
                {{item}} </button>
            </div>
            <div class="js-tabber-content">
              <div class="js-part" data-type="sales" v-show="tabIndex === 1">
                <div class="js-traderecord-list block-list-traderecord">
                  <div class="list-header">
                    <span class="col-1">买家</span>
                    <span class="col-2 center">成交时间</span>
                    <span class="col-3 center">数量</span>
                  </div>
                  <div class="js-list b-list block block-list">
                    <div class="block-item" v-for="(list, index) in dealList.lists" :key="index">
                      <span class="col-1 c-gray-darker">{{list.buyer}}</span>
                      <span class='col-2 c-gray-dark center'>{{list.time}}</span>
                      <span class="col-3 c-gray-darker center">{{list.num}}</span>
                    </div>
                  </div>
                </div>
              </div >
              <div class="js-part js-goods-detail goods-tabber-c" data-type="goods" v-if="detailData" v-show="tabIndex === 0">
                <div class="js-components-container components-container">
                  <div class="custom-richtext js-lazy-container js-view-image-list" v-html="detailData.description">
                  </div>
                  <!--<div class="price-intro">-->
                    <!--<h4>划线价格说明<i class="icon-arrow"></i></h4>-->
                    <!--<p>划线价格：划线的价格可能是商品的专柜价、吊牌价、正品零售价、指导价、曾经展示过的销售价等，仅供您参考。</p>-->
                    <!--<p>未划线价格：未划线的价格是商品的销售标价，具体的成交价格可能因会员使用优惠券、积分等发生变化，最终以订单结算价格为准。 </p>-->
                    <!--<p>*此说明仅当出现价格比较时有效。若这件商品针对划线价格进行了特殊说明，以特殊说明为准。</p>-->
                  <!--</div>-->
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="js-bottom-opts js-footer-auto-ele stick-bottom">
          <div class="stick-bottom-icons">
            <a href="javascript:;" class="js-yz-im icons icons-im ">店主</a>
            <a href="javascript:;" class="js-call-im icons icons-home">店铺</a>
            <a href="javascript:;" class="js-yz-zan icons icons-zan ">收藏</a>
          </div>
          <div class="stick-bottom-btns">
            <!-- 尚未开售 -->
            <div class="btn-cart" @click="chooseSku(2)">
              <a href="javascript:;" class="js-add-cart">加入购物车</a>
            </div>
            <div class="btn-buy" @click="chooseSku(3)">
              <a href="javascript:;" class="js-buy-it">立即购买</a>
            </div>
          </div>
        </div>
        <!-- <div id="right-icon" class="js-right-icon hide">
          <div class="js-right-icon-container right-icon-container clearfix">
            <a id="global-cart" href="https://h5.youzan.com/v2/trade/cart?kdt_id=16546132" class="icon hide" style="">
              <p class="icon-img"></p>
              <p class="icon-txt">购物车</p>
            </a>
            <a class="js-show-more-btn icon show-more-btn hide"></a>
          </div>
        </div> -->
        <div id="right-icon" class="js-right-icon " v-show="showCartIcon">
          <div class="js-right-icon-container right-icon-container clearfix">
            <a id="global-cart" href="https://h5.youzan.com/v2/trade/cart?kdt_id=16546132" class="icon new s0" style="">
              <p class="icon-img"></p>
              <p class="icon-txt">购物车</p>
            </a>
            <a class="js-show-more-btn icon show-more-btn "></a>
          </div>
        </div>
      </div>
      <div id="shop-nav"></div>
    </div>
  </div>
  <div class="js-footer" style="min-height: 1px;">
    <div>
      <div class="footer">
        <div class="copyright">
          <!--<div class="ft-links">-->
            <!--<a href="https://h5.youzan.com/v2/showcase/homepage?kdt_id=16546132" target="_blank">店铺主页</a>-->
            <!--<a href="https://h5.youzan.com/v2/showcase/usercenter?kdt_id=16546132" target="_blank">会员中心</a>-->
            <!--<a href="javascript:;" class="js-open-follow">关注我们</a>-->
            <!--<a href="https://h5.youzan.com/v2/showcase/cert" target="_blank">店铺信息</a>-->
            <!--&lt;!&ndash; 第三方app隐藏topbar时，需要在底部显示购物记录入口 &ndash;&gt;-->
          <!--</div>-->
          <div class="ft-copyright " style="background-image: url(https://img.yzcdn.cn/upload_files/2017/06/16/FgtL3QzprXTGrVPaolozNT08Xs2K.png);">
          </div>
        </div>
      </div>
    </div>
  </div>
  // 遮罩
  <div id="yFzBKP9GDL" v-show="showSkuPop" @click="showSkuPop = false" style="height: 100%; position: fixed; top: 0px; left: 0px; right: 0px; background-color: rgba(0, 0, 0, 0.7); z-index: 1000; transition: none 0.2s ease; opacity: 1;"></div>

 // 购买弹窗
    <ChooseSku v-if="showSkuPop" :skuType="skuType" @addCart="addCart" @close="closeSku"></ChooseSku>



  <div class="motify" style="display: none;">
    <div class="motify-inner">已成功添加到购物车</div>
  </div>
</div>
</template>

<script>
  import Swipe from './Swipe.vue'
  import ChooseSku from './ChooseSku.vue'
  import url from '../modules/js/api.js'
  export default {
    name: "GoodDetail",
    data(){
      return {
        goodsId: null,
        bannerList: [],
        detailData: null,
        detailTab: ['商品详情','本店成交'],
        tabIndex: 0,
        dealList: [],
        skuType: '',
        showSkuPop: false,
        showCartIcon: false
      }
    },
    methods: {
      getData(){
        this.$http.get(url.details,{id: this.goodId}).then(res => {
          this.detailData = res.data.data
          res.data.data.imgs.map( img => {
            this.bannerList.push({
              clickUrl: '#',
              img: img
            })
          })
        })
      },
      changeTab(index) {
        this.tabIndex = index
      },
      getDealList() {
        this.$http.get(url.deals,{id: this.goodsId}).then(res => {
          this.dealList = res.data.data
        })
      },
      chooseSku(type) {
        this.showSkuPop = true
        this.skuType = type
      },
      addCart(data) {
        this.$http.post(url.addCart,{
          id: this.goodsId,
          number: data
        }).then(res => {
          this.showSkuPop = false
          this.showCartIcon = true
        })
      },
      closeSku() {
        this.showSkuPop = false
      }
    },
    created(){
      this.goodsId = this.$route.query.id
      this.getData()
      this.getDealList()
      window.scrollTo(0,0)

    },
    components: {
      Swipe,ChooseSku
    },
    watch: {
      showSkuPop(val) {
        document.body.style.overflow = val? 'hidden' : 'auto'
        document.querySelector('html').style.overflow = val ? 'hidden' : 'auto'
        document.body.style.height = val ? '100%' : 'auto'
        document.querySelector('html').style.height = val ? '100%' : 'auto'
      }
    }
  }
</script>

<style src="../modules/css/goods_custom.css"></style>
<style scoped>
  @import '../modules/css/goods_common.css';
  @import '../modules/css/goods.css';
  @import '../modules/css/goods_theme.css';
  @import '../modules/css/goods_mars.css';
  @import '../modules/css/goods_sku.css';
</style>
