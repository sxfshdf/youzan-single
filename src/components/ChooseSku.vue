<template>
  <div id="QfEqtDbeK9" class="sku-layout sku-box-shadow popup" style="overflow: hidden; position: fixed; z-index: 1000; background: white; bottom: 0px; left: 0px; right: 0px; visibility: visible; transform: translate3d(0px, 0px, 0px); transition: all 300ms ease; opacity: 1; display: block;">
    <div class="sku-layout-title name-card sku-name-card">
      <div class="thumb"><img class="js-goods-thumb goods-thumb" src="https://img.yzcdn.cn/upload_files/2017/07/12/FkSvYz8FLLD9-t0smXO43hF6ov7S.jpg?imageView2/2/w/100/h/100/q/75/format/webp?imageView2/2/w/100/h/100/q/75/format/webp" alt=""></div>
      <div class="detail goods-base-info clearfix">
        <p class="title c-black ellipsis">寻找田野|最正宗的上海南汇8424 得奖最多奥运会指定西瓜1只/箱 9-11斤</p>
        <div class="goods-price clearfix">
          <div class="current-price pull-left c-black">
            <span class="price-name pull-left font-size-14 c-orange">¥</span><i class="js-goods-price price font-size-16 vertical-middle c-orange">98.00</i>
          </div>
          <div class="original-price vertical-middle font-size-14 line-through">108</div>
        </div>
      </div>
      <div class="js-cancel sku-cancel" @click="$emit('close')">
        <div class="cancel-img"></div>
      </div>
    </div>
    <div class="sku-detail adv-opts hotel-checkin-select" style="border: none; margin: 0; display: none;">
      <div class="sku-detail-inner adv-opts-inner-addons">
        <dl class="sku-group select-sku js-select-checkin-date">
          <dt>时间：</dt>
          <dd class="js-checkin-date-value">选择入住时间</dd>
        </dl>
      </div>
    </div>
    <div class="adv-opts layout-content" style="max-height: 554px;">
      <div class="goods-models js-sku-views block block-list border-top-0">
        <dl class="clearfix block-item sku-list-container">
          <dt class="model-title sku-sel-title">
            <label>净含量：</label>
          </dt>
          <dd>
            <ul class="model-list sku-sel-list">
              <li class="tag sku-tag pull-left ellipsis active">4500g-5000g</li>
            </ul>
          </dd>
        </dl>
        <dl class="clearfix block-item">
          <dt class="sku-num pull-left">
            <label>购买数量：</label>
          </dt>
          <dd class="sku-quantity-contaienr">
            <dl class="clearfix">
              <div class="quantity">
                <button class="minus" type="button" disabled="true"  :class="{disabled: skuNum === 1}"></button>
                <input type="text" class="txt" pattern="[0-9]*" :value="skuNum">
                <button class="plus" type="button" ></button>
                <div class="response-area response-area-minus" @click="changeNum(-1)"></div>
                <div class="response-area response-area-plus" @click="changeNum(1)"></div>
              </div>
            </dl>
          </dd>
          <dt class="other-info">
            <div class="stock">剩余450件
            </div>
          </dt>
        </dl>
        <div class="block-item block-item-messages" style="display: none;">
        </div>
      </div>
      <!-- <div class="bottom-padding"></div> -->
      <div class="confirm-action content-foot clearfix">
        <!-- 加入购物车 -->
        <div class="big-btn-1-1" style="display: none;" v-show="skuType === 2">
          <a href="javascript:;" class="js-confirm-it big-btn red-btn main-btn" @click="addCart">加入购物车</a>
        </div>
        <!-- 立即购买 -->
        <div class="big-btn-1-1" v-show="skuType === 3">
          <a href="javascript:;" class="js-confirm-it big-btn red-btn main-btn" @click="addCart">下一步</a>
        </div>
        <!-- 选择规格 -->
        <div class="big-btn-2-1" v-show="skuType === 1">
          <a href="javascript:;" class="js-mutiBtn-confirm cart big-btn orange-btn vice-btn" @click="addCart">加入购物车</a>
          <a href="javascript:;" class="js-mutiBtn-confirm confirm big-btn red-btn main-btn" @click="addCart">立即购买</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
      name: "ChooseSku",
      props: ['skuType'],
      data(){
        return {
          skuNum: 1,
        }
      },
      methods: {
        addCart() {
          this.$emit('addCart',this.skuNum)
        },
        changeNum(num) {
          if(this.skuNum === 1 && num < 0) return
          this.skuNum += num
        }
      },
    }
</script>

<style scoped>
  @import '../modules/css/goods_common.css';
  @import '../modules/css/goods_sku.css';
</style>
