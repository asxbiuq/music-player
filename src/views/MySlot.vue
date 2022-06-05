//MySlot.vue
<!-- MySlot负责HTML抽象 mySlot负责style抽象 -->
<template>
  <mySlot>
    <template #default="{ playlist }">
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
  </mySlot>
</template>

<script setup>
import mySlot from 'components/slotTest.vue'
const props = defineProps({
  playlist: Object,
})

let row = 1
</script>

<style>
</style>