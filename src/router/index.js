import { createRouter, createWebHistory } from 'vue-router'
import { auth } from '@/firebase/config'
// import routes from '~pages'
import { setupLayouts } from 'virtual:generated-layouts'
import generatedRoutes from 'virtual:generated-pages'

const routes = setupLayouts(generatedRoutes)

const router = createRouter({
  history: createWebHistory(),
  routes
})
router.beforeEach((to, from, next) => {
  if ((to.name !== 'Auth-Login' || to.name !== 'Auth-Signup') && !auth.currentUser) next({ name: 'Auth-Login' })
  else next()
})

export default router
