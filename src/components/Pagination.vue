<template>
  <div class="btn-group grid grid-cols-2">
    <button @click="handlePagePre" class="btn text-4xl hover:opacity-70 overflow-visible">«</button>
    <button @click="handlePageNext" class="btn text-4xl hover:opacity-70 overflow-visible">»</button>
  </div>
</template>

<script setup>
import { inject } from "@vue/runtime-core"


let pageIndex = inject('pageIndex')
const handlePageNext = () => {
    pageIndex++
    console.log(pageIndex)
}
const handlePagePre = () => {
    pageIndex--
    console.log(pageIndex)
}
</script>

<style>

</style>