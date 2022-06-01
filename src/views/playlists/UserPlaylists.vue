<template>
    <div class="user-playlists w-3/4">
        <div class="h-96 flex flex-col gap-5">
            <div v-for="playlist in playlists" :key="playlist.id" class="hover:scale-105 transition-all ">
                <Suspense>
                    <template #default>
                        <ListView :playlist="playlist" />
                    </template>
                    <template #fallback>
                        <Skeleton :playlist="playlist" />
                    </template>
                </Suspense>
            </div>
        </div>

        <div class="flex justify-center relative top-10">
            <router-link :to="{ name: 'CreatePlaylist' }" class="btn btn-outline  max-w-xs bg-red-500">Create a new
                Playlist</router-link>
        </div>
    </div>
</template>

<script setup>
import Navbar from "components/Navbar.vue";
import Skeleton from "components/Skeleton.vue";
import getCollection from "composables/getCollection"
import getUser from "composables/getUser"
import ListView from "components/ListView.vue"



const { user } = getUser()

const { documents: playlists } = getCollection(
    'playlists',
    ['userId', '==', user.value.uid]
)


</script>

<style>
</style>