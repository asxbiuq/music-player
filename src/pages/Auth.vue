<template>

  <div class="grid-container">
    <div class="shell">
      <div class="image img "></div>
      <div class="auth form bg-slate-400 overflow-hidden">
        <!-- <Transition name="form">
          <router-view class="bg-gray h-full" />
        </Transition> -->
        <!-- 由于<router-view> can no longer be used directly inside <transition> or <keep-alive>.改写为:-->

          <router-view v-slot="{ Component }" class="bg-gray h-full">
            <transition name="form">
              <component :is="Component" />
            </transition>
          </router-view>

      </div>
    </div>

  </div>
</template>

<script setup>
import 'animate.css';


</script>

<style scoped>
.shell {
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

.grid-container {
  display: grid;
  grid-template-columns: 0.4fr 1.1fr 1fr;
  grid-template-rows: 0.5fr 1.8fr 0.7fr 1fr;
  gap: 0em 0em;
  grid-auto-flow: row;
  grid-template-areas:
    ". . ."
    "shell shell shell"
    "shell shell shell"
    ". . .";
  height: 100vh;
}

.shell {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  gap: 0px 0px;
  grid-auto-flow: row;
  grid-template-areas:
    "image image auth"
    "image image auth"
    "image image auth";
  grid-area: shell;
  margin: 0 10vw;
}

.image {
  grid-area: image;
  background-image: url("@/assets/201515-158211451517f1.jpg");

}

.auth {
  grid-area: auth;
}

@media screen and (max-width: 900px) {
  .shell {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr;
    gap: 0px 0px;
    grid-auto-flow: row;
    grid-template-areas:
      "auth auth auth"
      "auth auth auth"
      "auth auth auth";
    grid-area: shell;
    margin: 0 10vw;
  }
}
</style>