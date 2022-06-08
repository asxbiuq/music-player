<template>
  <!-- 导航栏 -->
  <Navbar />
  <!-- 当使用layout插件时, <Suspense>需要放在Page里 -->
  <Suspense>
    <router-view />
  </Suspense>
</template>
<route>
{
  meta: {
    layout: "default"
  }
}
</route>
