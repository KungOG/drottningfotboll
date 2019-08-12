import Vue from 'vue'
import Router from 'vue-router'
import index from './store/'
import firebase from 'firebase'
import db from '@/firebaseInit'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: () => import('./views/Home.vue')
    },
    {
      path: '*',
      component: () => import('./views/Home.vue')
    },
    {
      path: '/home',
      component: () => import('./views/Home.vue')
    },
    {
      path: '/adminlogin',
      name: 'adminlogin',
      component: () => import('./views/AdminLogin.vue')
    },
    {
      path: '/loading',
      name: 'loading',
      component: () => import('./views/Loading.vue')
    },
    {
      path: '/addname',
      name: 'addname',
      meta: {requiresAuth: true},
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
      path: '/calendar',
      name: 'calendar',
      component: () => import('./components/HighScore/Calendar.vue') 
    },
    {
      path: '/admin',
      name: 'admin',
      meta: {requiresAdmin: true},
      component: () => import('./views/Admin/Admin.vue')
    },    
    {
      path: '/addplayer',
      name: 'addplayer',
      meta: {requiresAdmin: true},
      component: () => import('./views/Admin/AddPlayer.vue')
    },
    {
      path: '/editplayer/:uid',
      name: 'editplayer',
      meta: {requiresAdmin: true},
      component: () => import('./views/Admin/EditPlayer.vue')
    },
    {
      path: '/groups',
      name: 'groups',
      meta: {requiresAdmin: true},
      component: () => import('./views/Admin/Groups.vue')
    },
    {
      path: '/editgroups/:id',
      name: 'editgroups',
      meta: {requiresAdmin: true},
      component: () => import('./views/Admin/EditGroups.vue')
    },
    {
      path: '/makegames',
      name: 'makegames',
      meta: {requiresAdmin: true},
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
      meta: {requiresAdmin: true},
      component: () => import('./views/Admin/MakeGroups.vue')
    },
    {
      path: '/players',
      name: 'players',
      meta: {requiresAdmin: true},
      component: () => import('./views/Admin/Players.vue')
    },
    {
      path: '/schedules',
      name: 'schedules',
      meta: {requiresAdmin: true},
      component: () => import('./views/Admin/Schedules.vue')
    },
    {
      path: '/goalboard',
      name: 'goalboard',
      meta: {requiresAdmin: true},
      component: () => import('./views/Admin/GoalBoard.vue')
    },
    {
      path: '/superadmin',
      name: 'superadmin',
      meta: {requiresSuperAdmin: true},
      component: () => import('./views/SuperAdmin.vue')
    },
    {
      path: '/loginsuperadmin',
      name: 'loginsuperadmin',
      component: () => import('./views/LoginSuperAdmin.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
  var routerUserCheck = index.state.currentUser;
  var routerAdminCheck = index.state.adminUser;
  var routerSuperAdminCheck = index.state.superAdminUser;
  
  if (routerUserCheck === null && routerAdminCheck === null && routerSuperAdminCheck === null && firebase.auth().currentUser) {
    checkUser();
  } else {
    checkPermission()
  }
  async function checkUser () {
        var allAdminUsers = [];
        var allUsers = [];
        var allSuperAdmins = [];
        
        var adminItems = db.collection('admins');
        await adminItems.get().then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            allAdminUsers.push(doc.id)
          })
        })
        var items = db.collection('users');
        await items.get().then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            allUsers.push(doc.id)
          })
        })
        var superAdminItems = db.collection('superAdmin');
        await superAdminItems.get().then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            allSuperAdmins.push(doc.id)
          })
        })
        
        var user = allUsers.indexOf(firebase.auth().currentUser.uid)
        var adminUser = allAdminUsers.indexOf(firebase.auth().currentUser.uid)
        var superAdmin = allSuperAdmins.indexOf(firebase.auth().currentUser.uid)
    
        if (user !== -1) {
          index.dispatch('setCurrentUser', firebase.auth().currentUser)
          routerUserCheck = firebase.auth().currentUser;
          if (index.state.loginNumber === 1) {
            next('/addName');
          } else if(index.state.loginNumber === 0) {
            next('/playerinfo');
          }
        } else if (adminUser !== -1) {
          index.dispatch('setAdminUser', firebase.auth().currentUser)
          routerAdminCheck = firebase.auth().currentUser;
          next('/admin');
          
        } else if (superAdmin !== -1) {
          index.dispatch('setSuperAdmin', firebase.auth().currentUser)
          routerSuperAdminCheck = firebase.auth().currentUser;
          next('/superadmin');
        }
      }
       
  function checkPermission () {
    if (to.matched.some(record => record.meta.requiresAuth)) {
      if (routerUserCheck) {
        next();      
      }
     } else if (to.matched.some(record => record.meta.requiresAdmin)) {
      if (routerAdminCheck) {
        next();      
      }
    } else if (to.matched.some(record => record.meta.requiresSuperAdmin)) {
      if (routerSuperAdminCheck) {
        next();      
      } 
    } else {
        next()
    }
  }
});

export default router;