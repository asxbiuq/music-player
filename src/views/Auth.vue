<template>
  <div class="container">
    <div class="left img"></div>
    <div class="right form bg-slate-400">
      <Transition name="form">
        <router-view  class="bg-gray"/>
      </Transition>
    </div>
  </div>
</template>

<script setup>
import Login from './auth/Login.vue';
import Signup from './auth/Signup.vue';
</script>

<style scoped>
body {
  display: flex;
  justify-content: center;
}

.container {
  position: relative;
  top: 100px;
  width: 1100px;
  height: 550px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, .8);
  display: flex;
  perspective: 1000px;
}

.left {
  width: 800px;
  height: 550px;
  background-image: url("@/assets/201515-158211451517f1.jpg");
  /* 让图片适应大小 */
  background-size: cover;
}

.right {
  width: 300px;
  height: 550px;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
}

.right h1 {
  font: 900 30px '';
}





.form-enter-active {
  animation: rotate-vertical-center 0.5s;
}
.form-leave-active {
  animation: rotate-vertical-center 0.5s reverse;
}


@keyframes rotate-vertical-center {
  0% {
    transform: rotateY(0)
  }

  100% {
    transform: rotateY(360deg)
  }
}

input, textarea {
  border: 0;
  border-bottom: 1px solid var(--secondary);
  padding: 10px;
  outline: none;
  display: block;
  width: 100%;
  box-sizing: border-box;
  margin: 20px auto;
}
</style>