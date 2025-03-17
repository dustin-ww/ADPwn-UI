<script setup lang="ts">
import { ref } from 'vue'
import { useProjectsApi } from '~/composable/useProjectApi'

const props = defineProps({
  moduleId: {
    type: String,
    required: true
  },
  moduleName: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['close'])
const isOpen = ref(true)

// Selection-Logik
const selected = ref<Array<any>>([])

const select = (row: any) => {
  const index = selected.value.findIndex(item => item.id === row.id)
  if (index === -1) {
    selected.value.push(row)
  } else {
    selected.value.splice(index, 1)
  }
}

const close = () => {
  isOpen.value = false
  emit('close')
}

const execute = async () => {
  try {
    console.log('Executing module:', props.moduleId)
    console.log('Selected targets:', selected.value)
    close()
  } catch (error) {
    console.error('Execution failed:', error)
  }
}

const toast = useToast()
const localProjectStore = useProjectStore()
const projectAPI = useProjectsApi()

const q = ref<string>('')

const { data: targets, refresh } = await useAsyncData('targets', 
  () => projectAPI.getProjectTargets(localProjectStore.project.id))

const columns = [
  { key: 'name', label: 'Name' },
  { key: 'ip_range', label: 'IP Range' }
]

const tableRows = computed(() => {
  return targets.value?.map(target => ({
    id: target.uid,
    name: target.name,
    ip_range: target.ip_range,
  })) || []
})

const filteredRows = computed(() => {
  if (!q.value) return tableRows.value

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
</script>

<template>
  <UModal v-model="isOpen">
    <div class="p-4">
      <h2 class="text-xl font-bold mb-4">Execute Module: {{ moduleName }}</h2>
      
      <div class="space-y-4">
        <h1 class="text-2xl">Select target for module execution...</h1>
        
        <div class="flex gap-4 mt-5">
          <UInput v-model="q" placeholder="Filter targets..." />
        </div>

        <UTable 
          v-model="selected"
          :empty-state="{ icon: 'i-heroicons-circle-stack-20-solid', label: 'No targets.' }"
          :columns="columns"
          :rows="filteredRows"
          @select="select"
          :ui="{ selected: 'bg-primary-50 dark:bg-primary-400/10' }"
        >
          <template #tr="{ row, index }">
            <tr 
              :class="[
                selected.some(item => item.id === row.id) 
                  ? 'bg-primary-50 dark:bg-primary-400/10 cursor-pointer' 
                  : 'cursor-pointer'
              ]"
              @click="select(row)"
            >
              <td v-for="col in columns" :key="col.key">
                {{ row[col.key] }}
              </td>
            </tr>
          </template>
        </UTable>

        <div class="flex justify-end gap-2">
          <UButton label="Cancel" color="gray" @click="close" />
          <UButton label="Execute" color="red" @click="execute" />
        </div>
      </div>
    </div>
  </UModal>
</template>