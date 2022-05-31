<template>
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
  </div>
</template>

<script setup>
import { inject } from 'vue'

const playlist = inject('playlist')
console.log('SongList.vue playlist:',playlist)
</script>

<style>
</style>