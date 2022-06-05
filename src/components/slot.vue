<template>

  <!-- 样式逻辑抽离到子组件,根据命名slot而对不同的渲染进行分类----HTML多态:不同的name(类型),对应不同的style(方法) -->
  <!-- 同时可以父子组件传值同时使用父子组件各自的js逻辑 -->
  <!-- 一些组件可能只包括了逻辑而不需要自己渲染内容，
    视图输出通过作用域插槽全权交给了消费者组件。我们将这种类型的组件称为无渲染组件
    相应的,渲染它的组件叫渲染组件 -->

    <!--text, count为组件签名,为父组件传值而声明 -->
    <slot name="header" :text="greetingMessage" :count="1"></slot>


  <!-- 在外部没有提供任何内容的情况下，为插槽指定默认内容(HTML)用于渲染是很有用的 -->
    <slot>
      <!-- 默认内容 -->
      <div class="lds-ellipsis">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </slot>

  <!-- 可以在插槽外面加上HTML,这样子组件就不光包含STYLE,也包含HTML了 -->
  <footer>
    <slot name="footer"></slot>
  </footer>



</template>

<script setup>
// 相关JS逻辑 配合defineProps接收父组件的传值

</script>

<style>
/*
  注意：避免在这里使用 <style scoped>
  因为那不会应用到插槽内容上
*/
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