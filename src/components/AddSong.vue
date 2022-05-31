<template>
    <div class="add-song">
        <!-- <button v-if="!showForm" @click="showForm = true">Add Songs</button> -->
        <form @submit.prevent="handleSubmit">
            <label>Add a New Song</label>
            <input type="text" placeholder="Song title" required v-model="title">
            <input type="text" placeholder="Artist" required v-model="artist">
            <button>Add</button>
        </form>
    </div>
</template>

<script setup>
import { useRouter } from "vue-router"
import { ref } from 'vue'
import useDocument from 'composables/useDocument'
import { inject } from 'vue'
// const props = defineProps({
//     playlist: Object
// })


const playlist = inject('playlist')

console.log('playlist:', playlist)
const title = ref('')
const artist = ref('')
const showForm = ref(false)
const { updateDoc } = useDocument()
const router = useRouter()
const handleSubmit = async () => {
    const newSong = {
        title: title.value,
        artist: artist.value,
        id: Math.floor(Math.random() * 100000000)
    }

    await updateDoc(playlist.value.playlistId.toString(), {
        songs: [...playlist.value.songs, newSong]
    })

    title.value = ''
    artist.value = ''

    router.push({ name: 'SongList' })
}
</script>

<style scoped>

</style>