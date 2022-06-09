import { ref, onMounted, onUnmounted } from 'vue'
import { useEventListener } from './useEvent'
// 按照惯例，组合式函数名以“use”开头
export function useMouse() {
  // 被组合式函数封装和管理的状态,并使用$语法糖
  const x = $ref(0)
  const y = $ref(0)

  // 组合式函数可以随时更改其状态。
  function update(event) {
    x = event.pageX
    y = event.pageY
  }

  // 一个组合式函数也可以挂靠在所属组件的生命周期上
  // 来启动和卸载副作用
  useEventListener(window, 'mousemove', (event) => {
    x = event.pageX
    y = event.pageY
  })

  // 通过返回值暴露所管理的状态,
  //因为上面使用了$语法糖,return时需要再做一次转换,这里使用了$$()语法糖
  return $$({ x, y })
}