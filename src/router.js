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
      path: '/adminlogin',
      name: 'adminlogin',
      component: () => import('./views/AdminLogin.vue')
    },
    {
      path: '*',
      name: 'homepage',
      component: () => import('./views/Home.vue')
    },
    {
      path: '/home',
      name: 'homepaged',
      component: () => import('./views/Home.vue')
    },
    {
      path: '/loading',
      name: 'loading',
      component: () => import('./views/Loading.vue')
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
      /* meta: {requiresAuth: true}, */
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
            path: '/gamegroup',
            name: 'gamegroup',
            component: () => import('./components/HighScore/GameGroup.vue')
          },
          {
            path: '/highscore',
            name: 'highscore',
            component: () => import('./components/HighScore/HighScore.vue')
          },
        ]
      },
    {
      path: '/calender',
      name: 'calender',
      component: () => import('./components/HighScore/Calender.vue') 
    },
    {
      path: '/admin',
      name: 'admin',
      /* meta: {requiresAuth: true, requiresAdmin: true}, */
      component: () => import('./views/Admin/Admin.vue')
    },    
    {
      path: '/addplayer',
      name: 'addplayer',
      /* meta: {requiresAuth: true, requiresAdmin: true}, */
      component: () => import('./views/Admin/AddPlayer.vue')
    },
    {
      path: '/editplayer/:uid',
      name: 'editplayer',
      /* meta: {requiresAuth: true, requiresAdmin: true}, */
      component: () => import('./views/Admin/EditPlayer.vue') 
    },
    {
      path: '/groups',
      name: 'groups',
     /*  meta: {requiresAuth: true}, */
      component: () => import('./views/Admin/Groups.vue')
    },
    {
      path: '/editgroups/:id',
      name: 'editgroups',
      component: () => import('./views/Admin/EditGroups.vue')
    },
    {
      path: '/makegames',
      name: 'makegames',
     /*  meta: {requiresAuth: true, requiresAdmin: true}, */
      component: () => import('./views/Admin/MakeGames.vue'),
      children: [
        {
          path: '/choosegame',
          name: 'choosegame',
          component: () => import('./components/Admin/ChooseGame.vue'),
          children: [
            {
              path: '/choosewin',
              name: 'choosewin',
              component: () => import('./components/Admin/ChooseWin.vue'),
              children: [
                {
                  path: '/chooseloss',
                  name: 'chooseloss',
                  component: () => import('./components/Admin/ChooseLoss.vue'),
                  children: [
                    {
                    path: '/chooseequal',
                    name: 'chooseequal',
                    component: () => import('./components/Admin/ChooseEqual.vue')

                    }
                  ]
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
      /* meta: {requiresAuth: true, requiresAdmin: true}, */
      component: () => import('./views/Admin/Players.vue')
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