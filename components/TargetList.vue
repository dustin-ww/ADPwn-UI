<script setup lang="ts">
import { useProjectsApi } from '~/composable/useProjectApi';

const toast = useToast()
const localProjectStore = useProjectStore()
const projectAPI = useProjectsApi()

const q = ref<string>('') 

const {data: targets, refresh} = await useAsyncData('targets', () => projectAPI.getProjectTargets(localProjectStore.project.id))

const tableRows = computed(() => {
  return targets.value?.map(target => ({
    id: target.uid,
    name: target.name,
    ip_range: target.ip_range,
  })) || []
})

const filteredRows = computed(() => {
  if (!q.value) {
    return tableRows.value
  }

  return tableRows.value.filter((row) => {
    return Object.values(row).some((value) => {
      return String(value).toLowerCase().includes(q.value.toLowerCase())
    })
  })
})

const handleSuccesfulTargetCreation = () => {
  refresh()
  alert("cool")
}

const columns = [{
  key: 'id',
  label: 'UID'
}, {
  key: 'name',
  label: 'Name '
}, {
  key: 'ip_range',
  label: 'IP'
}]
</script>

<template>
  <h1 class="text-3xl">Targets</h1>
  <div class="flex gap-4 mt-5">
    <UInput v-model="q" placeholder="Filter targets..." />
  <ModalAddTarget @success="handleSuccesfulTargetCreation"></ModalAddTarget>
</div>
  <UTable 
    :empty-state="{ icon: 'i-heroicons-circle-stack-20-solid', label: 'No targets.' }"
    :columns="columns" 
    :rows="filteredRows" 
  />
</template>