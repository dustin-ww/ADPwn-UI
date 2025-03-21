import type { ADPwnInheritanceGraph, ADPwnModule } from "~/types"

export const useADPwnModuleApi = () => {
    const config = useRuntimeConfig()
    const baseUrl = config.public.apiBaseUrl

    const getAllModules = async () => {
      const {data, error} = await useFetch<ADPwnModule[]>(`${baseUrl}/adpmod/`, {
        method: 'GET'
      })
  
      if (error.value) {
        throw new Error(error.value.message)
      }
  
      return data.value || []
    }
    
    const getModuleInheritanceGraph = async () => {
      const {data, error} = await useFetch<ADPwnInheritanceGraph>(`${baseUrl}/adpmod/graph`, {
        method: 'GET'
      })
  
      if (error.value) {
        throw new Error(error.value.message)
      }

      return data.value
    }

    return {
    getAllModules,
    getModuleInheritanceGraph
    }

}

