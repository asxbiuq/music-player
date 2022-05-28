import { createRouter, createWebHistory } from 'vue-router'
import Home from 'views/Home.vue'
import Login from 'views/auth/Login.vue'
import Signup from 'views/auth/Signup.vue'
import CreatePlaylist from 'views/playlists/CreatePlaylist.vue'
import PlaylistDetails from 'views/playlists/PlaylistDetails.vue'
import UserPlaylists from 'views/playlists/UserPlaylists.vue'
import Auth from 'views/Auth.vue'
import PlayLists from 'views/PlayLists.vue'
// route guard
import { auth } from '../firebase/config'

const requireAuth = (to, from, next) => {
  let user = auth.currentUser
  if (!user) {
    next({ name: 'Login' })
  } else {
    next()
  }
}

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    beforeEnter: requireAuth
  },
  {
    path: '/playlists',
    name: 'PlayLists',
    component: PlayLists,
    beforeEnter: requireAuth,
    children: [
      {
        path: '/create',
        name: 'CreatePlaylist',
        component: CreatePlaylist,
        beforeEnter: requireAuth
      },
      {
        path: '/:id',
        name: 'PlaylistDetails',
        component: PlaylistDetails,
        beforeEnter: requireAuth,
        props: true
      },
      {
        path: '/user',
        name: 'UserPlaylists',
        component: UserPlaylists,
        beforeEnter: requireAuth
      },
    ]
  },
  {
    path: '/auth',
    name: 'Auth',
    component: Auth,
    beforeEnter: requireAuth,
    redirect: { name: 'Login' },
    children: [
      {
        path: '/login',
        name: 'Login',
        component: Login,
        beforeEnter: requireAuth
      },
      {
        path: '/signup',
        name: 'Signup',
        component: Signup,
        beforeEnter: requireAuth
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
