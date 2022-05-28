<template>

  <div class="container">
    <div class="left img"></div>
    <div class="right form">
      <router-view />
    </div>
  </div>
</template>

<script setup>

</script>

<style>
body {
  /* 设置背景渐变 */
  background-image: linear-gradient(to left,
      #9c88ff, #3cadeb);
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
}

.left {
  width: 800px;
  height: 550px;
  background-image: url("assets/201515-158211451517f1.jpg");
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

form input {
  width: 230px;
  margin: 20px 0;
  outline: none;
  border: 0;
  padding: 10px;
  border-bottom: 3px solid rgb(80, 80, 170);
  font: 900 16px '';
}

form button {
  position: absolute;
  margin: 20px;
  bottom: 40px;
  display: block;
  width: 200px;
  height: 60px;
  font: 900 30px '';
  text-decoration: none;
  line-height: 50px;
  border-radius: 30px;
  background-image: linear-gradient(to left,
      #9c88ff, #3cadeb);
  text-align: center;
}
</style>