import { useAuth } from "~/composable/useAuth"

// middleware/auth.global.ts
export default defineNuxtRouteMiddleware((to, from) => {
    // Hole den Auth-Status über ein Composable oder Store

    
    // Wenn die Zielroute /login ist, keine Weiterleitung vornehmen
    if (to.path === '/login') {
      return
    }
    
    // Wenn Benutzer nicht eingeloggt ist und nicht bereits auf /login,
    // leite zur Login-Seite weiter
    // if (to.path !== '/login') {
    //   return navigateTo('/login')
    // }
  })