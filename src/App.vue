<template>
  <router-view />
  <!-- 全局loading -->
  <loading v-if="isPending"></loading>

</template>

<script setup>
// 导入全局 isPending
const { isPending } = useIsPending()

</script>

<style>
#app {
  height: 100vh;
}
</style>

