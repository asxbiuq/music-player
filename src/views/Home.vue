<template>

  <div class="hero  top-40 overflow-none">
    <div class="hero-content  flex flex-row justify-center gap-10">

      <div class="overflow-visible">
        <img src="src/assets/60a8528451475473.jfif"
          class="record w-50  h-50 rounded-full  object-contain animate-spin overflow-none" />
      </div>

      <div class="flex flex-col overflow-visible">
        <h1 class="text-5xl font-bold overflow-visible">Music-Posts</h1>
        <p class="py-6  w-60">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi
          exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>

        <button class="btn btn-primary" @click="handleClick">Get Started</button>
      </div>

    </div>
  </div>

</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter()

const handleClick = () => {
  router.push({
    name: 'Auth'
  })
}

</script>

<style>
.hero {
  overflow: visible;
  position: relative;
}

.hero>* {
  overflow: visible;
  position: relative;
}
</style>
