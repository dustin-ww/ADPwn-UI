<script setup lang="ts">
import { object, string, type InferType } from 'yup'
import type { FormSubmitEvent } from '#ui/types'

const emit = defineEmits<{
  (e: 'submit', data: { name: string }): void
  (e: 'success'): void
}>()

const schema = object({
  name: string().required('Required')
})

type Schema = InferType<typeof schema>

const state = reactive({
  name: '',
})

const isLoading = ref(false)
const error = ref<string | null>(null)
const successMessage = ref('')

async function onSubmit(event: FormSubmitEvent<Schema>) {
  isLoading.value = true
  error.value = null
  successMessage.value = ''

  try {
    // Emit event to parent
    emit('submit', event.data)
    
    // Erfolgsbehandlung
    successMessage.value = `Projekt "${event.data.name}" wurde erfolgreich erstellt!`
    emit('success')
    
    // Formular zurücksetzen nach kurzer Verzögerung
    setTimeout(() => {
      state.name = ''
      successMessage.value = ''
    }, 1500)
    
  } catch (e: any) {
    error.value = e.message || 'Ein Fehler ist aufgetreten'
    console.error(e)
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="space-y-4">
    <h1 class="text-center text-xl font-semibold">Create Project</h1>

    <div v-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
      {{ error }}
    </div>

    <div v-if="successMessage" class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
      {{ successMessage }}
    </div>

    <UForm 
      :schema="schema" 
      :state="state" 
      class="space-y-4"
      @submit="onSubmit"
    >
      <UFormGroup label="Project Name" name="name">
        <UInput 
          v-model="state.name" 
          placeholder="Enter project name"
          autofocus
        />
      </UFormGroup>

      <UButton 
        type="submit" 
        :loading="isLoading"
        block
        variant="solid"
        :disabled="isLoading"
      >
        {{ isLoading ? 'Creating...' : 'Create Project' }}
      </UButton>
    </UForm>
  </div>
</template>