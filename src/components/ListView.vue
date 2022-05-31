<template>
  <router-link :to="{ name: 'PlaylistDetails', params: { id: playlist.id } }">
    <div v-if="playlist">

      <div class="single border border-blue-300 shadow rounded-md p-4 max-w-6xl w-full mx-auto  flex gap-5  h-30 justify-between">
        <div class="thumbnail rounded-full bg-slate-200 h-20 w-20 overflow-hidden">
          <img :src="playlist.coverUrl" />
        </div>
        <div class="info relative right-40">
          <h3>{{ playlist.title }}</h3>
          <p>Created by {{ playlist.username }}</p>
        </div>
        <div class="song-number">
          <p>{{ playlist.songs.length }}</p>
        </div>
      </div>
    </div>
    <div v-else>
      <Skeleton />
    </div>
  </router-link>

</template>

<script setup>
import { defineProps } from 'vue'
import { ref, provide } from 'vue'

const props = defineProps(['playlist'])
provide('playlist', props.playlist.id)

</script>

<style >

</style>