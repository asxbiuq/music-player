<template>
    <div class="user-playlists w-full flex flex-col justify-between overflow-hidden h-fit items-center gap-2">
        <!-- PLAYLIST -->
        <div class="playlist-items flex flex-col gap-5 justify-center overflow-hidden w-[90%]">
            <!-- v-for 会循环产生与循环条件语句相同的盒子,所以子元素的大小在条件语句里设置 -->
            <div v-for="playlist in showList" :key="playlist.id"
                class="playlist-item hover:scale-105 transition-all h-[15%] overflow-visible">
                <ListView :playlist="playlist" />
            </div>
        </div>

        <!-- createPlaylistBtn -->
        <div class="createPlaylistBtn overflow-visible">
            <router-link :to="{ name: 'CreatePlaylist' }" class="btn  bg-red-500">Create a new
                Playlist</router-link>
        </div>

        <!-- 翻页按钮 -->
        <div class="w-1/2 overflow-visible">
            <Pagination @PagePre="handlePagePre" @PageNext="handlePageNext" />
        </div>

    </div>
</template>

<script setup>
import { computed } from "vue";
import Navbar from "components/Navbar.vue";
import Skeleton from "components/Skeleton.vue";
import getUser from "composables/getUser"
import ListView from "components/ListView.vue"
import Pagination from "components/Pagination.vue";
import { reactive } from 'vue'
import { db } from "../../firebase/config";
import { collection, query, where, getDocs } from "firebase/firestore";
import getDoc from 'composables/getDoc'

const { user } = getUser()

// 获取数据
// 这里要await,不然会报错 getDoc是一个用async声明的异步函数
const { data : playlists, error } = await getDoc('playlists', ['userId', '==', user.value.uid])
console.log(playlists)
// console.log(data,error)


// 初始化页数，默认为1
let pageIndex = $ref(1)

// 展示页的数据
const showList = computed(() => {
    return playlists.slice(pageIndex - 1, pageIndex - 4)
})

const maxPageNum = computed(() => {
    return Math.ceil(playlists.length / 5)
})


const handlePageChange = (pageIndex) => {
    console.log('CurrentPage:', pageIndex)
}

const handlePageNext = () => {
    if (pageIndex >= maxPageNum.value) {
        console.log('The last page!')
        return
    } else {
        pageIndex++
        console.log(pageIndex)
    }
}
const handlePagePre = () => {
    if (pageIndex <= 1) {
        console.log('The first page!')
        return
    } else {
        pageIndex--
        console.log(pageIndex)
    }
}
</script>

<style>
</style>