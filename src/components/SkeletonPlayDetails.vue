<template>
  <div class="playlistdetails-container shell">
    <Skeletor height="37rem"  class="playlist-info left rounded-2xl " />
    <div class="songlist-songadd flex-col gap-4 justify-between right">
      <Skeletor height="2.5rem" width="100%" class="rounded-3xl mb-3" />
      <Skeletor height="1.5rem" width="100%" class="rounded-2xl" />
      <Skeletor height="1.5rem" width="100%" class="rounded-2xl" />

      <Skeletor height="1.5rem" width="100%" class="rounded-2xl" />

      <Skeletor height="1.5rem" width="100%" class="rounded-2xl" />

      <Skeletor height="1.5rem" width="100%" class="rounded-2xl" />

      <Skeletor height="1.5rem" width="100%" class="rounded-2xl" />

      <Skeletor height="1.5rem" width="100%" class="rounded-2xl" />

      <Skeletor height="1.5rem" width="100%" class="rounded-2xl" />


      <Skeletor height="1.5rem" width="100%" class="rounded-2xl" />


    </div>

  </div>

</template>

<script setup>
import "vue-skeletor/dist/vue-skeletor.css";
import { Skeletor } from "vue-skeletor";
</script>

<style scoped>
.shell {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 0fr;
  gap: 0px 3rem;
  grid-auto-flow: row;
  grid-template-areas:
    "left right right"
    "left right right"
    /* ". . ."; */
}

.left {
  grid-area: left;
}

.right {
  grid-area: right;
}

.doubleBtn {
  display: flex;
  width: 100%;
  justify-content: space-between;
}
@media screen and (max-width: 900px) {
  .playlistdetails-container {
    display: grid;
    grid-template-columns: 0.7fr 0.7fr 1.1fr;
    grid-template-rows: 0fr 2.4fr 0.4fr;
    gap: 1em 0em;
    grid-auto-flow: row;
    grid-template-areas:
      "playlist-info playlist-info playlist-info"
      "songlist-songadd songlist-songadd songlist-songadd"
      ". . .";
  }

  .playlist-info {
    grid-area: playlist-info;
  }

  .songlist-songadd {
    grid-area: songlist-songadd;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    justify-content: flex-start;
  }

  .hero-content {
    padding: 1rem;
  }

  .right {
    overflow: visible;
  }
}
</style>