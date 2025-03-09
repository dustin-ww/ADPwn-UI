// stores/counter.ts
import { defineStore } from 'pinia'

export const useProjectStore = defineStore('project', {
  state: () => ({
    project: {
      name: '',
      id: ''
    }
  }),
  
  actions: {
    setProject(id: string, name: string) {
      this.project.id = id
      this.project.name = name
    },
    resetProject() {
      this.project.id = ''
      this.project.name = ''
      this.$reset()
      if (import.meta.client) {
        localStorage.removeItem('project') // Ersetze 'project' mit dem tatsächlichen Storage-Key
      }
    },
  },
  
  // Persistenz aktivieren
  persist: true
})