<template>

  <div class="playlist h-full flex-col gap-2">


    <RouterView v-slot="{ Component }">
      <template v-if="Component">
        <!-- <Transition mode="out-in"> -->
          <!-- 防止页面数据不更新,排除 PlaylistDetails组件,这里与Page插件不兼容!!!!!!名字还是PlaylistDetails -->
          <KeepAlive exclude="PlaylistDetails">
            <Suspense>
              <!-- 主要内容 -->
              <component :is="Component"></component>

              <!-- 加载中状态 -->
              <template #fallback class="bg-black-500">
                <SkeletonUserPlaylists/>
              </template>
            </Suspense>
          </KeepAlive>
        <!-- </Transition> -->
      </template>
    </RouterView>

  </div>
</template>
