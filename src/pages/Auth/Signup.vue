<template>
    <form @submit.prevent="handleSubmit">
        <h1>注册</h1>
        <!-- <input type="text" placeholder="Display name" v-model="displayName"> -->
        <input type="email" placeholder="Email" v-model="email">
        <input type="password" placeholder="Password" v-model="password">
        <div class="relative right-20">
            <a @click="handleLogin" class="cursor-pointer ">登陆</a>
        </div>
        <div v-if="error" class="error">{{ error }}</div>
        <button class="btn relative left-0 top-2" v-if="!isPending">注册</button>
        <button class="btn relative left-0 top-2" v-if="isPending" disabled>加载中...</button>
    </form>
</template>

<script setup>
const { error, signup, isPending } = $(useSignup())
const router = useRouter()


const email = $ref('')
const password = $ref('')
// const displayName = $ref('')

const handleSubmit = async () => {
    const res = await signup(email, password)
    if (!error) {
        router.push({ name: 'Playlists-UserPlaylists' })
    }
}

const handleLogin = () => {
    router.push({ name: 'Auth-Login' })
}
</script>

<style>
</style>
