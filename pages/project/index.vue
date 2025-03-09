<script setup lang="ts">
import { date, object, string, type InferType } from 'yup'
import type { FormSubmitEvent } from '#ui/types'
import { useProjectsApi } from '~/composable/useProjectApi'

const schema = object({
  email: string().email('Invalid email').required('Required'),
  password: string()
    .min(8, 'Must be at least 8 characters')
    .required('Required')
})

type Schema = InferType<typeof schema>

const state = reactive({
  email: undefined,
  password: undefined
})

const localProjectStore = useProjectStore()
const projectsApi = useProjectsApi() 
const { data: project, refresh } = await useAsyncData('projects', () => projectsApi.getProject(localProjectStore.project.id))


async function onSubmit(event: FormSubmitEvent<Schema>) {
  // Do something with event.data
  console.log(event.data)
}
</script>

<template>
  <h1>Edit Project</h1>
  <h2>{{ project?.name }}</h2>
  <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
    <UFormGroup label="Name" name="name" >
      <UInput :placeholder="project?.name" v-model="state.email" />
    </UFormGroup>

    <UFormGroup label="Password" name="password">
      <UInput v-model="state.password" type="password" />
    </UFormGroup>

    <UButton type="submit">
      Submit
    </UButton>
  </UForm>
</template>

