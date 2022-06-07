<template>
  <div class="song-list w-full">
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
            <td @click="handleClick(song.id)">delete</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>


let row = 1
const playlist = inject('playlist')

// const playlist = inject('playlist')

// console.log('playlist: ', playlist.value)
</script>

<style>
</style>
