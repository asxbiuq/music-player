<template>
  <div>

    <div v-if="error" class="error">{{ error }}</div>

    <div v-if="playlist">

      <div class="playlistdetails-container">

        <div class="playlist-info">
          <div class="left flex flex-col items-center ">
            <div class="hero min-h-full bg-base-200 rounded-xl">
              <div class="hero-content flex flex-col overflow-hidden w-full">
                <!-- 用一个容器来占位,防止页面抖动 -->
                <div class="w-full h-[50vh] overflow-hidden">
                  <img :src="playlist.coverUrl" class=" shadow-2xl object-center" />
                </div>
                <div class="flex flex-col items-center w-72 ">
                  <h1 class="text-5xl font-bold overflow-visible">{{ playlist.title }}</h1>
                  <div class="overflow-hidden">

                    <p class="py-6">{{ playlist.description }}</p>
                  </div>
                  <div class="doubleBtn">

                    <button class=" bg-red-500 btn" @click="confirmDelete">Delete Playlist</button>


                    <div v-if="!isAddSong">
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

        </div>



        <router-view class="right songlist-songadd" @addedSong="isAddSong = !isAddSong" />


      </div>

    </div>


    <div v-else>
      <SkeletonPlayDetails />
    </div>

  </div>
  <!-- modal-component-Teleport -->
  <confirm @confirm="handleDelete" @cancel="isModelOpen = !isModelOpen" text="是否删除播放列表" confirmBtnText="确认"
    :isModelOpen="isModelOpen" />

</template>

<route lang="yaml">
{
  meta: {
    layout: "playlistDetail",
  }
}
</route>

<script setup>

const isModelOpen = $ref(false)
const isAddSong = $ref(false)
let row = 1
const playlist = $ref('')
const { user } = $(getUser())
const props = defineProps({
  id: String,
})


console.log(props.id)

const { error, deleteDoc, updateDoc, getDocData,isPending } = $(useDocument('playlists', props.id))//这里的id是playlistId
const { deleteImage } = $(useStorage())

const getPlaylist = (async () => {
  const { docData } = $(await getDocData())
  playlist = reactive({ ...docData })
  console.log(playlist)
})()


const router = useRouter()

// 判断当前用户是否有播放列表的权限
const ownership = $computed(() => {
  return playlist && user && user.uid == playlist.userId
})
const confirmDelete = () => {
  isModelOpen = true
}
const handleDelete = async () => {
  isModelOpen = false
  isPending = true
  console.log(playlist.filePath)
  await deleteImage(playlist.filePath)
  // 这里不用传参, 因为调用 useDocument() 时已经传参,并生成 docRef 对象了
  await deleteDoc()
  isPending = false
  router.push({ name: 'Playlists-UserPlaylists' })
}

const handleClick = async (id) => {
  const songs = $(playlist.songs.filter((song) => song.id != id))
  // 简写
  await updateDoc({ songs })
}
const handleAddSong = () => {
  isAddSong = !isAddSong
  router.push({ name: 'Playlists-PlaylistDetails-id-AddSong' })
}
const handleSongList = () => {
  isAddSong = !isAddSong
  router.push({ name: 'Playlists-PlaylistDetails-id-SongList' })
}

provide('playlist', $$(playlist))
</script>

<style scoped>
.playlistdetails-container {
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
  height: 78.5vh;
  overflow: auto;
}

.doubleBtn {
  display: flex;
  width: 100%;
  justify-content: space-between;
}

@media screen and (max-width: 900px) {
  .playlistdetails-container {
    display: grid;
    grid-template-columns: 0.7fr 0.7fr 1.1fr;
    grid-template-rows: 0fr 2.4fr 0.4fr;
    gap: 1em 0em;
    grid-auto-flow: row;
    grid-template-areas:
      "playlist-info playlist-info playlist-info"
      "songlist-songadd songlist-songadd songlist-songadd"
      ". . .";
  }

  .playlist-info {
    grid-area: playlist-info;
  }

  .songlist-songadd {
    grid-area: songlist-songadd;

  }

  .hero-content {
    padding: 1rem;
  }

  .right {
    overflow: visible;
  }

  img {
    width: 100%;
    object-position: center;
  }
}
</style>