import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    redirect: '/recommend',
  },
  {
    path: '/recommend',
    name: 'recommend',
    component: () => import('@/views/recommend/index.vue'),
    meta: {
      title: "推荐",
    },
    children: [{
      path: '/recommendHotDetail',
      name: 'recommendHotDetail',
      component: () => import('@/views/recommendHotDetail/index.vue'),
      meta: {
        title: "推荐详情"
      },
    }]
  },
  {
    path: '/singer',
    name: 'singer',
    component: () => import('@/views/singer/index.vue'),
    meta: {
      title: "歌手",
    },
    children: [{
      path: '/singerDetail',
      name: 'singerDetail',
      component: () => import('@/views/singerDetail/index.vue'),
      meta: {
        title: "歌手详情",
      },
    }]
  },
  {
    path: '/rank',
    name: 'rank',
    component: () => import('@/views/rank/index.vue'),
    meta: {
      title: "排行",
      keepAlive: true
    },
    children: [{
      path: '/rankDetail',
      name: 'rankDetail',
      component: () => import('@/views/rankDetail/index.vue'),
      meta: {
        title: "排行详情"
      },
    }]
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('@/views/search/index.vue'),
    meta: {
      title: "搜索",
      keepAlive: true
    },
  },
]

const router = new VueRouter({
  routes
})

export default router