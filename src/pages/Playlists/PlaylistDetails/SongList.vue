<template>
  <div class="song-list w-full">
    <div class="overflow-x-auto">
      <table class="table w-full">
        <thead>
          <tr>
            <th></th>
            <th>歌名</th>
            <th>歌手</th>
            <th>删除</th>
          </tr>
        </thead>
        <tbody v-for="(song,key) in playlist.songs" class="single-song" :key="song.id">
          <tr class="hover">
            <th>{{ key+1 }}</th>
            <td>{{ song.title }}</td>
            <td>{{ song.artist }}</td>
            <td @click="handleClick(song.id)">delete</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>

const playlist = $(inject('playlist'))

// const playlist = inject('playlist')

// console.log('playlist: ', playlist.value)


const { updateDoc } = useDocument()


const handleClick = async (songId) => {
  console.log('oldSongs',playlist.songs)
  const newSongs = playlist.songs.filter(x => x.id !== songId)
  console.log('newSongs',newSongs)
  // 更新本地数据
  playlist.songs = [...newSongs]
  // 更新云端数据
  await updateDoc(playlist.playlistId.toString(), {
        songs: [...newSongs]
    })
}
onBeforeUpdate(() => {
  let row = 1
});

</script>

<style>
</style>
