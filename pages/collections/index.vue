<script setup lang="ts">
const columns = [{
  key: 'name',
  label: 'Name'
}, {
  key: 'title',
  label: 'Title'
}, {
  key: 'email',
  label: 'Email'
}, {
  key: 'role',
  label: 'Role'
}, {
  key: 'actions'
}]

const people = [{
  id: 1,
  name: 'Initial Network Enumeration',
  title: 'Front-end Developer',
  email: 'lindsay.walton@example.com',
  role: 'Member'
}, {
  id: 2,
  name: 'Domain Controller Enumeration ',
  title: 'Designer',
  email: 'courtney.henry@example.com',
  role: 'Admin'
}]

const items = row => [
  [{
    label: 'Edit',
    icon: 'i-heroicons-pencil-square-20-solid',
    click: () => console.log('Edit', row.id)
  }, {
    label: 'Duplicate',
    icon: 'i-heroicons-document-duplicate-20-solid'
  }], [{
    label: 'Archive',
    icon: 'i-heroicons-archive-box-20-solid'
  }, {
    label: 'Move',
    icon: 'i-heroicons-arrow-right-circle-20-solid'
  }], [{
    label: 'Delete',
    icon: 'i-heroicons-trash-20-solid'
  }]
]

const selected = ref([])
const q = ref('')

const filteredRows = computed(() => {
  if (!q.value) {
    return people
  }

  return people.filter((person) => {
    return Object.values(person).some((value) => {
      return String(value).toLowerCase().includes(q.value.toLowerCase())
    })
  })
})

const isCreateCollectionModalOpen = ref(false)
</script>

<template>
    <div class="grid grid-cols-5 flex mt-5">
        <SharedHeading class="col-span-4" heading="Manage Enumeration Collections"></SharedHeading>
        <ModalCreateCollection></ModalCreateCollection>

</div>
        <div class="flex px-3 py-3.5 border-b border-gray-200 dark:border-gray-700">
      <UInput v-model="q" placeholder="Filter collections..." />
    </div>

  <UTable v-model="selected" :rows="filteredRows" :columns="columns">
    <template #name-data="{ row }">
      <span :class="[selected.find(person => person.id === row.id) && 'text-primary-500 dark:text-primary-400']">{{ row.name }}</span>
    </template>

    <template #actions-data="{ row }">
      <UDropdown :items="items(row)">
        <UButton color="gray" variant="ghost" icon="i-heroicons-ellipsis-horizontal-20-solid" />
      </UDropdown>
    </template>
  </UTable>
</template>

