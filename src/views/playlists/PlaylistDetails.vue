<template>
  <div v-if="error" class="error">{{ error }}</div>

  <div v-if="playlist" class="shell ">

    <div class="playlist-info flex flex-col items-center">
      <div class="hero min-h-full bg-base-200">
        <div class="hero-content flex flex-col p-10">
          <!-- 用一个容器来占位,防止页面抖动 -->
          <div class="w-72 h-80">
            <img :src="playlist.coverUrl" class=" rounded-xl shadow-2xl " />
          </div>
          <div>
            <h1 class="text-5xl font-bold">{{ playlist.title }}</h1>
            <p class="py-6">{{ playlist.description }}</p>
            <button class="btn-primary" v-if="ownership" @click="handleDelete">Delete Playlist</button>
          </div>
        </div>
      </div>
    </div>

    <div class="song-list">
      <div v-if="!playlist.songs.length">歌单为空</div>
      <div v-else class="w-full">
        <div class="overflow-x-auto">
          <table class="table w-full">
            <!-- head -->
            <thead>
              <tr>
                <th></th>
                <th>歌名</th>
                <th>歌手</th>
                <th>是否收藏</th>
              </tr>
            </thead>
            <tbody>
              <!-- row 1 -->
              <!-- <div v-for="song in playlist.songs" class="single-song " :key="song.id">
              <tr class="hover">
                <th>1</th>
                <td>{{ song.title }}</td>
                <td>{{ song.artist }}</td>
                <td v-if="ownership" @click="handleClick(song.id)">delete</td>
              </tr>
            </div> -->
              <!-- row 2 -->
              <tr class="hover">
                <th>2</th>
                <td>Hart Hagerty</td>
                <td>Desktop Support Technician</td>
                <td>Purple</td>
              </tr>
              <!-- row 3 -->
              <tr class="hover">
                <th>3</th>
                <td>Brice Swyre</td>
                <td>Tax Accountant</td>
                <td>Red</td>
              </tr>
            </tbody>
          </table>
        </div>
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
  id: String,
})

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

/* .playlist-details {
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
} */
</style>