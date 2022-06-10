<template>
  <div class="song-list w-full">
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
          <tr class="hover">
            <th>{{ key + 1 }}</th>
            <td>{{ song.title }}</td>
            <th></th>
            <td>{{ song.artist }}</td>
            <td @click="handleClick(song.id)" class="flex justify-center"><div class="btn-normal border-0">删除</div></td>
          </tr>
        </tbody>
      </table>

      <loading v-if="isPending"></loading>

    </div>
  </div>
</template>

<script setup>

const playlist = $(inject('playlist'))

// const playlist = inject('playlist')

// console.log('playlist: ', playlist.value)


const { updateDoc, isPending } = useDocument()


const handleClick = async (songId) => {

  console.log('oldSongs', playlist.songs)
  const newSongs = playlist.songs.filter(x => x.id !== songId)
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
