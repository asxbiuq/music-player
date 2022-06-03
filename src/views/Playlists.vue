<template>
  <div class="playlist h-full flex-col gap-2">
    <!-- 导航栏 -->
    <Navbar />
    <!-- playlist -->
    <Suspense>
      <router-view />
    </Suspense>


  </div>

</template>
<script setup>
import Pagination from "../components/Pagination.vue";
import Navbar from "components/Navbar.vue";
import PlaylistDetails from "./playlists/PlaylistDetails.vue";
import UserPlaylists from "./playlists/UserPlaylists.vue";
import ProfileCard from 'views/ProfileCard.vue'
import ProfileCardSkeleton from "./ProfileCardSkeleton.vue";
</script>
<style scoped>
</style>
