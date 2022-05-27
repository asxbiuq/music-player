<template>
  <Navbar />
  <div class="content">
    <router-view />
  </div>
</template>
<script setup>
import Navbar from "components/Navbar.vue";
</script>
<style>
.content {
  margin: 0 auto;
  max-width: 1200px;
  padding: 0 20px;
}
</style>
