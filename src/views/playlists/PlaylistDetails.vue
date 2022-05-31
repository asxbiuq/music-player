<template>
  <div v-if="error" class="error">{{ error }}</div>

  <div v-if="playlist" class="shell">

    <div class="playlist-info flex flex-col items-center">
      <div class="hero min-h-full bg-base-200">
        <div class="hero-content flex flex-col p-10">
          <!-- 用一个容器来占位,防止页面抖动 -->
          <div class="w-72 h-80 overflow-hidden">
            <img :src="playlist.coverUrl" class=" rounded-xl shadow-2xl " />
          </div>
          <div class="flex flex-col items-center">
            <h1 class="text-5xl font-bold">{{ playlist.title }}</h1>
            <p class="py-6">{{ playlist.description }}</p>
            <div class="flex gap-4">
              <button class=" bg-red-500 btn" v-if="ownership" @click="handleDelete">Delete Playlist</button>
              <button @click="handleAddSong" class="btn bg-red-500">Add Song</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="song-list w-full  ">
      <div class="overflow-x-auto">
        <table class="table w-full">
          <thead>
            <tr>
              <th></th>
              <th>歌名</th>
              <th>歌手</th>
              <th>是否收藏</th>
            </tr>
          </thead>

          <tbody v-for="song in playlist.songs" class="single-song" :key="song.id">
            <tr class="hover">
              <th>{{ row++ }}</th>
              <td>{{ song.title }}</td>
              <td>{{ song.artist }}</td>
              <td v-if="ownership" @click="handleClick(song.id)">delete</td>
            </tr>
          </tbody>
        </table>
      </div>

      <AddSong v-if="ownership" :playlist="playlist"  />

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
import { ref } from '@vue/reactivity'

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
  router.push({ name: 'AddSong' })
}

</script>

<style scoped>
.shell {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 0fr;
  gap: 0px 3rem;
  grid-auto-flow: row;
  grid-template-areas:
    "playlist-info song-list song-list"
    "playlist-info song-list song-list"
    /* ". . ."; */
}

.playlist-info {
  grid-area: playlist-info;
}

.song-list {
  grid-area: song-list;
}
</style>