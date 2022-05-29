<template>
  <div class="flex">
    <card trigger="click" direction="row" v-for="item in 3" :key="item">
      <template #cz>
        <div class="card">aaa</div>
      </template>
      <template #cf>
        <div class="card card1">bbb</div>
      </template>
    </card>
  </div>
</template>
<script setup>
import { defineAsyncComponent } from 'vue'

const card = defineAsyncComponent(() => import('@/components/card.vue'))

</script>

<style lang="scss" scoped>
.flex {
  display: flex;
  justify-content: space-between;
}
.card {
  width: 200px;
  height: 200px;
  background: red;
}
.card1 {
  background: gold;
}
</style>
