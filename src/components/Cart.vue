<template>

  <div class="container " style="min-height: 581px;">
    <div class="content clearfix js-page-content cart-content">
      <div id="cart-container">
        <div>
          <!---->
          <!---->
          <!---->
          <div class="js-shop-list shop-list">
            <div class="block block-order block-cart" v-for="(shop,shopIndex) in cartData">
              <div class="header">
                <div class="select-group js-select-group" v-show="!editingShop" @click="selectShop(shop)">
                  <span class="check" :class="{checked: shop.checked}" ></span>
                </div>
                <div class="select-group js-select-group" v-show="editingShop && editingShopIndex === shopIndex" @click="selectShop(shop)">
                  <span class="check" :class="{checked: shop.removeChecked}" ></span>
                </div>
                <a class="shop-title">
                  <i class="custom-store-img">店铺：</i>
                  {{shop.shopTitle}}
                </a>
                <a href="javascript:;" data-type="cart" class="j-edit-list pull-right c-blue font-size-12 edit-list"
                    @click = 'editShop(shop,shopIndex)'>
                  <!---->
                  {{shop.editingMsg}}
                </a>
              </div>
              <!---->
              <div>
                <ul class="js-list block block-list block-list-cart border-0">
                  <li class="block-item block-item-cart"
                      :class="{editing: shop.editing}"
                      v-for="(good,goodIndex) in shop.goodsList">
                    <div>
                      <div class="check-container" @click="selectGood(good,shop)" v-show="!editingShop">
                        <span class="check" :class="{checked: good.checked}" >
                        </span>
                      </div>
                      <div class="check-container" @click="selectGood(good,shop)" v-show="editingShop && editingShopIndex === shopIndex">
                        <span class="check" :class="{checked: good.removeChecked}" >
                        </span>
                      </div>
                      <div class="name-card clearfix">
                        <a href="https://h5.youzan.com/v2/showcase/goods?alias=2oivacpjh2ex0" class="thumb js-goods-link">
                          <img class="js-lazy" :src="good.img">
                          <!---->
                        </a>
                        <div class="detail">
                          <a href="https://h5.youzan.com/v2/showcase/goods?alias=2oivacpjh2ex0" class="js-goods-link">
                            <h3 class="title js-ellipsis">
                              <i>{{good.title}}</i>
                            </h3>
                          </a>
                          <p class="sku ellipsis">
                            7-9钱，总重1600g 净虾800g
                          </p>
                          <!-- 显示状态 -->
                          <div class="num" v-show="!shop.editing">
                            ×<span class="num-txt">{{good.number}}</span>
                            <!---->
                          </div>
                          <!-- 编辑状态 -->
                          <div class="num" v-show="shop.editing">
                            <!---->
                            <div class="quantity">
                              <button type="button" class="minus" :class="{disabled: good.number === 1}"></button>
                              <input type="text" pattern="[0-9]*" class="txt" v-model="good.number" @input="update(good)">
                              <button type="button" class="plus" ></button>
                              <div class="response-area response-area-minus" @click="reduce(good)"></div>
                              <div class="response-area response-area-plus" @click="add(good)"></div>
                            </div>
                          </div>
                          <div class="price c-orange">
                            ¥<span>{{good.price | formatPrice}} </span></div>
                        </div>
                        <div class="error-box"></div>
                      </div>
                      <div class="delete-btn" @click="remove(shop,shopIndex,good,goodIndex)">
                        <span>删除</span>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div style="padding:0;" class="js-bottom-opts bottom-fix">
            <div class="go-shop-tip js-go-shop-tip c-orange font-size-12">
              你需要分开结算每个店铺的商品哦~
            </div>
            <div class="bottom-cart clear-fix">
              <div class="select-all"  @click="selectAll">
                <span class="check" :class="{checked:allSelected}" v-show="!editingShop"></span>
                <span class="check" :class="{checked:allRemoveSelected}" v-show="editingShop"></span>
                全选
              </div>
              <!-- 显示状态 -->
              <div class="total-price" v-show="!editingShop">
                合计：¥<span class="js-total-price" style="color: rgb(255, 102, 0);">{{total | formatPrice}}</span>
                <p class="c-gray-dark not-postage">不含运费</p>
              </div>
              <button href="javascript:;" class="js-go-pay btn btn-orange-dark font-size-14"
                      v-show="!editingShop"
                      :disabled="!selectedList.length">
                结算 ({{selectedList.length?selectedList.length:'0'}})
              </button>
              <!-- 编辑状态 -->
              <button href="javascript:;" disabled="disabled" class="j-delete-goods btn font-size-14 btn-red"
                      v-show="editingShop"
                      :disabled="!removeList.length" @click="removeLists">删除
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 删除弹窗 -->
    <transition name="fade">
      <div class="van-modal" style="z-index: 2000;" v-show="showPop"></div>
    </transition>
    <transition name="fade">
      <div class="van-dialog" style="z-index: 2001;" v-show="showPop">
        <div class="van-dialog__content">
          <div class="van-dialog__message">{{removeMsg}}</div>
        </div>
        <div class="van-hairline--top van-dialog__footer van-dialog__footer--buttons">
          <button class="van-button van-button--default van-button--large van-dialog__cancel" @click="cancelRemove">
              <span class="van-button__text">
              取消</span>
          </button>
          <button class="van-button van-button--default van-button--large van-dialog__confirm van-hairline--left" @click="comfirmRemove">
              <span class="van-button__text">
              确认</span>
          </button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  import url from '../modules/js/api.js'
    export default {
      name: "Cart",
      data() {
        return {
          cartData: null,
          editingShop: null,
          editingShopIndex: -1,
          total: 0,
          isAdding: false,
          showPop: false,
          removeData: null,
          removeMsg: ''
        }
      },
      computed:{
        allSelected:{
          get() {
            if(this.cartData && this.cartData.length) {
              return this.cartData.every(shop => {
                return shop.checked
              })
            }
          },
          set(val) {
            this.cartData.map(shop => {
              shop.checked = val
              shop.goodsList.map(good => {
                good.checked = val
              })
            })
          }
        },
        allRemoveSelected: {
          get() {
            if(this.editingShop) {
              return this.editingShop.removeChecked
            }
            return false
          },
          set(val) {
            if(this.editingShop) {
              this.editingShop.removeChecked = val
              this.editingShop.goodsList.map(good => {
                good.removeChecked = val
              })
            }
          }
        },
        selectedList(){
          if(this.cartData && this.cartData.length) {
            let array = []
            let total = 0
            this.cartData.map(shop => {
              shop.goodsList.map( good => {
                if(good.checked) {
                  array.push(good)
                  total += good.number * good.price
                }
              })
            })
            this.total = total
            return array
          }
          return []
        },
        removeList(){
          if(this.editingShop) {
            let array = []
            this.editingShop.goodsList.map(good => {
              if(good.removeChecked) {
                array.push(good)
              }
            })
            return array
          }
          return []
        }
      },
      methods: {
        getData() {
          this.$http.get(url.cartList).then(res => {
            let lists = res.data.cartList
            lists.map(shop => {
              shop.checked = false
              shop.editing = false
              shop.editingMsg = '编辑'
              shop.removeChecked = false
              shop.goodsList.map( good => {
                good.checked = false
                good.removeChecked = false
              })
            })
            this.cartData = lists
          })
        },
        editShop(shop,shopIndex) {
          shop.editing = !shop.editing
          shop.editingMsg = shop.editing? '完成' : '编辑'
          this.cartData.map((item,index) => {
            if(shopIndex !== index) {
              // item.editing = false
              item.editingMsg = item.editingMsg? '' : '编辑'
            }
          })
          this.editingShop = shop.editing? shop : null
          this.editingShopIndex = shop.editing? shopIndex : -1
        },
        selectShop(shop) {
          let attr = this.editingShop? 'removeChecked' : 'checked'
          shop[attr] = !shop[attr]
          shop.goodsList.map(good => {
            good[attr] = shop[attr]
          })
        },
        selectGood(good,shop) {
          let attr = this.editingShop? 'removeChecked' : 'checked'
          good[attr] = !good[attr]
          shop[attr] = shop.goodsList.every(good => {
            return good[attr]
          })
        },
        selectAll() {
          let attr = this.editingShop? 'allRemoveSelected' : 'allSelected'
          this[attr] = !this[attr]
        },
        add(good) {
          // if(this.isAdding) return
          // this.isAdding = true
          this.$http.post(url.addCart,{id: good.id, number: 1}).then(res => {
            good.number ++
            // this.isAdding = false
          })
        },
        update(good) {
          good.number = good.number.replace(/\D/g,'')
          this.$http.post(url.cartUpdate,{id:good.id, number:good.number}).then(res => {})
        },
        reduce(good) {
          if(good.number === 1) return
          this.$http.post(url.cartReduce,{id: good.id, number: 1}).then(res => {
            good.number --
          })
        },
        remove(shop,shopIndex,good,goodIndex) {
          this.showPop = true
          this.removeData = {shop,shopIndex,good,goodIndex}
          this.removeMsg = '确定要删除该商品吗？'
        },
        removeLists() {
          this.showPop = true
          this.removeMsg = `确定要删除选中的${this.removeList.length}个商品吗`
        },
        removeShop() {
          this.editingShop = null
          this.editingShopIndex = -1
          this.cartData.map(shop => {
            shop.editing = false
            shop.editingMsg = '编辑'
          })
        },
        comfirmRemove() {
          if(this.removeMsg === '确定要删除该商品吗？') {
            let {shop,shopIndex,good,goodIndex} = this.removeData
            this.$http.post(url.cartRemove, {id: good.id}).then(res => {
              shop.goodsList.splice(goodIndex,1)
              if(!shop.goodsList.length) {
                this.cartData.splice(shopIndex,1)
                this.removeShop()
              }
              this.showPop = false
            })
          }else {
            this.$http.post(url.cartMremove, this.removeList).then(res => {
              let array = []
              this.editingShop.goodsList.map(good => {
                let index = this.removeList.findIndex(item => {
                  return item.id = good.id
                })
                if(index === -1) {
                  array.push(good)
                }
              })
              if(array.length) {
                this.editingShop.goodList = array
              }else {
                this.cartData.splice(this.editingShopIndex,1)
                this.removeShop()
              }
              this.showPop = false
            })
          }
        },
        cancelRemove() {
          this.showPop = false
        }
      },
      created() {
        this.getData()
      }
    }
</script>

<style scoped>
@import '../modules/css/cart_base.css';
@import '../modules/css/cart_trade.css';
@import '../modules/css/cart.css';
</style>
