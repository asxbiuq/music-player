<template>
  <div class="playlist h-full flex-col gap-2">
    <Navbar />
    <RouterView v-slot="{ Component, route }">
      <template v-if="Component">
          <!-- 防止页面数据不更新,排除 PlaylistDetails组件,这里与Page插件不兼容!!!!!!名字还是PlaylistDetails -->
          <KeepAlive exclude="PlaylistDetails">
            <Suspense>
              <!-- 主要内容 -->
              <component :is="Component" :key="route" />

              <!-- 加载中状态 -->
              <template #fallback>
                <SkeletonUserPlaylists />
              </template>
            </Suspense>
          </KeepAlive>
      </template>
    </RouterView>
  </div>
</template>

