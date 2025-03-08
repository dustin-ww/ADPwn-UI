export const useStatusApi = () => {
    const config = useRuntimeConfig()
    const baseUrl = config.public.apiBaseUrl 
  
    const getStatus = async () => {
      return await useFetch(`${baseUrl}/health`)
    }
  
    return {
      getStatus
    }
}