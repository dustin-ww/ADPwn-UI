// composables/useAuth.ts
export const useAuth = () => {
    // Verwende useState aus Nuxt, um den Auth-Status zu speichern
    const isAuthenticated = useState<boolean>('auth:isAuthenticated', () => {
      // Initialisiere den Wert hier direkt, statt in onMounted
      if (process.client) {
        // Nur auf Client-Seite ausführen
        const token = localStorage.getItem('auth_token')
        return !!token
      }
      return false
    })
    
    // Funktionen zum Anmelden/Abmelden
    const login = async (credentials: { email: string, password: string }) => {
      // API-Aufruf zur Authentifizierung
      // ...
      isAuthenticated.value = true
      if (process.client) {
        localStorage.setItem('auth_token', 'dein-token')
      }
    }
    
    const logout = () => {
      isAuthenticated.value = false
      if (process.client) {
        localStorage.removeItem('auth_token')
      }
    }
    
    return {
      isAuthenticated: computed(() => isAuthenticated.value),
      login,
      logout
    }
  }