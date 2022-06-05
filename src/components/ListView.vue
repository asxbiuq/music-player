<template>
    <router-link :to="{ name: 'PlaylistDetails', params: { id: id } }" class="flex justify-center ">
      <div class="list-style border border-blue-300 shadow rounded-md p-4 max-w-6xl  flex gap-2 justify-between w-[90%] overflow-visible justify-content">
        <!-- image -->
        <div class="list-image rounded-full bg-slate-200 h-[4rem] w-[4rem] overflow-hidden">
          <img :src="coverUrl" />
        </div>
        <!-- info -->
        <div class="list-info">
          <h3><slot :title="title"></slot></h3>
          <p>Created by <slot :name="name"></slot></p>
        </div>
        <!-- number -->
        <div class="list-number">
          <p><slot :length="length"></slot></p>
        </div>

      </div>
    </router-link>
</template>

<script setup>
// 相关JS逻辑 配合defineProps接收父组件的传值
import { defineProps } from 'vue'
import { ref, provide } from 'vue'

const props = defineProps(['id','coverUrl','name','length','routerLinkName','title'])
console.log(props.id)

// provide('playlist', props.id)


</script>

<style>
/*
  注意：避免在这里使用 <style scoped>
  因为那不会应用到插槽内容上
*/
/* .list-style {
  @apply border border-blue-300 shadow rounded-md p-4 max-w-6xl  flex gap-2 justify-between w-[90%] overflow-visible justify-content
}
.list-image {
  @apply  rounded-full bg-slate-200 h-[4rem] w-[4rem] overflow-hidden
} */
.lds-ellipsis {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
}

.lds-ellipsis div {
  position: absolute;
  top: 33px;
  width: 13px;
  height: 13px;
  border-radius: 50%;
  background: rgb(229, 210, 210);
  animation-timing-function: cubic-bezier(0, 1, 1, 0);
}

.lds-ellipsis div:nth-child(1) {
  left: 8px;
  animation: lds-ellipsis1 0.6s infinite;
}

.lds-ellipsis div:nth-child(2) {
  left: 8px;
  animation: lds-ellipsis2 0.6s infinite;
}

.lds-ellipsis div:nth-child(3) {
  left: 32px;
  animation: lds-ellipsis2 0.6s infinite;
}

.lds-ellipsis div:nth-child(4) {
  left: 56px;
  animation: lds-ellipsis3 0.6s infinite;
}

@keyframes lds-ellipsis1 {
  0% {
    transform: scale(0);
  }

  100% {
    transform: scale(1);
  }
}

@keyframes lds-ellipsis3 {
  0% {
    transform: scale(1);
  }

  100% {
    transform: scale(0);
  }
}

@keyframes lds-ellipsis2 {
  0% {
    transform: translate(0, 0);
  }

  100% {
    transform: translate(24px, 0);
  }
}
</style>