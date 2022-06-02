<template>
    <form @submit.prevent="handleSubmit" class="flex flex-col w-1/3 justify-center items-center self-center">
        <h4 class="text-black-600 text-2xl font-bold">Create New Playlist</h4>
        <input class="w-full" type="text" required placeholder="Playlist title" v-model="title">
        <textarea required placeholder="Playlist description..." v-model="description"></textarea>
        <!-- upload playlist image -->
        <label>Upload playlist cover image</label>
        <input type="file"  @change="handleChange">
        <div class="error">{{ fileError }}</div>
        <button class="btn relative left-0 top-2" v-if="!isPending">Create</button>
        <button class="btn relative left-0 top-2" v-else disabled>Saving...</button>
    </form>
</template>

<script setup>
import { ref } from 'vue'
import useStorage from 'composables/useStorage'
import useCollection from 'composables/useCollection'
import getUser from 'composables/getUser'
import { useRouter } from 'vue-router'
import { Timestamp } from "firebase/firestore"
import { computed } from '@vue/reactivity'


const { uploadImage, filePath, isPending: uploadImagePending } = useStorage()
const { error, addDoc, isPending: addDocPending } = useCollection('playlists')
const { user } = getUser()
const router = useRouter()
const uid = user.uid;
const title = ref('')
const playlistsName = ref('')
const description = ref('')
const file = ref(null)
const fileError = ref(null)
const playlist = ref('')
const isPending = computed(() => {
    // isPending = uploadImagePending && addDocPending
    if (uploadImagePending.value | addDocPending.value) {
        return true
    } else {
        return false
    }

})


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
            router.push({ name: 'UserPlaylists' })
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
/* input[type="file"] {
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
} */
</style>