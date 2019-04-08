import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('./views/Home.vue'),
      children: [
        {
          path: '/login',
          name: 'login',
          component: () => import('./components/Login.vue')
        },
        {
          path: '/playerinfo',
          name: 'playerinfo',
          component: () => import('./components/PlayerInfo.vue')
        }
      ]
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('./views/About.vue')
    },
    {
      path: '/stats',
      name: 'stats',
      component: () => import('./views/Stats.vue'),
        children: [
          {
            path: '/gameschedule',
            name: 'gameschedule',
            component: () => import('./components/HighScore/GameSchedule.vue')
          },
          {
            path: '/group',
            name: 'group',
            component: () => import('./components/HighScore/Group.vue')
          },
          {
            path: '/highscore',
            name: 'highscore',
            component: () => import('./components/HighScore/HighScore.vue')
          }
        ]
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('./views/Admin/Admin.vue')
    },
    {
      path: '/adminplayers',
      name: 'adminplayers',
      component: () => import('./views/Admin/AdminPlayers.vue'),
        children: [
          {
            path: '/addplayer',
            name: 'addplayer',
            component: () => import('./components/Admin/AddPlayer.vue')
          },
          {
            path: '/editplayer',
            name: 'editplayer',
            component: () => import('./components/Admin/EditPlayer.vue')
          }
        ]
    },
    {
      path: '/groups',
      name: 'groups',
      component: () => import('./views/Admin/Groups.vue')
    },
    {
      path: '/makegames',
      name: 'makegames',
      component: () => import('./views/Admin/MakeGames.vue'),
      children: [
        {
          path: '/chooseteam',
          name: 'chooseteam',
          component: () => import('./components/Admin/ChooseTeam.vue'),
          children: [
            {
              path: '/choosepoint',
              name: 'choosepoint',
              component: () => import('./components/Admin/ChoosePoint.vue'),
              children: [
                {
                  path: '/choosegame',
                  name: 'choosegame',
                  component: () => import('./components/Admin/ChooseGame.vue')
                }
              ]
            }
          ]
        }
      ]
    },
    {
      path: '/makegroups',
      name: 'makegroups',
      component: () => import('./views/Admin/MakeGroups.vue')
    },
    {
      path: '/players',
      name: 'players',
      component: () => import('./views/Admin/Players.vue'),
      children: [
        {
          path: '/player',
          name: 'player',
          component: () => import('./components/Admin/Player.vue')
        }
      ]
    },
    {
      path: '/schedules',
      name: 'schedules',
      component: () => import('./views/Admin/Schedules.vue')
    }
  ]
})
