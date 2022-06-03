<template>
    <div class="user-playlists w-full flex flex-col justify-between overflow-hidden h-fit items-center gap-2">
        <!-- PLAYLIST -->
        <div class="playlist-items flex flex-col gap-5 justify-center overflow-hidden">
            <!-- v-for 会循环产生与循环条件语句相同的盒子,所以子元素的大小在条件语句里设置 -->
            <div v-for="playlist in showList" :key="playlist.id"
                class="playlist-item hover:scale-105 transition-all h-1/5 overflow-visible">
                <ListView :playlist="playlist" />
            </div>
        </div>

        <!-- createPlaylistBtn -->
        <div class="createPlaylistBtn">
            <router-link :to="{ name: 'CreatePlaylist' }" class="btn max-w-xs bg-red-500">Create a new
                Playlist</router-link>
        </div>

        <!-- 翻页按钮 -->
        <div class="w-1/2 ">

            <Pagination @PagePre="handlePagePre" @PageNext="handlePageNext" />
        </div>

    </div>
</template>

<script setup>
import Navbar from "components/Navbar.vue";
import Skeleton from "components/Skeleton.vue";
import { getCollection } from "composables/getCollection"
import getUser from "composables/getUser"
import ListView from "components/ListView.vue"
import Pagination from "components/Pagination.vue";
import { computed, provide } from "@vue/runtime-core";
import { inject } from "vue";
import { ref } from "vue";
import { reactive } from 'vue'
import { toRefs } from "vue";
import { getCollectionPromise } from 'composables/getCollection'
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/config";
import getDocData from 'composables/getDocData'
import getDocId from 'composables/getDocData'
import { collection, query, where, getDocs } from "firebase/firestore";

let playlists = reactive([])
const { user } = getUser()

// 获取数据
const q = query(collection(db, "playlists"), where('userId', '==', user.value.uid));

const querySnapshot = await getDocs(q);
querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    // console.log(doc.id, " => ", doc.data());
    playlists.push({ ...doc.data(), id: doc.id })
});

// 初始化页数，默认为1
let pageIndex = $ref(1)

// 展示页的数据
const showList = playlists.slice(0,4)
console.log(showList)



const handlePageChange = (pageIndex) => {
    console.log('CurrentPage:', pageIndex)
}

const handlePageNext = () => {
  if (pageIndex >= 10) {
    console.log('The last page!')
    return
  } else {
    pageIndex++
    console.log(pageIndex)
  }
}
const handlePagePre = () => {
  if (pageIndex <= 0) {
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