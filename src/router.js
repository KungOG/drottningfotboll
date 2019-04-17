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
      component: () => import('./views/Home.vue')
    },
    {
      path: '*',
      name: 'home',
      component: () => import('./views/Home.vue')
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('./views/Home.vue')
    },
    {
      path: '/addname',
      name: 'addname',
     // meta: {requiresAuth: true},
      component: () => import('./views/AddName.vue')
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('./views/About.vue')
    },
    {
      path: '/playerinfo',
      name: 'playerinfo',
      meta: {requiresAuth: true},
      component: () => import('./views/PlayerInfo.vue')
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
      meta: {requiresAuth: true, requiresAdmin: true},
      component: () => import('./views/Admin/Admin.vue')
    },
    {
      path: '/adminplayers',
      name: 'adminplayers',
      meta: {requiresAuth: true, requiresAdmin: true},
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
      meta: {requiresAuth: true},
      component: () => import('./views/Admin/Groups.vue')
    },
    {
      path: '/makegames',
      name: 'makegames',
      meta: {requiresAuth: true, requiresAdmin: true},
      component: () => import('./views/Admin/MakeGames.vue'),
      children: [
        {
          path: '/choosegame',
          name: 'choosegame',
          component: () => import('./components/Admin/ChooseGame.vue'),
          children: [
            {
              path: '/choosepoint',
              name: 'choosepoint',
              component: () => import('./components/Admin/ChoosePoint.vue')
            }
          ]
        }
      ]
    },
    {
      path: '/makegroups',
      name: 'makegroups',
      meta: {requiresAuth: true},
      component: () => import('./views/Admin/MakeGroups.vue')
    },
    {
      path: '/players',
      name: 'players',
      meta: {requiresAuth: true, requiresAdmin: true},
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
  var isAdmin = sessionStorage.getItem('isAdmin');
  var requiresAdmin = to.matched.some(record => record.meta.requiresAdmin);


  if (requiresAuth) {       //om sidan kräver att du är inloggad
    if(!currentUser) {        // och du inte är inloggad
      next('/');                      //gå till login
    } else if(requiresAdmin) {          //och om sidan även kräver admin
      if(isAdmin === 'true') {    //och admin är true
        next();                       //gå vidare
      } else {                          
       next('/');                 //annars gå till login
      }
    } else if (to.path == '/' && currentUser) {    //om du är inloggad ska du inte kunna gå till login
      next('/');
    } else {
      next();
   }
  } else {
      next();
  }
  
});

export default router;

//Om man försöker gå in på en sida man inte har behörighet, ska man då alltid redirectas till login?
//och i så fall, funktionen ovan (som inte funkar) ska ju se till så att en inloggad användare inte kan gå till home