<template>
  <div class="home">
    <!-- <Navbar /> -->
    <h1 class="text-blue-600 text-3xl flex justify-center">this is home page</h1>
    <div v-if="error" class="error">Could not fetch the data</div>
    <div v-if="documents">
      <ListView :playlists="documents" />
    </div>
  </div>
</template>

<script setup>
import Navbar from "components/Navbar.vue";
import ListView from 'components/ListView.vue'
import getCollection from 'composables/getCollection'

const { error, documents } = getCollection('playlists')
</script>
