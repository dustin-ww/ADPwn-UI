<script setup lang="ts">
import { object, string, type InferType } from 'yup'
import { useProjectsApi } from '~/composable/useProjectApi';

const isOpen = ref(false)
const isLoading = ref(false)
const localProjectStore = useProjectStore()

const emit = defineEmits<{
  (e: 'success'): void
}>()


const targetSchema = object({
  ip: string().required('Required'),
  name: string()
})

const toast = useToast()
const targetState = reactive({
  ip: '',
  name: ''
})
const projectsApi = useProjectsApi()


type TargetSchema = InferType<typeof targetSchema>


async function onSubmit(event: FormSubmitEvent<TargetSchema>) {

  try {
    isLoading.value = true
    await projectsApi.createProjectTarget(localProjectStore.project.id, event.data)
    emit('success')
    toast.add({
      title: 'Target created',
      color: 'green',
      timeout: 3000
    })
  } catch (e:any) {
    toast.add({
      title: 'Target create failed',
      color: 'red',
      timeout: 3000
    })
  } finally {
    isLoading.value = false
  }
  
}

</script>

<template>
  <div>
    <UButton label="Add" @click="isOpen = true" />

    <UModal v-model="isOpen">
        <h1 class="text-center text-2xl mt-5">Add Target</h1>
      <div class="p-4">
        <UForm :schema="targetSchema" :state="targetState" class="space-y-4" @submit="onSubmit">
    <UFormGroup label="IP (allowed: 0.0.0.0 or 0.0.0.0/24)" name="ip">
      <UInput v-model="targetState.ip" />
    </UFormGroup>

    <UFormGroup label="Name" name="name">
      <UInput v-model="targetState.name" />
    </UFormGroup>

    <UButton color="red" :loading="isLoading" @click="isOpen = false" type="submit">
      {{ isLoading ? 'Adding Target...' : 'Add Target' }}
    </UButton>
  </UForm>
      </div>
    </UModal>
  </div>
</template>

