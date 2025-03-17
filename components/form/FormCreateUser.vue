<script setup lang="ts">
import { object, string, type InferType } from 'yup'
import type { FormSubmitEvent } from '#ui/types'

const schema = object({
  email: string().email('Invalid email').required('Required'),
  password: string()
    .min(8, 'Must be at least 8 characters')
    .required('Required')
})

type Schema = InferType<typeof schema>

const userCreationState = reactive({
  username: '',
  ntlm: '',
  password: '',
  isAdmin: false
})

async function onSubmit(event: FormSubmitEvent<Schema>) {
  // Do something with event.data
  console.log(event.data)
}
</script>

<template>
    <h1>Create User</h1>
  <UForm :schema="schema" :state="userCreationState" class="space-y-4" @submit="onSubmit">
    <UFormGroup label="Username" name="username">
      <UInput v-model="userCreationState.username" />
    </UFormGroup>

    <UFormGroup label="Password" name="password">
      <UInput v-model="userCreationState.password"/>
    </UFormGroup>

    <UFormGroup label="NTLM" name="ntlm">
      <UInput disabled v-model="userCreationState.password"/>
    </UFormGroup>

    <UFormGroup name="ntlmuse">
        <UCheckbox label="use NTLM" :model-value="false" />
    </UFormGroup>



    <UFormGroup name="isAdmin">
        <UCheckbox label="is Admin" :model-value="false" />
    </UFormGroup>



    <UButton color="red" type="submit">
      Add User
    </UButton>
  </UForm>
</template>

