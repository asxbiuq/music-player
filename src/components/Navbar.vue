<template>
  <div class="navbar bg-base-300 flex justify-between">

    <div class="">
      <a class="btn-nar">
        
          <router-link :to="{ name: 'Home' }">Music-Posts</router-link>
        
      </a>
    </div>

        <div v-if="user">
          <button class="btn-nar">
            <router-link :to="{ name: 'UserPlaylists' }">My Playlists</router-link>
          </button>
          <button class="btn-nar" @click="handleClick">Logout</button>
        </div>
        <div v-else class="flex">
          <router-link class="btn-nar" :to="{ name: 'Signup' }">Signup</router-link>
          <router-link class="btn-nar" :to="{ name: 'Login' }">Login</router-link>
        </div>

  </div>
</template>

<script setup>



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
  text-overflow:ellipsis;
  overflow:hidden;
  white-space:nowrap;
}
.btn-nar {
  /* font-size: 2vw; */
  font-size: 100%;
  flex-shrink:1
}
</style>