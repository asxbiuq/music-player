<template>
    <form @submit.prevent="handleSubmit">

        <h1>Login</h1>
        <input type="email" placeholder="Email" v-model="email">
        <input type="password" placeholder="Password" v-model="password">
        <div class="flex justify-between gap-5 no-swap">
            <a @click="handleSignup" class="cursor-pointer">Signup</a>
            <a class="cursor-pointer p">Forget the passrword?</a>
        </div>
        <div v-if="error" class="error">{{ error }}</div>
        <button v-if="!isPending">Log in</button>
        <!-- <div v-if="!isPending">
            <loading />
        </div> -->
        <button class="btn relative left-0 top-2" v-if="isPending" disabled>Loading</button>
    </form>
</template>

<script setup>
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
