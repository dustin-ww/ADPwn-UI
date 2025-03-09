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
  
  const getProject = async (uid: string) => {
    const { data, error } = await useFetch<Project>(`${baseUrl}/projects/${uid}`, {
      method: 'GET'
    })
    
    if (error.value) {
      throw new Error(error.value.message)
    }
    
    return data.value
  }

  //TODO
  const updateProject = async (uid: string, updateData: Partial<Project>) => {
    const { data, error } = await useFetch(`${baseUrl}/projects/${uid}`, {
      method: 'PATCH',
      body: updateData
    })
    
    if (error.value) {
      throw new Error(error.value.message)
    }
    
    return data.value
  }
  
  return {
    getProjects,
    createProject,
    getProject
  }
}