<template>
    <div class="user-playlists">
        <h4>user-playlists</h4>
        <div v-if="playlists">
            <ListView :playlists="playlists" />
        </div>
        <router-link :to="{ name: 'CreatePlaylist' }" class="btn">Create a new Playlist</router-link>
    </div>
</template>

<script setup>
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
    color:deeppink;
}
</style>