<template>
  <div class="playlist h-full flex-col gap-2">
    <!-- 导航栏 -->
    <Navbar />
    <!-- playlist -->
    <!-- <Suspense>
      <router-view />
    </Suspense> -->
    <RouterView v-slot="{ Component }">
      <template v-if="Component">
        <!-- <Transition mode="out-in"> -->
          <!-- 防止页面数据不更新,排除 PlaylistDetails组件 -->
          <KeepAlive exclude="PlaylistDetails">
            <Suspense>
              <!-- 主要内容 -->
              <component :is="Component"></component>

              <!-- 加载中状态 -->
              <template #fallback class="bg-black-500">
                <SkeletonUserPlaylistsVue/>
              </template>
            </Suspense>
          </KeepAlive>
        <!-- </Transition> -->
      </template>
    </RouterView>

  </div>

</template>
<script setup>
import Pagination from "../components/Pagination.vue";
import Navbar from "components/Navbar.vue";
import PlaylistDetails from "./playlists/PlaylistDetails.vue";
import UserPlaylists from "./playlists/UserPlaylists.vue";
import ProfileCard from 'views/ProfileCard.vue'
import ProfileCardSkeleton from "./ProfileCardSkeleton.vue";
import SkeletonUserPlaylistsVue from "components/SkeletonUserPlaylists.vue";

</script>
<style scoped>
</style>
