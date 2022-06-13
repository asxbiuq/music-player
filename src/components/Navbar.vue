<template>
  <div class="navbar bg-base-300 flex justify-between">

    <div class="">
      <a class="btn-nar">
        
          <router-link :to="{ path: '/' }">音乐播放器</router-link>
        
      </a>
    </div>

        <div v-if="user">
          <button class="btn-nar">
            <router-link :to="{ name: 'Playlists-UserPlaylists' }">我的播放列表</router-link>
          </button>
          <button class="btn-nar" @click="handleConfirm">登出</button>
        </div>
        <div v-else class="flex">
          <router-link class="btn-nar" :to="{ name: 'Auth-Signup' }">注册</router-link>
          <router-link class="btn-nar" :to="{ name: 'Auth-Login' }">登录</router-link>
        </div>

  </div>
    <!-- modal-component-Teleport -->
  <confirm 
    @confirm="handleClick" 
    @cancel="isModelOpen = !isModelOpen" 
    text="是否登出?" 
    confirmBtnText="确认"
    :isModelOpen="isModelOpen" 
  />
</template>

<script setup>
const { isPending } = $(useIsPending())
const isModelOpen = $ref(false)
const { logout } = useLogout()
const router = useRouter()
// 不光是导入与导出,函数也一样,如果导出时有{},则导入时也要有{}
const { user } = getUser()

const handleClick = async () => {
  isPending = true
  isModelOpen = false
  await logout()
  console.log('user logged out')
  isPending = false
  router.push({ name: 'Auth-Login' })
}
const handleConfirm = () => {
  isModelOpen = true
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