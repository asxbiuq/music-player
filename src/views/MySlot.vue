<template lang="">

  <!-- 可以在父组件里想子组件通过v-bind传递父组件的url给子组件的api-url,再调用子组件的JS逻辑 -->
  <slotTest :api-url="url"> 
    <!-- #header #default #footer表示为选择渲染逻辑, 选择后将HTML传入渲染子组件的<slot>里进行渲染-->




    <!-- 要为具名插槽传入内容，我们需要使用一个含 v-slot 指令的 <template> 元素，
    并将目标插槽的名字传给该指令  -->
    <!-- #为v-slot的简写, 后面的"{ text, count }"是用来给具名插槽解构传值-->
    <!-- 这里的传值是传给子组件的,下面的模板是传给子组件的HTML,这HTML属于子组件,所以需要传值 -->
    <template #header="{ text, count }">
      {{ text }},{{ count }}
    </template>

    
    <template #default>

    </template>

    <template #footer>
      <p>Here's some contact info</p>
    </template>

    <!-- 插槽明还可以是动态的 -->
    <template #[dynamicSlotName]>
  
    </template>
    
  </slotTest>

</template>

<script setup>
import slotTest from 'components/slot.vue'
</script>

<style lang="">
  
</style>