<template>
  <div class="shell">
    <Skeletor height="37rem"  class="left rounded-2xl " />
    <div class="right flex-col gap-4 justify-between">
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
</style>