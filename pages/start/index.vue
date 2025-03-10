<script setup lang='ts'>
import { useProjectsApi } from '~/composable/useProjectApi'
import { useProjectStore } from '~/stores/project'

definePageMeta({
  layout: false, 
})

const projectsApi = useProjectsApi()
const { data: projects, refresh } = await useAsyncData('projects', () => projectsApi.getProjects())

const tableRows = computed(() => {
  return projects.value?.map(project => ({
    id: project.uid,
    name: project.name,
    description: project.description,
    hasExpand: true 
  })) || []
})

const expand = ref({
  openedRows: [],
  row: {}
})

const session = useProjectStore()

const loadProject = (id: string, name: string) => {
  session.setProject(id, name)
  navigateTo("/")
}

const isOpen = ref(false)

const handleCreate = async (projectData: any) => {
  const { error } = await projectsApi.createProject(projectData)
  if (!error.value) {
    isOpen.value = false 
    refresh() 
  }
}
</script>

<template>
  <div class="flex flex-col h-screen">
    <!-- Logo -->
     <div class="grid">
      
    <img class="justify-self-center w-1/12 min-w-[100px] max-w-[150px] mx-6 mt-4" src="/ADPwnLogo.png">
  </div>
    <div class="flex-1 flex flex-col items-center overflow-hidden px-6">
      <div class="w-1/2 h-full flex flex-col">
        <div class="flex justify-between items-center mb-4">
          <h1 class="text-2xl font-bold">Select Project</h1>
          <UButton 
            label="Create New" 
            @click="isOpen = true"
            class="ml-auto"
          />
        </div>

        <div class="flex-1 overflow-auto">
          <UTable
            v-model:expand="expand"
            :rows="tableRows"
            :columns="[
              { key: 'name', label: 'Name', sortable: true, direction: 'desc' as const},
              { key: 'description', label: 'Description', sortable: true, direction: 'desc' as const }
            ]"
            class="min-w-[700px]"
          >
            <template #expand-action="{ row, isExpanded, toggle }">
              <div v-if="row.hasExpand" class="flex gap-2 items-center">
                <UButton
                  @click="loadProject(row.id, row.name)"
                  color="red"
                  variant="solid"
                  label="Load"
                  class="mr-2"
                />
                <UIcon 
                  :name="isExpanded ? 'i-heroicons:x-mark' : 'i-heroicons:information-circle'" 
                  class="w-5 h-5 cursor-pointer text-gray-500 hover:text-gray-700"
                  @click="toggle"
                />
              </div>
            </template>
            <template #empty-state>
              <div class="flex flex-col items-center justify-center py-6 gap-3">
                <span class="italic text-sm">No one here!</span>
                <UButton label="Create Project" />
              </div>
            </template>
          </UTable>
        </div>
      </div>
    </div>

    <UModal v-model="isOpen">
      <div class="flex justify-center items-center h-full p-6">
        <div class="p-6 rounded-lg shadow-lg w-full max-w-md">
          <FormCreateProject @submit="handleCreate"/>
        </div>
      </div>
    </UModal>
  </div>
</template>