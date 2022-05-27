<template>
    <div class="user-playlists">
        <div v-if="playlists">
            <div v-for="playlist in playlists" :key="playlist.id">
                <ListView :playlist="playlist" />
            </div>
        </div>
        <div v-else>
            <!-- <div v-for="playlist in playlists" :key="playlist.id"> -->
                <Skeleton />
            <!-- </div> -->
        </div>
        <router-link :to="{ name: 'CreatePlaylist' }" class="btn">Create a new Playlist</router-link>
    </div>
</template>

<script setup>
import Navbar from "../../components/Navbar.vue";
import Skeleton from "../../components/Skeleton.vue";
import getCollection from "composables/getCollection"
import getUser from "composables/getUser"
import ListView from "components/ListView.vue"

const { user } = getUser()

const { documents: playlists } = getCollection(
    'playlists',
    ['userId', '==', user.value.uid]
)

console.log(playlists)
</script>

<style>
.btn {
    position: absolute;
    top: 80%;
    left: 70%;
    color: deeppink;
}
</style>