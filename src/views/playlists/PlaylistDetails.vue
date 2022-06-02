<template>
  <div>

    <div v-if="error" class="error">{{ error }}</div>

    <div v-if="playlist" class="shell">

      <div class="left flex flex-col items-center">
        <div class="hero min-h-full bg-base-200">
          <div class="hero-content flex flex-col p-10">
            <!-- 用一个容器来占位,防止页面抖动 -->
            <div class="w-72 h-80 overflow-hidden">
              <img :src="playlist.coverUrl" class=" shadow-2xl " />
            </div>
            <div class="flex flex-col items-center w-72 ">
              <h1 class="text-5xl font-bold overflow-visible">{{ playlist.title }}</h1>
              <p class="py-6">{{ playlist.description }}</p>
              <div class="doubleBtn">
              
                  <button class=" bg-red-500 btn" @click="handleDelete">Delete Playlist</button>
  
            
                  <div v-if="!isAddSong" >
                    <button @click="handleAddSong" class="btn bg-red-500">Add Song</button>
                  </div>
                  <div v-else>
                    <button @click="handleSongList" class="btn bg-red-500">Song List</button>
                  </div>
              
              </div>
            </div>
          </div>
        </div>
      </div>

      <router-view class="right" />

    </div>
  </div>
</template>

<script setup>
import useStorage from "composables/useStorage"
import useDocument from "composables/useDocument"
import getUser from 'composables/getUser'
import { computed } from '@vue/runtime-core'
import { useRouter } from "vue-router"
import AddSong from "components/AddSong.vue"
import SongList from "components/SongList.vue"
import { ref, provide } from 'vue'
import { watchEffect } from "vue";

const isAddSong = ref(false)

const props = defineProps({
  id: String,
})
let row = 1
const playlist = ref('')
const { user } = getUser()
const { error, deleteDoc, updateDoc, getDocData } = useDocument('playlists', props.id)//这里的id是playlistId
const { deleteImage } = useStorage()

const getPlaylist = (async () => {
  const { docData } = await getDocData()
  playlist.value = docData.value

})()
// console.log(playlist.value.title)



const router = useRouter()

// 判断当前用户是否有播放列表的权限
const ownership = computed(() => {
  return playlist.value && user.value && user.value.uid == playlist.value.userId
})

const handleDelete = async () => {
  console.log(playlist.value.filePath)
  await deleteImage(playlist.value.filePath)
  // 这里不用传参, 因为调用 useDocument() 时已经传参,并生成 docRef 对象了
  await deleteDoc()
  router.push({ name: 'UserPlaylists' })
}

const handleClick = async (id) => {
  const songs = playlist.value.songs.filter((song) => song.id != id)
  // 简写
  await updateDoc({ songs })
}
const handleAddSong = () => {
  isAddSong.value = !isAddSong.value
  router.push({ name: 'AddSong' })
}
const handleSongList = () => {
  isAddSong.value = !isAddSong.value
  router.push({ name: 'SongList' })
}

provide('playlist', playlist)
</script>

<style scoped>
.shell {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 0fr;
  gap: 0px 3rem;
  grid-auto-flow: row;
  grid-template-areas:
    "left right right"
    "left right right"
    /* ". . ."; */
}

.left {
  grid-area: left;
}

.right {
  grid-area: right;
}
.doubleBtn {
  display: flex;
  width: 100%;
  justify-content: space-between;
}
</style>