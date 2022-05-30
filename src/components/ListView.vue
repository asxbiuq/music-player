<template>
  <router-link :to="{ name: 'PlaylistDetails', params: { id: playlist.id } }">
    <div class="single border border-blue-300 shadow rounded-md p-4 max-w-6xl w-full mx-auto flex gap-5 h-30">
      <div class="thumbnail rounded-full bg-slate-200 h-20 w-20 overflow-hidden">
        <!-- <div class="h-40 w-40 object-center"> -->
          <img :src="playlist.coverUrl"  />
        <!-- </div> -->
        <!-- <img :src="playlist.coverUrl" class="object-cover"> -->
      </div>
      <div class="info">
        <h3>{{ playlist.title }}</h3>
        <p>Created by {{ playlist.username }}</p>
      </div>
      <div class="song-number absolute left-3/4">
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
/* .single:hover {
  box-shadow: 1px 2px 3px rgba(50, 50, 50, 0.05);
  transform: scale(1.02);
  transition: all ease 0.2s;
} */

/* .thumbnail {
  max-width: 100px;
  max-height: 100px;
  overflow: hidden;
  border-radius: 10px;
} */

/* img {
  max-width: 150%;
  max-height: 150%;
  display: block;
} */

/* .info {
  margin: 0 30px;
}

.song-number {
  margin-left: auto;
} */
</style>