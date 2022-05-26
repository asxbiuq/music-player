<template>
    <form @submit.prevent="handleSubmit">
        <h2>Signup</h2>
        <input type="text" placeholder="Display name" v-model="displayName">
        <input type="email" placeholder="Email" v-model="email">
        <input type="password" placeholder="Password" v-model="password">
        <div v-if="error" class="error">{{ error }}</div>
        <button v-if="!isPending">Sign up</button>
        <button v-if="isPending" disabled>Loading</button>
    </form>
</template>

<script setup>
import useSignup from "composables/useSignup"
import { ref } from "vue"
import { useRouter } from 'vue-router'


const { error, signup, isPending } = useSignup()
const router = useRouter()

const email = ref('')
const password = ref('')
const displayName = ref('')

const handleSubmit = async () => {
    const res = await signup(email.value, password.value, displayName.value)
    if (!error.value) {
        router.push({ name: 'UserPlaylists' })
    }
}


</script>

<style>
</style>
