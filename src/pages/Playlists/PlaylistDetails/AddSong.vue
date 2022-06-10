<template>
    <div class="add-song ">
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
const playlist = $(inject('playlist'))

console.log('playlist:', playlist)
const title = $ref('')
const artist = $ref('')
// const showForm = $ref(false)
const { updateDoc } = useDocument()
const router = useRouter()
const handleSubmit = async () => {
    const newSong = {
        title: title,
        artist: artist,
        id: Math.floor(Math.random() * 100000000)
    }
    // 上传数据
    await updateDoc(playlist.playlistId.toString(), {
        songs: [...playlist.songs, newSong]
    })
    // 更新本地的数据
    playlist.songs.push(newSong)
    // console.log(playlist)
    // 清空表格里的数据
    title = ''
    artist = ''

    router.push({ name: 'Playlists-PlaylistDetails-SongList' })
}
</script>

<style scoped>
</style>