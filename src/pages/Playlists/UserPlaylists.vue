<template>
    <div class="user-playlists w-full flex flex-col justify-between overflow-hidden h-full items-center gap-2">

        <div v-if="showLists">
        </div>
        <!-- PLAYLIST -->
        <div class="playlist-items flex flex-col gap-8  overflow-hidden w-[90%] h-full">
            <!-- v-for 会循环产生与循环条件语句相同的盒子,所以子元素的大小在条件语句里设置 -->
            <div v-for=" showList in showLists" :key="showList.id"
                class="playlist-item hover:scale-105 transition-all h-[10vh] overflow-visible top-2">

                <PlayList :length="showList.length" :id="showList.id" :cover-url="showList.coverUrl"
                    :name="showList.name" :routerLinkName="'Playlists-PlaylistDetails-id-SongList'"
                    :title="showList.title" />


            </div>
        </div>

        <!-- createPlaylistBtn -->
        <div class="createPlaylistBtn overflow-visible">
            <router-link :to="{ name: 'Playlists-CreatePlaylist' }" class="btn  bg-red-500">Create a new
                Playlist</router-link>
        </div>

        <!-- 翻页按钮 -->
        <div class="w-1/2 overflow-visible mb-2">
            <Pagination @PagePre="handlePagePre" @PageNext="handlePageNext" class="overflow-visible" />
        </div>


    </div>




</template>


<script setup>
import { db } from "../../firebase/config";
import { collection, query, where, getDocs } from "firebase/firestore";


const { user } = $(getUser())
const { getDoc, error } = $(useDocument())
// 这里要await,不然会报错 getDoc是一个用async声明的异步函数
const { data: playlists } = $(await getDoc('playlists', ['userId', '==', user.uid]))
console.log('playlists', playlists)


// 初始化页数，默认为1
let pageIndex = $ref(1)

// 展示页的数据
const showLists = $computed(() => {
    return playlists.slice((pageIndex - 1) * 5, (pageIndex) * 5)
})
// console.log(showList)
const maxPageNum = $computed(() => {
    return Math.ceil(playlists.length / 5)
})
// console.log(maxPageNum)
const handlePageNext = () => {
    if (pageIndex >= maxPageNum) {
        console.log('The last page!')
        return
    } else {
        pageIndex++
        console.log('CurrentPage:', pageIndex)
    }
}
const handlePagePre = () => {
    if (pageIndex <= 1) {
        console.log('The first page!')

        return
    } else {
        pageIndex--
        console.log('CurrentPage:', pageIndex)
    }
}
</script>
<route lang="yaml">
{
  meta: {
    layout: "playlists",
  }
}
</route>