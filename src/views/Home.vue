<template>
  <div class="hero relative top-40 ">
    <div class="hero-content  flex flex-row justify-center gap-10">
      <div>
        <img src="src\assets\60a8528451475473.jfif"
          class="record w-50  h-50 rounded-full  object-contain animate-spin " />
      </div>
      <div class="flex flex-col">
        <h1 class="text-5xl font-bold">Music-Posts</h1>
        <p class="py-6  w-60">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi
          exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>

        <button class="btn btn-primary" @click="handleClick">Get Started</button>
      </div>

    </div>
  </div>
</template>

<script setup>
import Navbar from "components/Navbar.vue";
import ListView from 'components/ListView.vue'
import getCollection from 'composables/getCollection'
import { useRouter } from "vue-router";

const router = useRouter()

const handleClick = () => {
  router.push({ name: 'UserPlaylists' })
}

const { error, documents } = getCollection('playlists')
</script>

<style>

</style>
