import { createRouter, createWebHistory } from 'vue-router'
import Home from 'views/Home.vue'
import Login from 'views/auth/Login.vue'
import Signup from 'views/auth/Signup.vue'
import CreatePlaylist from 'views/playlists/CreatePlaylist.vue'
import PlaylistDetails from 'views/playlists/PlaylistDetails.vue'
import UserPlaylists from 'views/playlists/UserPlaylists.vue'
import Auth from 'views/Auth.vue'
import PlayLists from 'views/PlayLists.vue'
import { auth } from '@/firebase/config'
import AddSong from 'components/AddSong.vue'



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
  },
  {
    path: '/auth',
    name: 'Auth',
    component: Auth,
    redirect: { name: 'Login' },
    children: [
      {
        path: '/login',
        name: 'Login',
        component: Login,
      },
      {
        path: '/signup',
        name: 'Signup',
        component: Signup,
      },
    ],
  },
  {
    path: '/playlists',
    name: 'PlayLists',
    component: PlayLists,
    beforeEnter: requireAuth,
    redirect: { name: 'UserPlaylists' },
    children: [ 
      //子路由create 如果携程/create ,则代表到根路径的create ,而不是/playlists/create
      {
        path: 'create',
        name: 'CreatePlaylist',
        component: CreatePlaylist,
        beforeEnter: requireAuth
      },
      {
        path: ':id',
        name: 'PlaylistDetails',
        component: PlaylistDetails,
        beforeEnter: requireAuth,
        props: true,
        children: [
          {
            path: 'addsong',
            name: 'AddSong',
            component: AddSong,
            beforeEnter: requireAuth
          },
          {
            path: 'create',
            name: 'CreatePlaylist',
            component: CreatePlaylist,
            beforeEnter: requireAuth
          },
        ]
      },
      {
        path: 'user',
        name: 'UserPlaylists',
        component: UserPlaylists,
        beforeEnter: requireAuth
      },
    ]
  },

]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
