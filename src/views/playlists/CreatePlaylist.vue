<template>
    <form @submit.prevent="handleSubmit">
        <h4>Create New Playlist</h4>
        <input type="text" required placeholder="Playlist title" v-model="title">
        <textarea required placeholder="Playlist description..." v-model="description"></textarea>
        <!-- upload playlist image -->
        <label>Upload playlist cover image</label>
        <input type="file" @change="handleChange">
        <div class="error">{{ fileError }}</div>
        <button v-if="!isPending">Create</button>
        <button v-else disabled>Saving...</button>
    </form>
</template>

<script setup>
import { ref } from 'vue'
import useStorage from 'composables/useStorage'
import useCollection from 'composables/useCollection'
import getUser from 'composables/getUser'
import { useRouter } from 'vue-router'
import { Timestamp } from "firebase/firestore"



const { uploadImage, filePath } = useStorage()
const { error, addDoc } = useCollection('playlists')
const { user } = getUser()
const router = useRouter()
const uid = user.uid;

const title = ref('')
const description = ref('')
const file = ref(null)
const fileError = ref(null)
const isPending = ref(false)


const handleSubmit = async () => {
    if (file.value) {
        const url = await uploadImage(file.value)
        await addDoc({
            title: title.value,
            description: description.value,
            userId: user.value.uid,
            userName: user.value.displayName,
            coverUrl: url,
            filePath: filePath.value,
            songs: [],
            createdAt: Timestamp.fromDate(new Date())
        });

        if (!error.value) {
            router.push({ name: 'PlaylistDetails', params: { id: user.value.uid } })
        }
    }
}
// 允许上传的数据类型
const types = ['image/png', 'image/jpeg']

const handleChange = (e) => {
    const selected = e.target.files[0]
    console.log(selected)

    if (selected && types.includes(selected.type)) {
        file.value = selected
        fileError.value = null
    } else {
        file.value = null
        fileError.value = 'Please select an image file (png or jpg)'
    }
}

</script>

<style>
input[type="file"] {
    border: 0;
    padding: 0;
}

label {
    font-size: 12px;
    display: block;
    margin-top: 30px;
}

button {
    margin-top: 20px;
}
</style>