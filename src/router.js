import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('./views/Home.vue')
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('./views/About.vue')
    },
    {
      path: '/stats',
      name: 'stats',
      component: () => import('./views/Stats.vue')
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('./views/Admin/Admin.vue')
    },
    {
      path: '/groups',
      name: 'groups',
      component: () => import('./views/Admin/Groups.vue')
    },
    {
      path: '/makegames',
      name: 'makegames',
      component: () => import('./views/Admin/MakeGames.vue')
    },
    {
      path: '/makegroups',
      name: 'makegroups',
      component: () => import('./views/Admin/MakeGroups.vue')
    },
    {
      path: '/players',
      name: 'players',
      component: () => import('./views/Admin/Players.vue')
    },
    {
      path: '/schedules',
      name: 'schedules',
      component: () => import('./views/Admin/Schedules.vue')
    }
  ]
})
