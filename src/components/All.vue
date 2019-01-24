<template>
  <div class="allAddress">
    <div class="empty-list" v-if="!(lists && lists.length)">
      <h2>未添加任何地址T.T</h2>
      <div class="desc">快去添加吧</div>
      <div class="go-homepage-btn" @click="addAddr"><a>添加地址</a></div>
    </div>
    <div class="container " style="min-height: 597px;" v-else>
      <div class="block-list address-list section section-first js-no-webview-block">
        <a class="block-item js-address-item address-item "
           v-for="(list,index) in lists" :key="index"
           :class="{'address-item-default': list.isDefault}"
           @click="toDetail(list)">
          <div class="address-title">{{list.name}} {{list.tel}}</div>
          <p>{{list.provinceName}}{{list.cityName}}{{list.districtName}}{{list.address}}</p>
        </a>
      </div>
      <div class="block stick-bottom-row center" @click="addAddr">
        <a class="btn btn-blue js-no-webview-block js-add-address-btn">
          新增地址
        </a>
      </div>
    </div>
  </div>

</template>

<script>
  export default {
    name: "All",
    computed: {
      lists() {
        return this.$store.state.lists
      }
    //   empty() {
    //     if(this.lists && this.lists.length) {
    //       return true
    //     }else {
    //       return false
    //     }
    //   }
    },
    methods: {
      toDetail(address) {
        this.$router.push({
          name: 'address',
          query: {
            type: 'edit',
            instance: address
          }
        })
      },
      addAddr() {
        this.$router.push({
          name: 'address',
          query: {
            type: 'add'
          }
        })
      }
    },
    created() {
      if(!this.lists) {
        this.$store.dispatch('getLists')
      }
    }
  }
</script>

<style scoped>
  @import '../modules/css/address_base.css';
  @import '../modules/css/address.css';
</style>
