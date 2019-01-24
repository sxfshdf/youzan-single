<template>
  <div class="allAddress">
    <div class="container " style="min-height: 597px;">
      <div class="section section-first">
        <div class="block form js-form">
          <input class="js-id" name="id" type="hidden" value="">
          <div class="block-item" style="border-top:0;">
            <label>收货人</label>
            <input type="text" placeholder="请输入姓名" autocomplete="off" name="user_name" @focus="text" v-model.trim="name" maxlength="20">
          </div>
          <div class="block-item">
            <label>联系电话</label>
            <input type="tel" placeholder="联系电话" autocomplete="off" name="tel" v-model.trim="tel" maxlength="11" @focus="text">
          </div>
          <div class="block-item">
            <label>选择地区</label>
            <div class="select-group">
              <select class="js-province-selector" v-model="provinceValue">
                <option value="-1">选择省份</option>
                <option v-for="(province,index) in addressData.list" :key="index"
                        :value = "province.value">
                  {{province.label}}
                </option>
              </select>
              <select class="js-city-selector" v-model="cityValue">
                <option value="-1">选择城市</option>
                <option v-for="(city,index) in cityList" :key="index"
                        :value = "city.value">
                  {{city.label}}
                </option>
              </select>
              <select class="js-county-selector" name="area_code" data-code="" v-model="districtValue">
                <option value="-1">选择地区</option>
                <option v-for="(district,index) in districtList" :key="index"
                        :value = "district.value">
                  {{district.label}}
                </option>
              </select>
            </div>
          </div>
          <div class="block-item">
            <label>详细地址</label>
            <input type="text" placeholder="街道门牌信息" autocomplete="off" name="address_detail" @focus="text" v-model.trim="address" maxlength="100">
          </div>
        </div>
      </div>
      <div class="block section js-save block-control-btn" @click="add">
        <div class="block-item c-blue center">保存</div>
      </div>
      <div class="block section js-delete block-control-btn" v-show="type==='edit'" @click="remove(id)">
        <div class="block-item c-red center">删除</div>
      </div>
      <div class="block stick-bottom-row center js-save-default" v-show="type === 'edit'">
        <button class="btn btn-standard js-save-default-btn" @click="setDefault">设为默认收货地址</button>
      </div>
    </div>
    <!--<transition name="fade">-->
      <div class="motify-address" v-show="showErr">
        <div class="motify-address-inner">{{errMsg}}</div>
      </div>
    <!--</transition>-->
    <!--<transition name="fade">-->
      <div class="van-modal" style="z-index: 2000;" v-show="showPop"></div>
    <!--</transition>-->
    <!--<transition name="fade">-->
      <div class="van-dialog" style="z-index: 2001;" v-show="showPop"><!---->
        <div class="van-dialog__content">
          <div class="van-dialog__message">确定要删除地址吗？</div>
        </div>
        <div class="van-hairline--top van-dialog__footer van-dialog__footer--buttons">
          <button class="van-button van-button--default van-button--large van-dialog__cancel" style="" @click="removeCancel">
            <span class="van-button__text">
            取消</span>
          </button>
          <button class="van-button van-button--default van-button--large van-dialog__confirm van-hairline--left" @click="removeConfirm">
            <span class="van-button__text">
            确认</span>
          </button>
        </div>
      </div>
    <!--</transition>-->
  </div>

</template>

