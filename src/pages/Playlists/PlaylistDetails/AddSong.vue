<template>
    <div class="add-song">
        <!-- <button v-if="!showForm" @click="showForm = true">Add Songs</button> -->
        <form @submit.prevent="handleSubmit">
            <label>Add a New Song</label>
            <input type="text" placeholder="Song title" required v-model="title">
            <input type="text" placeholder="Artist" required v-model="artist">
            <input type="file" @change="handleSelected">
            <div class="error">{{ fileError }}</div>
            <div class="container text-center">
                <button  v-if="!isPending">Add</button>
                <button  v-else disabled>Adding...</button>
            </div>
        </form>

        <loading v-if="isPending"></loading>

    </div>
</template>

<script setup>
const file = $ref(null)
const fileError = $ref(null)
const playlist = $(inject('playlist'))

const emits = defineEmits(['addedSong'])

console.log('playlist:', playlist)
const title = $ref('')
const artist = $ref('')
// const showForm = $ref(false)
const { uploadMusic, filePath, isPending : MusicPending } = $(useStorage())
const { updateDoc, isPending : docPending } = useDocument()
const router = useRouter()

const isPending = $computed(() => {
    // isPending = uploadImagePending && addDocPending
    if (MusicPending | docPending) {
        return true
    } else {
        return false
    }

})

const handleSubmit = async () => {
    const { url } = $(await uploadMusic(file))
    const newSong = {
        title: title,
        artist: artist,
        musicUrl: url,
        filePath: filePath,
        id: Math.floor(Math.random() * 100000000)
    }
    // 上传数据
    await updateDoc(playlist.playlistId.toString(), {
        songs: [...playlist.songs, newSong]
    })
    // 更新本地的数据
    playlist.songs.push(newSong)
    // console.log(playlist)
    // 这里不需要清空表格里的数据,因为若是上传成功,页面则跳转,数据则被重置,若失败则保留输入信息

    emits('addedSong')
    router.push({ name: 'Playlists-PlaylistDetails-SongList' })
}
// 允许上传的数据类型
const types = ['audio/mpeg', 'audio/ogg']

const handleSelected = (e) => {
    const selected = e.target.files[0]
    console.log(selected)

    if (selected && types.includes(selected.type)) {
        file = selected
        fileError = null
    } else {
        file = null
        fileError = 'Please select an image file (mp3 or ogg)'
    }
}
</script>

<style scoped>

</style>