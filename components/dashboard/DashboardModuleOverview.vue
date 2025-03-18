<script setup lang="ts">
import { ref, computed } from 'vue'
import { useADPwnModuleApi } from '~/composable/useADPwnModuleApi'
import { ADPwnModuleTypes } from '~/model/ADPwnModuleTypes';

const ncolumns = [
  { key: 'badge', label: 'Type', sortable: true, direction: 'desc' as const },
  { key: 'name', label: 'Name', sortable: true, direction: 'desc' as const },
  { key: 'description', label: 'Description' },
  { key: 'version', label: 'Version'},
  { key: 'author', label: 'Author'},
  { key: 'actions', label: 'Actions' }
];

const adpwnModuleApi = useADPwnModuleApi();
const { data: modules, refresh } = await useAsyncData('modules', () => adpwnModuleApi.getAllModules());

// State für Modal
const showModal = ref(false);
const selectedModuleId = ref<string | null>(null);
const selectedModuleName = ref<string | null>(null);

const tableRows = computed(() => {
  return modules.value?.map(module => ({
    id: module.uid,
    badge: module.module_type,
    name: module.name,
    description: module.description,
    version: module.version,
    author: module.author,
    moduleType: module.module_type,
    actions: module.uid
  })) || [];
});

const runModule = (moduleId: string, moduleName: string) => {
  selectedModuleId.value = moduleId;
  selectedModuleName.value = moduleName;
  showModal.value = true;
};
</script>

<template>
  <div>
    <UTable 
      :columns="ncolumns" 
      :rows="tableRows"
    >
    
      <template #badge-data="{ row }">
        <UBadge 
          v-if="row.moduleType == ADPwnModuleTypes.ATTACK"
          color="red"
          variant="solid"
          label="Attack"
        />
        <UBadge 
          v-else
          color="gray"
          variant="solid"
          label="Enumeration"
        />
      </template>

      <template #actions-data="{ row }">
        <UButton
          variant="ghost"
          color="primary"
          icon="i-heroicons-play-20-solid"
          @click="runModule(row.id, row.name)"
          title="Modul ausführen"
        />
      </template>
    </UTable>

    <!-- Modal -->
    <ModalSelectTarget
      v-if="showModal"
      :module-id="selectedModuleId"
      :module-name="selectedModuleName"
      @close="showModal = false"
    />
  </div>
</template>
