export default defineNuxtRouteMiddleware((to, from) => {
  // Store-Funktion aufrufen
  const project = useProjectStore()
  
  // Auf die richtige Property zugreifen
  const currentProject = computed(() => project.project.id)

  const isProjectInStore = currentProject.value !== null && currentProject.value !== '' && currentProject.value !== undefined
  
  // Wenn die Zielroute /start ist, keine Weiterleitung vornehmen
  if (to.path === '/start') {
    return
  }
  
  // Nur im Browser alert verwenden
  if (process.client) {
    console.log('Current Project ID:', currentProject.value)
  }
  
  // Prüfe, ob eine Projekt-ID existiert und nicht leer ist
  if (isProjectInStore) {
    return
  }

  if (isProjectInStore && to.path === '/start') {
    return navigateTo("/")
  }
  
  // Wenn keine Projekt-ID gesetzt ist und nicht bereits auf /start,
  // leite zur Start-Seite weiter
  if (to.path !== '/start') {
    return navigateTo('/start')
  }

})