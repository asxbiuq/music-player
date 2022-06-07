import { createRouter, createWebHistory } from 'vue-router'
import { auth } from '@/firebase/config'
import routes from '~pages'


const requireAuth = (to, from, next) => {
  let user = auth.currentUser
  if (!user) {
    next({ name: 'Login' })
  } else {
    next()
  }
}

// const routes = [
//   {
//     path: '/',
//     name: 'Home',
//     component: () => import('views/Home.vue'),
//   },
//   {
//     path: '/auth',
//     name: 'Auth',
//     component: () => import('views/Auth.vue'),
//     redirect: { name: 'Login' },
//     children: [
//       {
//         path: '/login',
//         name: 'Login',
//         component: () => import('views/auth/Login.vue'),
//       },
//       {
//         path: '/signup',
//         name: 'Signup',
//         component: () => import('views/auth/Signup.vue'),
//       },
//     ],
//   },
//   {
//     path: '/playlists',
//     name: 'PlayLists',
//     component: () => import('views/PlayLists.vue'),
//     beforeEnter: requireAuth,
//     redirect: { name: 'UserPlaylists' },
//     children: [ 
//       //子路由create 如果携程/create ,则代表到根路径的create ,而不是/playlists/create
//       {
//         path: 'create',
//         name: 'CreatePlaylist',
//         component: () => import('views/playlists/CreatePlaylist.vue'),
//         beforeEnter: requireAuth
//       },
//       {
//         path: ':id',
//         name: 'PlaylistDetails',
//         component: () => import('views/playlists/PlaylistDetails.vue'),
//         beforeEnter: requireAuth,
//         props: true,
//         redirect: { name: 'SongList' },
//         children: [
//           {
//             path: 'addsong',
//             name: 'AddSong',
//             component: () => import('components/AddSong.vue'),
//             beforeEnter: requireAuth
//           },
//           {
//             path: 'songlist',
//             name: 'SongList',
//             component: () => import('components/SongList.vue'),
//             beforeEnter: requireAuth
//           },
//         ]
//       },
//       {
//         path: 'user',
//         name: 'UserPlaylists',
//         component: () => import('views/playlists/UserPlaylists.vue'),
//         beforeEnter: requireAuth
//       },
//     ]
//   },

// ]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
