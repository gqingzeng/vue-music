import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
const routes = [
  {
    path:'/',
    redirect:'/recommend',
    component: () =>import('@/views/main/index.vue'),
    children:[
      {
        path:'/recommend',
        name:'recommend',
        component:()=>import('@/views/recommend/index.vue')
      },
      {
        path:'/singer',
        name:'singer',
        component:()=>import('@/views/singer/index.vue')
      },
      {
        path:'/rank',
        name:'rank',
        component:()=>import('@/views/rank/index.vue')
      },
      {
        path:'/search',
        name:'search',
        component:()=>import('@/views/search/index.vue')
      }
    ]
  },{
    path:'/musicList',
    name:'musicList',
    component: () =>import('@/views/singer-list/index.vue'),
  }
]

const router = new VueRouter({
  routes
})

export default router