<script>
  import addressData from '../modules/js/address.json'
  import $ from 'jquery'
    export default {
      name: "AddressDetail",
      data() {
        return {
          type: this.$route.query.type,
          instance: this.$route.query.instance,
          addressData: addressData,
          cityList: null,
          districtList: null,
          provinceValue: -1,
          cityValue: -1,
          districtValue: -1,
          address: '',
          name: '',
          tel: '',
          id: '',
          isDefault: '',
          isInitVal: false,
          showErr: false,
          errMsg: '',
          inputWrong: false,
          showPop: false
        }
      },
      methods: {
        add(){
          let reg = /^1[0-9]{10}$/
          if(!this.name){
            this.showErr = true
            this.errMsg = '收货人不能为空'
            this.inputWrong = true
            $("input[name='user_name']").addClass('invalid').siblings('.invalid').removeClass('invalid')
            return
          }
          if(!this.tel){
            this.showErr = true
            this.errMsg = '联系电话不能为空'
            $("input[name='tel']").addClass('invalid').siblings('.invalid').removeClass('invalid')
            return
          }else if(!reg.test(this.tel)){
            this.showErr = true
            this.errMsg = '号码格式有误'
            $("input[name='tel']").addClass('invalid').siblings('.invalid').removeClass('invalid')
            return
          }
          if(this.provinceValue ===-1 || this.cityValue === -1 || this.districtValue === -1){
            this.showErr = true
            this.errMsg = '请选择地区'
            $("select").addClass('invalid')
            return
          }
          if(!this.address){
            this.showErr = true
            this.errMsg = '请输入详细地址'
            $("input[name='address_detail']").addClass('invalid').siblings('.invalid').removeClass('invalid')
            return
          }
          let {id,name,tel,provinceValue,cityValue,districtValue,address,isDefault,provinceName,cityName,districtName} = this
          let data = {id,name,tel,provinceValue,cityValue,districtValue,address,isDefault,provinceName,cityName,districtName}
          if(this.type === 'add') {
            this.$store.dispatch('addAddress',data)
          }
          if(this.type === 'edit') {
            this.$store.dispatch('updateAddress',data)
          }
        },
        text() {
          $('input').removeClass('invalid')
          this.showErr = false
        },
        remove() {
          this.showPop = true
        },
        removeCancel() {
          this.showPop = false
        },
        removeConfirm() {
          this.$store.dispatch('removeAddress',this.id)
          this.showPop = false
        },
        setDefault() {
          this.$store.dispatch('setDefaultAddress',this.id)
        }
      },
      computed: {
        lists() {
          return this.$store.state.lists
        },
        provinceName(){
          if(!this.addressData.list) return
          let value = this.provinceValue
          if(value === -1) return
          let index = this.addressData.list.findIndex(item => {
            return item.value === value
          })
          return this.addressData.list[index].label
        },
        cityName(){
          if(!this.cityList) return
          let value = this.cityValue
          if(value === -1) return
          let index = this.cityList.findIndex(item => {
            return item.value === value
          })
          return this.cityList[index].label
        },
        districtName(){
          if(!this.districtList) return
          let value = this.districtValue
          if(value === -1) return
          let index = this.districtList.findIndex(item => {
            return item.value === value
          })
          return this.districtList[index].label
        }
      },
      watch: {
        provinceValue(value){
          if(parseInt(value) === -1) return
          if(this.type === 'edit') {
            this.cityValue === this.instance.cityValue
          }
          let index = this.addressData.list.findIndex(item => {
            return item.value === value
          })
          this.cityList = this.addressData.list[index].children
          this.districtValue = -1
          this.cityValue = -1
          if(this.type === 'edit' && this.isInitVal) {
            this.cityValue = parseInt(this.instance.cityValue)
          }
        },
        cityValue(value) {
          if(parseInt(value) === -1) return
          if(this.type === 'edit') {
            this.districtValue = this.instance.districtValue
          }
          let index = this.cityList.findIndex(item => {
            return item.value === value
          })
          this.districtList = this.cityList[index].children
          this.districtValue = -1
          if(this.type === 'edit' && this.isInitVal) {
            this.districtValue = parseInt(this.instance.districtValue)
            this.isInitVal = false
          }
        },
        lists: {
          handler(val,oldVal){
            this.$router.go(-1)
          },
          deep: true
        }
      },
      created() {
        if(this.type === 'edit') {
          this.provinceValue = parseInt(this.instance.provinceValue)
          this.cityValue = parseInt(this.instance.cityValue)
          this.districtValue = parseInt(this.instance.districtValue)
          this.address = this.instance.address
          this.name = this.instance.name
          this.tel = this.instance.tel
          this.id = this.instance.id
          this.isDefault = this.instance.isDefault
          this.isInitVal = true

        }
      }
    }
</script>

<style scoped>
  @import '../modules/css/address_base.css';
  @import '../modules/css/address.css';
</style>
