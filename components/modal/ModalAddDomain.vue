<script setup lang="ts">
import { object, string, type InferType } from 'yup'
import type { FormSubmitEvent } from '#ui/types'

const schema = object({
  name: string().required('Required'),
  fqdn: string()
    .min(8, 'Must be at least 8 characters')
    .required('Required')
})

type Schema = InferType<typeof schema>

const domainCreationState = reactive({
  name: undefined,
  fqdn: undefined
})

async function onSubmit(event: FormSubmitEvent<Schema>) {
  // Do something with event.data
  console.log(event.data)
}
const isOpen = ref(false)
</script>

<template>
  <div>
    <UButton label="Create Domain" @click="isOpen = true" />

    <UModal v-model="isOpen" prevent-close>
      <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
        <template #header>
          <div class="flex items-center justify-between">
            <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
              Create Domain
            </h3>
            <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1" @click="isOpen = false" />
          </div>
        </template>

        <UForm :schema="schema" :state="domainCreationState" class="space-y-4" @submit="onSubmit">
    <UFormGroup label="Name*" name="name">
      <UInput v-model="domainCreationState.name" placeholder="Example Root Domain"/>
    </UFormGroup>

    <UFormGroup label="FQDN*" name="fqdn">
      <UInput v-model="domainCreationState.fqdn" placeholder="ad.example.xyz"/>
    </UFormGroup>

    <UButton color="red" type="submit">
      Create
    </UButton>
  </UForm>
      </UCard>
    </UModal>
  </div>
</template>

