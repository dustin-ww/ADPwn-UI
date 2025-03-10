import type { ProjectUpdate } from "~/schemas/project"

export const useProjectsApi = () => {
  const config = useRuntimeConfig()
  const baseUrl = config.public.apiBaseUrl
  
  const getProjects = async () => {
    const { data, error } = await useFetch<Project[]>(`${baseUrl}/projects/overviews`)
    if (error.value) {
      throw new Error(error.value.message)
    }
    return data.value || []
  }
  
  const createProject = async (projectData: any) => {
    return await useFetch(`${baseUrl}/projects/`, {
      method: 'POST',
      body: projectData
    })
  }

  const createProjectTarget = async (uid: string, targetData: any) => {
    const { data, error } = await useFetch(`${baseUrl}/projects/${uid}/targets`, {
      method: 'POST',
      body: targetData
    })
    
    if (error.value) {
      throw error.value
    }
    
    return data
  }

  
  const getProject = async (uid: string) => {
    const { data, error } = await useFetch<Project>(`${baseUrl}/projects/${uid}`, {
      method: 'GET'
    })
    
    if (error.value) {
      throw new Error(error.value.message)
    }
    
    return data.value
  }

  const getProjectTargets = async (uid: string) => {
    const {data, error} = await useFetch<Target[]>(`${baseUrl}/projects/${uid}/targets`, {
      method: 'GET'
    })

    if (error.value) {
      throw new Error(error.value.message)
    }

    return data.value || []
  }

  const updateProject = async (uid: string, updateData: Partial<ProjectUpdate>) => {
    alert(JSON.stringify(updateData))
    const { error, ...result } = await useFetch<Project>(
      `${baseUrl}/projects/${uid}`,
      {
        method: 'PATCH',
        body: JSON.stringify(updateData), 
        headers: {
          'Content-Type': 'application/merge-patch+json'
        },
        key: `update-project-${uid}-${Date.now()}`,
        server: import.meta.server,
        client: false
      }
    )
  
    if (error.value) {
      const errorData = error.value.data
      let message = 'Update failed'
      
      if (errorData?.error === 'INVALID_FIELD') {
        message = `Invalid field: ${errorData.detail}`
      } else if (errorData?.allowed_fields) {
        message = `Allowed fields: ${errorData.allowed_fields.join(', ')}`
      }
      
      throw new Error(message)
    }
  
    return result.data.value
  }
  
  
  
  return {
    getProjects,
    createProject,
    getProject,
    updateProject,
    getProjectTargets,
    createProjectTarget
  }
}