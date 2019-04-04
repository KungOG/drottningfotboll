import Vue from 'vue'
import Router from 'vue-router'
import firebase from 'firebase'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
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
/* Checks if you are logged in or not */
router.beforeEach((to, from, next) => {
  var requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  var currentUser = firebase.auth().currentUser;

  if (requiresAuth && !currentUser) {
      next('/login');
  } else if (to.path == '/login' && currentUser) {
      next('/');

  } else {
      next();
  }

});

export default router;
