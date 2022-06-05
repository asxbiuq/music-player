<template>
  <div class="navbar bg-base-300 ">
    <div class="flex-none bg-base-300">
      <!-- <button class="btn-nar bg-base-300">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
          class="inline-block w-5 h-5 stroke-current">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
        </svg>
      </button> -->
    </div>
    <div class="flex-1">
      <a class="btn-nar">
        
          <router-link :to="{ name: 'Home' }">Music-Posts</router-link>
        
      </a>
    </div>
    <div class="flex-none">
      <div class="btn-group">
        <div v-if="user">
          <button class="btn-nar">
            <router-link :to="{ name: 'UserPlaylists' }">My Playlists</router-link>
          </button>
          <button class="btn-nar" @click="handleClick">Logout</button>
        </div>
        <div v-else>
          <router-link class="btn-nar" :to="{ name: 'Signup' }">Signup</router-link>
          <router-link class="btn-nar" :to="{ name: 'Login' }">Login</router-link>
        </div>
      </div>
      <!-- <button class="btn-nar">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
          class="inline-block w-5 h-5 stroke-current">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z">
          </path>
        </svg>
      </button> -->
    </div>
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
*{
  overflow: visible;
}
</style>