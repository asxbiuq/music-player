<template>
   <div>

    <div v-if="error" class="error">{{ error }}</div>

    <div v-if="playlist" class="shell">

      <div class="left flex flex-col items-center">
        <div class="hero min-h-full bg-base-200">
          <div class="hero-content flex flex-col p-10">
            <!-- 用一个容器来占位,防止页面抖动 -->
            <div class="w-72 h-80 overflow-hidden">
              <img :src="playlist.coverUrl" class=" shadow-2xl " />
            </div>
            <div class="flex flex-col items-center w-72 ">
              <h1 class="text-5xl font-bold overflow-visible">{{ playlist.title }}</h1>
              <p class="py-6">{{ playlist.description }}</p>
              <div class="doubleBtn">

                <button class=" bg-red-500 btn" @click="handleDelete">Delete Playlist</button>


                <div v-if="!isAddSong">
                  <button @click="handleAddSong" class="btn bg-red-500">Add Song</button>
                </div>
                <div v-else>
                  <button @click="handleSongList" class="btn bg-red-500">Song List</button>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>



    </div>
  </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>

</style>