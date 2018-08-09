import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/Home.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: home,
      children: [
        {
          path: '/',
          redirect: '/goods'
        }, {
          path: '/goods',
          component: () => import('@/components/goods/Goods.vue')
        }, {
          path: 'remarks',
          component: () => import('@/components/remarks/Remarks.vue')
        }, {
          path: 'seller',
          component: () => import('@/components/seller/Seller.vue')
        }
      ]
    }
  ]
})
