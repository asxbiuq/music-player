<template>
    <div class="user-playlists w-screen flex flex-col gap-5 justify-center">
        <div v-if="playlists" class="flex flex-col gap-5">
            <div v-for="playlist in playlists" :key="playlist.id">
                <ListView :playlist="playlist"/>
            </div>
        </div>
        <div v-else class="flex flex-col gap-5">
            <div v-for="playlist in playlists" :key="playlist.id">
                <Skeleton/>
            </div>
        </div>
        <div class="flex justify-center relative top-40">
        <router-link :to="{ name: 'CreatePlaylist' }" class="btn btn-outline  max-w-xs bg-red-500">Create a new Playlist</router-link>

        </div>
    </div>

    
</template>

<script setup>
import Navbar from "../../components/Navbar.vue";
import Skeleton from "../../components/Skeleton.vue";
import getCollection from "composables/getCollection"
import getUser from "composables/getUser"
import ListView from "components/ListView.vue"
import { defineAsyncComponent } from 'vue'


const { user } = getUser()

const { documents: playlists } = getCollection(
    'playlists',
    ['userId', '==', user.value.uid]
)

// console.log(playlists)
const AsyncComp = defineAsyncComponent({
    // 加载函数
    loader: () => import('components/ListView.vue'),

    // 加载异步组件时使用的组件
    loadingComponent: Skeleton,
    // 展示加载组件前的延迟时间，默认为 200ms
    delay: 200,

    // 加载失败后展示的组件
    //   errorComponent: ErrorComponent,
    // 如果提供了一个 timeout 时间限制，并超时了
    // 也会显示这里配置的报错组件，默认值是：Infinity
    //   timeout: 3000
})
</script>

<style>
/* .btn {
    position: absolute;
    top: 80%;
    left: 70%;
    color: deeppink;
} */
</style>