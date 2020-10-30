import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
  path: '/',
  redirect: '/recommend',
  component: () => import('@/views/main/index.vue'),
  children: [{
      path: '/recommend',
      name: 'recommend',
      component: () => import('@/views/recommend/index.vue'),
      meta: {
        title: "推荐"
      },
    },
    {
      path: '/singer',
      name: 'singer',
      component: () => import('@/views/singer/index.vue'),
      meta: {
        title: "歌手"
      },
    },
    {
      path: '/rank',
      name: 'rank',
      component: () => import('@/views/rank/index.vue'),
      meta: {
        title: "排行"
      },
    },
    {
      path: '/search',
      name: 'search',
      component: () => import('@/views/search/index.vue'),
      meta: {
        title: "搜索"
      },
    }
  ]
}, {
  path: '/musicList',
  name: 'musicList',
  component: () => import('@/views/singer-list/index.vue'),
  meta: {
    title: "音乐列表"
  },
}, {
  path: '/rankList',
  name: 'rankList',
  component: () => import('@/views/rank-list/index.vue'),
  meta: {
    title: "排行版详情"
  },
}]

const router = new VueRouter({
  routes
})

export default router