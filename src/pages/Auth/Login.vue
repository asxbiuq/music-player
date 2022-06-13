<template>
    <form @submit.prevent="handleSubmit">

        <h1>登陆</h1>
        <input type="email" placeholder="Email" v-model="email">
        <input type="password" placeholder="Password" v-model="password">
        <div class="relative right-20">
            <a @click="handleSignup" class="cursor-pointer">注册</a>
            <!-- <a class="cursor-pointer p">忘记密码?</a> -->
        </div>
        <div v-if="error" class="error">{{ error }}</div>
        <button v-if="!isPending">登陆</button>
        <!-- <div v-if="!isPending">
            <loading />
        </div> -->
        <button class="btn relative left-0 top-2" v-if="isPending" disabled>正在加载</button>
    </form>
</template>

<script setup>
const { error, login, isPending } = $(useLogin())
const router = useRouter()

const email = $ref('')
const password = $ref('')

const handleSubmit = async () => {
    const res = await login(email, password)
    if (!error) {
        router.push({ name: 'Playlists-UserPlaylists' })
    }
}
const handleSignup = () => {
    router.push({ name: 'Auth-Signup' })
}
</script>

<style>
</style>
