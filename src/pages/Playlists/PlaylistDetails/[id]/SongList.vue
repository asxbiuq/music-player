<template>
  <div class="song-list w-full flex justify-between flex-col">
    <div class="overflow-x-auto">
      <table class="table w-full">
        <thead>
          <tr>
            <th></th>
            <th>歌名</th>
            <th></th>
            <th>歌手</th>
            <th></th>
          </tr>
        </thead>

        <tbody v-for="(song, key) in playlist.songs" class="single-song " :key="song.id">
          <tr class="hover" @dblclick="getMusicURL(song.id)">
            <th>{{ key + 1 }}</th>
            <td>{{ song.title }}</td>
            <th></th>
            <td>{{ song.artist }}</td>
            <td @click="confirmDelete(song.id)" class="flex justify-center">
              <div class="btn-normal border-0">删除</div>
            </td>
          </tr>
        </tbody>
      </table>



    </div>

    <audio ref="audioPlayer" :src="url" controls id="bgMusic" @canplay="canplay" class="w-full"
      @ended="next"></audio>

    <confirm @confirm="handleDelete" @cancel="isModelOpen = !isModelOpen" text="是否删除该歌曲" confirmBtnText="确认"
      :isModelOpen="isModelOpen" />

    <loading v-if="audioIsPending"></loading>

  </div>
</template>

<script setup>
const playlist = $(inject('playlist'))
const confirmedSongId = $ref(null)
const isModelOpen = $ref(false)
const audioPlayer = ref()
const url = $ref('')
const audioIsPending = $ref(false)
const curSongIndex = $ref(0)
const { updateDoc } = useDocument()


// watchEffect(()=>{
//   console.log('curSongIndex: ',curSongIndex)
// })

const getMusicURL =  (songId) => {
  curSongIndex = playlist.songs.findIndex(song => song.id === songId)
  url = playlist.songs[curSongIndex].musicUrl
  console.log('getMusicURL: ',url)
}
const canplay = () => {
  audioIsPending = false
  audioPlayer.value.play()
}
const next = () => {
  curSongIndex ++
  if(curSongIndex >= playlist.songs.length){
    curSongIndex = 0
  }
  url = playlist.songs[curSongIndex].musicUrl
  console.log('play next, curSongIndex: ',curSongIndex)
}

watch($$(curSongIndex),()=>{
  console.log('curSongIndex: ',curSongIndex)
})




const confirmDelete = (songId) => {
  isModelOpen = true
  confirmedSongId = songId
}
const handleDelete = async () => {
  isModelOpen = false
  console.log('oldSongs', playlist.songs)
  const newSongs = playlist.songs.filter(x => x.id !== confirmedSongId)
  console.log('newSongs', newSongs)
  // 更新本地数据
  playlist.songs = [...newSongs]
  // 更新云端数据
  await updateDoc(playlist.playlistId.toString(), {
    songs: [...newSongs]
  })
}



</script>

<style>
</style>
