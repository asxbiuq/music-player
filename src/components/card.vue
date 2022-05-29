<template>
  <div
    class="card-3d"
    @click="eve_cardres_click"
    @mouseover="eve_cardres_msover"
    @mouseout="eve_cardres_msout"
  >
    <div class="card card-z" ref="cardz">
      <slot name="cz"></slot>
    </div>
    <div
      :class="['card', direction == 'row' ? 'card-f-y' : 'card-f-x']"
      ref="cardf"
    >
      <slot name="cf"></slot>
    </div>
  </div>
</template>
<script setup lang="ts">
import { defineProps, ref, watch } from 'vue'

const props = defineProps<{
  trigger: string
  value?: boolean
  direction?: string
}>()

const surface = ref<boolean>(true)
const cardz = ref<HTMLDivElement | null>(null)
const cardf = ref<HTMLDivElement | null>(null)

watch(
  () => props.value,
  (newVal, oldVal): void => {
    if (props.trigger == 'custom') fn_reserve_action(newVal)
  }
)

const fn_reserve_action = (bool: boolean | undefined): void => {
  const arr =
    props.direction == 'row'
      ? ['rotateY(180deg)', 'rotateY(0deg)']
      : ['rotateX(-180deg)', 'rotateX(0deg)']
  if (cardz.value) {
    cardz.value.style.transform = bool ? arr[0] : arr[1]
  }
  if (cardf.value) {
    cardf.value.style.transform = !bool ? arr[0] : arr[1]
  }
}

const eve_cardres_click = (): void => {
  if (props.trigger == 'click') {
    fn_reserve_action(surface.value)
    surface.value = !surface.value
  }
}

const eve_cardres_msover = (): void => {
  if (props.trigger == 'hover') fn_reserve_action(true)
}

const eve_cardres_msout = (): void => {
  if (props.trigger == 'hover') fn_reserve_action(false)
}
</script>

<style lang="scss" scoped>
.card-3d {
  width: 200px;
  height: 200px;
  transition: all 0.2s;
  position: relative;
  background-color: transparent;
  cursor: pointer;
  .card {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    transition: all 1s;
    backface-visibility: hidden;
    border-radius: 4px;
    border: 1px solid #e8eaec;
    &:hover {
      box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);
      border-color: #eee;
    }
    &.card-z {
      background-color: red;
    }
    &.card-f-y {
      transform: rotateY(-180deg);
    }
    &.card-f-x {
      transform: rotateX(-180deg);
    }
  }
}
</style>