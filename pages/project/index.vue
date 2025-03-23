<script setup lang="ts">
import { date, object, string, type InferType } from 'yup'
import type { FormSubmitEvent } from '#ui/types'
import { useProjectsApi } from '~/composable/useProjectApi'
import { ProjectUpdateSchema, type ProjectUpdate } from '~/schemas/project'
import type { RefSymbol } from '@vue/reactivity'

definePageMeta({
  layout: 'default'
})

const projectSchema = object({
  name: string().required('Required'),
  description: string()
})


const localProjectStore = useProjectStore()
const projectsApi = useProjectsApi()
const { data: project, refresh } = await useAsyncData('projects', () => 
  projectsApi.getProject(localProjectStore.project.id)
)

const toast = useToast()

// Zuerst mit leeren Werten initialisieren
const projectState = reactive({
  name: '',
  description: ''
})

// Dann mit watch aktualisieren, wenn Projektdaten geladen sind
watch(() => project.value, (newProject) => {
  if (newProject) {
    projectState.name = newProject.name || ''
    projectState.description = newProject.description || ''
  }
}, { immediate: true })

const onSubmit = async (event: FormSubmitEvent<ProjectUpdate>) => {
  try {
    // Wir verwenden die Daten aus dem Event
    const values = event.data || projectState
    
    // Erstellen eines leeren Aktualisierungsobjekts
    const updateData: Partial<ProjectUpdate> = {}
    
    // Debug-Ausgaben
    alert("Ursprüngliche Werte: " + project.value?.name + ", " + project.value?.description)
    alert("Neue Werte: " + values.name + ", " + values.description)
    
    // Vergleich mit expliziten String-Konvertierungen und Trim
    if (values.name?.trim() !== (project.value?.name || '').trim()) {
      updateData.name = values.name
      alert("Name wird aktualisiert: " + values.name)
    }
    
    if (values.description?.trim() !== (project.value?.description || '').trim()) {
      updateData.description = values.description
      alert("Beschreibung wird aktualisiert: " + values.description)
    }
    
    alert("UID: " + project.value?.uid)
    alert("Update-Daten: " + JSON.stringify(updateData))
    
    if (Object.keys(updateData).length === 0) {
      toast.add({ title: 'No changes detected', color: 'yellow' })
      return
    }
    
    await projectsApi.updateProject(project.value!.uid, updateData)
    toast.add({
      title: 'Project Update successful',
      color: 'green',
      timeout: 3000
    })


    await refreshNuxtData()
    await nextTick()
    const updatedName = updateData.name || project.value!.name 
    localProjectStore.setProject(project.value!.uid, updatedName)


  } catch (error) {
    toast.add({
      title: 'Update failed',
      description: error.message,
      color: 'red',
      timeout: 5000
    })
  }
}

const selected = ref([])
const isSingleTargetCreationOpen = ref(false)
const isTargetRangeCreationOpen = ref(false)
const singleTargetIP = ref('')
</script>

<template>
  <SharedHeading heading="Manage Project"></SharedHeading>
  <div class="grid justify-items-center">
    <UForm :schema="projectSchema" :state="projectState" class="space-y-4 w-2/5" @submit="onSubmit">
      <UFormField label="UID" name="uid" >
        <UInput disabled :placeholder="project?.uid"/>
      </UFormField>
      <UFormField label="Name" name="name" >
        <UInput :placeholder="project?.name" v-model="projectState.name" />
      </UFormField>
      <UFormField label="Description" name="description">
        <UTextarea :placeholder="project?.description" v-model="projectState.description"/>
      </UFormField>
      <UButton color="red" type="submit">
        Update
      </UButton>
    </UForm>
    <TargetList />
  </div>
</template>