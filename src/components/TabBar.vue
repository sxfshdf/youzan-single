<template>
  <div class="bottom-nav">
  <mt-tabbar v-model="selected" fixed>
    <mt-tab-item id="home" @click.native="changeNav">
      <img slot="icon" src="../assets/img/home-selected.png" v-if="selected === 'home'">
      <img slot="icon" src="../assets/img/home.png" v-else>
      首页
    </mt-tab-item>
    <mt-tab-item id="category" @click.native="changeNav">
      <img slot="icon" src="../assets/img/category-selected.png" v-if="selected === 'category'">
      <img slot="icon" src="../assets/img/category.png" v-else>
      分类
    </mt-tab-item>
    <mt-tab-item id="cart">
      <img slot="icon" src="../assets/img/cart.png">
      购物车
    </mt-tab-item>
    <mt-tab-item id="tuser">
      <img slot="icon" src="../assets/img/user.png">
      我
    </mt-tab-item>
  </mt-tabbar>
  </div>
</template>

<script>

  import Vue from 'vue'
  import { Tabbar, TabItem } from 'mint-ui'

  Vue.component(Tabbar.name, Tabbar)
  Vue.component(TabItem.name, TabItem)

    export default {
        name: "TabBar",
      data(){
          return {
            selected:  null
          }
      },
      methods: {
          changeNav() {
            this.$router.push({
              name: this.selected,
              query: {
                tabName: this.selected
              }
            })
          }
      },
      created(){
        if(this.$route.query.tabName) {
          this.selected = this.$route.query.tabName
        }else {
          this.selected = 'home'
        }
      }
    }
</script>

<style scoped>

</style>
