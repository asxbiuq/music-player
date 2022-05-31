<template>
  <div class="flex justify-center flex-col items-center w-screen gap-10 ">
    <Navbar />

    <router-view v-slot="{ Component }">
      <transition name="slide" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>

  </div>
</template>
<script setup>
import Navbar from "components/Navbar.vue";
import PlaylistDetails from "./playlists/PlaylistDetails.vue";
import UserPlaylists from "./playlists/UserPlaylists.vue";
</script>
<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.4s ease-out;
}
.slide-enter {
  transform: translateX(-30%);
}
.slide-leave-to {
  transform: translateX(30%);
}
</style>
