<template>
    <div class="user-playlists w-full flex flex-col justify-between overflow-hidden h-fit items-center gap-2">
        <!-- PLAYLIST -->
        <div class="playlist-items flex flex-col gap-5 justify-center overflow-hidden">
            <!-- v-for 会循环产生与循环条件语句相同的盒子,所以子元素的大小在条件语句里设置 -->
            <div v-for="playlist in playlists" :key="playlist.id"
                class="playlist-item hover:scale-105 transition-all h-1/5 overflow-visible">
                <!-- <Suspense>组件需要配合异步函数使用 -->
                <!-- <Suspense>
                    <template #default> -->
                <ListView :playlist="playlist" />
                <!-- </template>
                    <template #fallback>
                        <Skeleton :playlist="playlist" />
                    </template>
                </Suspense> -->
            </div>
        </div>

        <!-- createPlaylistBtn -->
        <div class="createPlaylistBtn">
            <router-link :to="{ name: 'CreatePlaylist' }" class="btn max-w-xs bg-red-500">Create a new
                Playlist</router-link>
        </div>

        <!-- 翻页按钮 -->
        <div class="w-1/2 ">

            <Pagination 
                @PagePre="handlePagePre" 
                @PageNext="handlePageNext"
            />
        </div>

    </div>
</template>

<script setup>
import Navbar from "components/Navbar.vue";
import Skeleton from "components/Skeleton.vue";
import getCollection from "composables/getCollection"
import getUser from "composables/getUser"
import ListView from "components/ListView.vue"
import Pagination from "components/Pagination.vue";
import { computed, provide } from "@vue/runtime-core";


const { user } = getUser()
// 初始化页数，默认为1
let pageIndex = $ref(1)
provide('pageIndex',pageIndex)

const { documents: playlists } = getCollection(
    'playlists',
    ['userId', '==', user.value.uid]
)


let CurrentPage = computed(()=> {
    return pageIndex
})

</script>

<style>
</style>