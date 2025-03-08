<script setup lang='ts'>
const people = [{
  id: 1,
  name: 'ADPwn 1',
  description: 'Example Project',
  created_at: '09-04-2010',
  hasExpand: true
}, {
  id: 2,
  name: 'Courtney Henry',
  title: 'Designer',
  email: 'courtney.henry@example.com',
  role: 'Admin',
  hasExpand: true
}, {
  id: 3,
  name: 'Tom Cook',
  title: 'Director of Product',
  email: 'tom.cook@example.com',
  role: 'Member',
  hasExpand: true
}, {
  id: 4,
  name: 'Whitney Francis',
  title: 'Copywriter',
  email: 'whitney.francis@example.com',
  role: 'Admin',
  hasExpand: true
}, {
  id: 5,
  name: 'Leonard Krasner',
  title: 'Senior Designer',
  email: 'leonard.krasner@example.com',
  role: 'Owner',
  hasExpand: true
}, {
  id: 6,
  name: 'Floyd Miles',
  title: 'Principal Designer',
  email: 'floyd.miles@example.com',
  role: 'Member',
  hasExpand: true
}]

const expand = ref({
  openedRows: [people.find(v => v.hasExpand)],
  row: {}
})

const isOpen = ref(false)
</script>

<template>
  <div class="m-2">
    <div class="grid grid-flow-col">
      <h1 class="text-3xl">Projects</h1>
      <div class="justify-self-end">
        <UButton label="Create New" @click="isOpen = true" />
        <UModal v-model="isOpen">
          <div class="p-4">
            <FormCreateProject />
          </div>
        </UModal>
      </div>
    </div>
    <UTable v-model:expand="expand" :rows="people">
      <template #expand="{ row }">
        <div class="p-4">
          <pre>{{ row }}</pre>
        </div>
      </template>
      <template #expand-action="{ row, isExpanded, toggle }">
        <div v-if="row.hasExpand" class="flex gap-2 items-center">
          <UIcon 
            :name="isExpanded ? 'i-heroicons:x-mark' : 'i-heroicons:information-circle'" 
            class="w-5 h-5 cursor-pointer text-gray-500 hover:text-gray-700"
            @click="toggle"
          />
          <UButton @click="loadData(row)" color="red">
            Load
          </UButton>
        </div>
      </template>
      <template #empty-state>
        <div class="flex flex-col items-center justify-center py-6 gap-3">
          <span class="italic text-sm">No one here!</span>
          <UButton label="Add people" />
        </div>
      </template>
    </UTable>
  </div>
</template>

