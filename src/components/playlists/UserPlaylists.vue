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
import Navbar from "../Navbar.vue";
import Skeleton from "../Skeleton.vue";
import getCollection from "composables/getCollection"
import getUser from "composables/getUser"
import ListView from "components/ListView.vue"
import { useRouter } from 'vue-router'
const { user } = getUser()
const props = defineProps({
    id: String
})
const { documents: playlists } = getCollection(
    'playlists',
    ['userId', '==', user.value.uid]
)

const playlist = ref('')

const { error, deleteDoc, updateDoc, getDocData } = useDocument('playlists', props.id)
const { deleteImage } = useStorage()

const getPlaylist = (async () => {
    const { docData } = await getDocData()
    playlist.value = docData.value
})()
const router = useRouter()
router.push({ name: 'PlaylistDetails', params: { id: user.value.uid } })

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