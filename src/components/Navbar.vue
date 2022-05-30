<template>
  <div class="navbar">
    <nav class="">
      
      <div class="avatar">
        <div class="h-20 w-20 rounded-full overflow-hidden">
          <img src="@\assets\20220415_212741.jpg" />
        </div>
      </div>


      <h1>
        <router-link :to="{ name: 'Home' }">Music-Posts</router-link>
      </h1>
      <div class="links">
        <div v-if="user">
          <router-link :to="{ name: 'CreatePlaylist' }">Create Playlist</router-link>
          <router-link :to="{ name: 'UserPlaylists' }">My Playlists</router-link>
          <span>Hi here, {{ user.displayName }}</span>
          <button @click="handleClick">Logout</button>
        </div>
        <div v-else>
          <router-link class="btn" :to="{ name: 'Signup' }">Signup</router-link>
          <router-link class="btn" :to="{ name: 'Login' }">Login</router-link>
        </div>
      </div>
    </nav>
  </div>
</template>

<script setup>
import useLogout from "composables/useLogout"
import { useRouter } from "vue-router"
import getUser from "composables/getUser"


const { logout } = useLogout()
const router = useRouter()
// 不光是导入与导出,函数也一样,如果导出时有{},则导入时也要有{}
const { user } = getUser()

const handleClick = async () => {
  await logout()
  console.log('user logged out')
  router.push({ name: 'Login' })
}

</script>

<style scoped>
/* .navbar {
  padding: 16px 10px;
  margin-bottom: 10px;
  background: white;
  width: 100vw;
} */

/* nav {
  display: flex;
  align-items: center;
  margin: 0 auto;
  padding:  0 2rem;
  gap: 1rem;
} */

/* nav img {
   max-height: 60px; 
} */

/* nav h1 {
  margin-left: 20px;
} */

/* nav .links {
  margin-left: auto;
} */

/* nav .links a,
button {
  margin-left: 16px;
  font-size: 14px;
} */

/* span {
  font-size: 14px;
  display: inline-block;
  margin-left: 16px;
  padding-left: 16px;
  border-left: 1px solid #eee;
} */
</style>