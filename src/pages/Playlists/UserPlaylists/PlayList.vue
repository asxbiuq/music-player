<template>
    <router-link :to="{ name: 'Playlists-PlaylistDetails', params: { id: id } }" class="flex justify-center ">
      <div class="list-style border border-blue-300 shadow rounded-md p-4 max-w-6xl  flex gap-2 justify-between w-[90%] h-[15vh]  justify-content">
        <!-- image -->
        <div class="list-image  rounded-full bg-slate-200  overflow-hidden">
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
:root {
  --img-r:calc(15vh - 2rem);
}
.list-image{
  height: var(--img-r);
  width: var(--img-r);
}
</style>