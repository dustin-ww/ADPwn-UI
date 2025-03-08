export const useProjectsApi = () => {
    const config = useRuntimeConfig()
    const baseUrl = config.public.apiBaseUrl 
  
    const getProjects = async () => {
      console.log("${baseUrl}/projects")
      return await useFetch(`${baseUrl}/projects`)
    }
  
    const createProject = async (projectData:any) => {
      return await useFetch(`${baseUrl}/projects/`, {
        method: 'POST',
        body: projectData
      })
    }
  
    return {
      getProjects,
      createProject
    }
}