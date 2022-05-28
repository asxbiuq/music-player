<template>
    <form @submit.prevent="handleSubmit">
        <h1>Login</h1>
        <input type="email" class="e" placeholder="Email" v-model="email">
        <input type="password" class="e" placeholder="Password" v-model="password">
        <div class="flex justify-between">
            <a @click="handleSignup" class="cursor-pointer">Signup</a>
            <a class="cursor-pointer">Forget the passrword?</a>
        </div>
        <div v-if="error" class="error">{{ error }}</div>
        <button class="g" v-if="!isPending">Log in</button>
        <button v-if="isPending" disabled>Loading</button>
    </form>
</template>

<script setup>
import useLogin from 'composables/useLogin'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Signup from './Signup.vue';

const { error, login, isPending } = useLogin()
const router = useRouter()

const email = ref('')
const password = ref('')

const handleSubmit = async () => {
    const res = await login(email.value, password.value)
    if (!error.value) {
        router.push({ name: 'UserPlaylists' })
    }
}
const handleSignup = () => {
    router.push({ name: 'Signup' })
}
</script>

<style>
</style>
