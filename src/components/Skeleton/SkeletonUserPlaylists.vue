<template>

<div class="flex flex-col gap-2 items-center w-screen">
  <div v-for="index in 6" :key="index">

  <div class="card__slim flex">
    <div class="card__avatar">
      <Skeletor circle size="5rem" class="post__avatar" />
    </div>

    <div class="card__meta flex flex-col justify-center">
      <h2>
        <Skeletor width="70rem" class="my-1 mx-3 w-[90%]" />
      </h2>

      <p>
        <Skeletor width="70rem" class="my-1 mx-3" />
      </p>
      <p>
        <Skeletor width="70rem" class="my-1 mx-3" />
      </p>
    </div>

    </div>
  </div>

 </div>
  <div class="card__actions flex-col items-center gap-2 bottom-0 absolute left-[40%]">
    <Skeletor width="10rem" height="3rem" pill style="margin-right: 4px" />
    <Skeletor width="20rem" height="3rem" pill />
  </div>

</template>

<script setup>
import "vue-skeletor/dist/vue-skeletor.css";
import { Skeletor } from "vue-skeletor";
</script>

<style>
</style>
