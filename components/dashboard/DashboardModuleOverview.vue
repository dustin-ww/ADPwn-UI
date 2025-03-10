<script setup lang="ts">
import { useADPwnModuleApi } from '~/composable/useADPwnModuleApi';

const ncolumns = [
  { key: 'name', label: 'Name', sortable: true, direction: 'desc' as const },
  { key: 'description', label: 'Description' },
  { key: 'version', label: 'Version'},
  { key: 'author', label: 'Author'},
  { key: 'actions', label: 'Actions' } // Neue Aktionsspalte
]

const adpwnModuleApi = useADPwnModuleApi()
const { data: modules, refresh } = await useAsyncData('modules', () => adpwnModuleApi.getAllModules())

const tableRows = computed(() => {
  return modules.value?.map(module => ({
    id: module.id, // Stellen Sie sicher, dass die Module eine ID haben
    name: module.name,
    description: module.description,
    version: module.version,
    author: module.author,
    actions: module.id // ID für die Aktion
  })) || []
})

// Run-Methode
const runModule = async (moduleId: string) => {
  try {
    //await adpwnModuleApi.executeModule(moduleId)
    console.log("Hi")
    // Erfolgsmeldung anzeigen
  } catch (error) {
    // Fehlerbehandlung
  }
}
</script>

<template>
  <UTable 
    :columns="ncolumns" 
    :rows="tableRows"
  >
    <!-- Custom Slot für die Actions-Spalte -->
    <template #actions-data="{ row }">
      <UButton
        variant="ghost"
        color="primary"
        icon="i-heroicons-play-20-solid"
        @click="runModule(row.id)"
        title="Modul ausführen"
      />
    </template>
  </UTable>
</template>