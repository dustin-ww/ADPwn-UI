<script setup lang='ts'>
import { useProjectsApi } from '~/composable/useProjectApi'
import { useProjectStore } from '~/stores/project'

const projectsApi = useProjectsApi()
const { data: projects, refresh } = await useAsyncData('projects', () => projectsApi.getProjects())

const tableRows = computed(() => {
  return projects.value?.map(project => ({
    id: project.uid,
    name: project.name,
    hasExpand: true 
  })) || []
})

const expand = ref({
  openedRows: [],
  row: {}
})

const session = useProjectStore()

// Projekt laden
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
  <div class="m-2">
    <div class="grid grid-flow-col">
      <div class="justify-self-end">
        <UButton label="Create New" @click="isOpen = true" />
        <UModal v-model="isOpen">
          <div class="p-4">
            <FormCreateProject @submit="handleCreate"/>
          </div>
        </UModal>
      </div>
    </div>
    <UTable 
      v-model:expand="expand" 
      :rows="tableRows"
      :columns="[
        { key: 'name', label: 'Name' },
        { key: 'type', label: 'Type' }
      ]"
    >
    <template #expand-action="{ row, isExpanded, toggle }">
        <div v-if="row.hasExpand" class="flex gap-2 items-center">
          <UButton
            @click="loadProject(row.id, row.name)"
            color="green"
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
</template>

