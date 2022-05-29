<template>
  <div class="flex justify-center flex-col items-center w-screen">
    <Navbar />
    <router-view />
  </div>
</template>
<script setup>
import Navbar from "components/Navbar.vue";
import UseCard from "./UseCard.vue";
</script>
<style scoped>
</style>
