import { useAuth } from "~/composable/useAuth"

export default defineNuxtRouteMiddleware((to, from) => {

    
    if (to.path === '/login') {
      return
    }

    // if (to.path !== '/login') {
    //   return navigateTo('/login')
    // }
  })