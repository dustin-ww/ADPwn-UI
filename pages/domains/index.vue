<script setup lang="ts">
const columns = [{
  key: 'name',
  label: 'Name'
}, {
  key: 'fqdn',
  label: 'FQDN'
}]

const people = [{
  name: 'Main Domain',
  fqdn: 'ad.xample.com',
}, {
  name: 'Second Domain',
  fqdn: 'ad.us.xample.com'
}]

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
</script>

<template>
  <div class="grid grid-cols-5 flex mt-5">
    <SharedHeading class="col-span-4" heading="Manage Domains"></SharedHeading>
    <ModalAddDomain class="justify-self-end mr-5"></ModalAddDomain>
  </div>
  
  <div>
    <div class="flex px-3 py-3.5 border-b border-gray-200 dark:border-gray-700">
      <UInput v-model="q" placeholder="Filter domains..." />
    </div>

    <UTable :rows="filteredRows" :columns="columns" />
  </div>
</template>

