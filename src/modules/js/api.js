let url = {
  hotLists: '/index/hotLists',
  bannerLists: '/index/banner',
  topLists: '/category/topList',
  rank:'/category/rank',
  subLists: '/category/subList',
  searchList: '/search/list',
  details: '/goods/details',
  deals: '/goods/deal',
  addCart: '/cart/add',
  cartList: '/cart/list',
  cartReduce: '/cart/reduce',
  cartRemove: '/cart/remove',
  cartMremove: '/cart/mrremove',
  cartUpdate: '/cart/update',
  addressLists: '/address/list',
  addressAdd: '/address/add',
  addressRemove: '/address/remove',
  addressUpdate: '/address/update',
  addressSetDefault: '/address/setDefault'
}

let host = 'https://easy-mock.com/mock/5c335ead8b44066bd699ef8e/youzan'

for ( let key in url ) {
  if( url.hasOwnProperty(key) ) {
    url[key] = host + url[key]
  }
}

export default url
