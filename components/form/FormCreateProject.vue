<script setup lang="ts">
import { object, string, type InferType } from 'yup'
import type { FormSubmitEvent } from '#ui/types'
import { useProjectsApi } from '~/composable/useProjectApi'

const schema = object({
  name: string().required('Required')
})

type Schema = InferType<typeof schema>

const state = reactive({
  name: '',
})

// API-Funktionen importieren
const { createProject } = useProjectsApi()

// Loading-Status
const isLoading = ref(false)

// Fehler-Status
const error = ref(null)

// Erfolgs-Status
const success = ref(false)
const successMessage = ref('')

async function onSubmit(event: FormSubmitEvent<Schema>) {
  isLoading.value = true
  error.value = null
  success.value = false
  successMessage.value = ''
  
  console.log("SUBMIT")
  
  try {
    const { data, error: apiError } = await createProject(event.data)
    
    if (apiError.value) {
      error.value = apiError.value.message
      return
    } else {
      // Erfolgsbehandlung
      success.value = true
      successMessage.value = `Projekt "${event.data.name}" wurde erfolgreich erstellt!`
    }
    
    // Formular zurücksetzen
    state.name = ''
  } catch (e) {
    error.value = 'Ein Fehler ist aufgetreten'
    console.error(e)
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <h1 class="text-center">Create Project</h1>
  
  <!-- Error message -->
  <div v-if="error" class="error-message bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
    {{ error }}
  </div>
  
  <!-- Success message -->
  <div v-if="success" class="success-message bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
    {{ successMessage }}
  </div>
  
  <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
    <UFormGroup label="Name" name="name">
      <UInput v-model="state.name" />
    </UFormGroup>
    <UButton type="submit" :loading="isLoading">
      {{ isLoading ? 'Creating...' : 'Create' }}
    </UButton>
  </UForm>
</template>