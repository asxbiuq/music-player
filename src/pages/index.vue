<template>

  <div class="flex content-center items-center h-screen ">

    <div class="hero overflow-none ">
      <div class="hero-content  flex flex-row justify-center gap-5 content-center items-center w-screen">

        <div class="overflow-visible w-[30vw] flex justify-center">
          <img src="src/assets/60a8528451475473.jfif"
            class="record w-50  h-50 rounded-full  object-contain animate-spin overflow-none" />
        </div>

        <div class="flex flex-col overflow-visible  ">
          <h1 class="text-5xl font-bold overflow-visible p w-full ">Music-Posts</h1>
          <p class="py-6  w-60 ">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi
            exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>

          <button class="btn btn-primary" @click="handleClick">Get Started</button>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>

const router = useRouter()

const handleClick = () => {
  router.push({
    name: 'Auth-Login'
  })
}
</script>

<style scoped>
@media screen and (max-width: 500px) {
  .hero-content {
    flex-direction: column-reverse;
    align-items: center;
  }
}
</style>
