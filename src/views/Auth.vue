<template>
  <div class="flex justify-center items-center h-screen">
    <div class="shell">
      <div class="left img"></div>
      <div class="right form bg-slate-400 overflow-hidden">
        <Transition name="form">
          <router-view class="bg-gray" />
        </Transition>
        <!-- 由于<router-view> can no longer be used directly inside <transition> or <keep-alive>.改写为:-->
        <!-- <router-view v-slot="{ Component }" class="bg-gray">
          <transition 
          name="form"
          >
            <component :is="Component" />
          </transition>
        </router-view> -->
      </div>
    </div>

  </div>
</template>

<script setup>
import Login from './auth/Login.vue';
import Signup from './auth/Signup.vue';
import 'animate.css';
</script>

<style scoped>
.shell {
  /* position: relative;
  top: 100px;*/
  /* width: 1100px; */
  /* height: 550px;  */
  box-shadow: 0 5px 15px rgba(0, 0, 0, .8);
  display: flex;
  flex-direction: row;
  justify-content: center;
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
/* 由于<router-view> can no longer be used directly inside <transition> or <keep-alive>. 所以取消离去动画*/
/* .form-leave-active {
  animation: rotate-vertical-center 0.5s reverse;
} */




@keyframes rotate-vertical-center {
  0% {
    transform: rotateY(0)
  }

  100% {
    transform: rotateY(360deg)
  }
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.10);
  }
  100% {
    transform: scale(1);
  }
}
</style>