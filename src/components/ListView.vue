<template>
  <router-link :to="{ name: 'PlaylistDetails', params: { id: playlist.id } }" class="flex justify-center ">

    <div class="single border border-blue-300 shadow rounded-md p-4 max-w-6xl  flex gap-2 justify-between w-[90%] overflow-visible justify-content">
      
      <div class="thumbnail rounded-full bg-slate-200 h-[4rem] w-[4rem] overflow-hidden">
        <img :src="props.playlist.coverUrl" />
      </div>

      <div class="info">
        <h3>{{ playlist.title }}</h3>
        <p>Created by {{ playlist.username }}</p>
      </div>

      <div class="song-number">
        <p>{{ playlist.songs.length }}</p>
      </div>

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