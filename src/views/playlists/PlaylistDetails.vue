<template>
  <div v-if="error" class="error">{{ error }}</div>
  <div v-if="playlist" class="playlist-details">

    <!-- playlist information -->
    <div class="playlist-info">
      <div class="cover">
        <img :src="playlist.coverUrl">
      </div>
      <h2>{{ playlist.title }}</h2>
      <p class="username">Created by {{ playlist.userName }}</p>
      <p class="description">{{ playlist.description }}</p>
      <button v-if="ownership" @click="handleDelete">Delete Playlist</button>
    </div>

    <!-- song list -->
    <div class="song-list">
      <div v-if="!playlist.songs.length">No songs have been added to playlist yet</div>
      <div v-for="song in playlist.songs" class="single-song" :key="song.id">
        <div class="details">
          <h3>{{ song.title }}</h3>
          <p>{{ song.artist }}</p>
        </div>
        <button v-if="ownership" @click="handleClick(song.id)">delete</button>
      </div>
      <AddSong v-if="ownership" :playlist="playlist" />
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
  id: String
})

const playlist = ref('')
const { user } = getUser()
const { error, deleteDoc, updateDoc, getDocData } = useDocument('playlists', props.id)
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
  await deleteImage(playlist.value.filePath)
  // 这里不用传参, 因为调用 useDocument() 时已经传参,并生成 docRef 对象了
  await deleteDoc()
  router.push({ name: 'Home' })
}

const handleClick = async (id) => {
  const songs = playlist.value.songs.filter((song) => song.id != id)
  // 简写
  await updateDoc({ songs })
}


</script>

<style>
.playlist-details {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 80px;
}

.cover {
  overflow: hidden;
  border-radius: 20px;
  position: relative;
  padding: 160px;
}

.cover img {
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  min-width: 100%;
  min-height: 100%;
  max-width: 200%;
  max-height: 200%;
}

.playlist-info {
  text-align: center;
}

.playlist-info h2 {
  text-transform: capitalize;
  font-size: 28px;
  margin-top: 20px;
}

.playlist-info p {
  margin-bottom: 20px;
}

.username {
  color: #999;
}

.description {
  text-align: left;
}

.single-song {
  padding: 10px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px dashed var(--secondary);
  margin-bottom: 20px;
}
</style>