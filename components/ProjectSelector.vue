<script setup lang="ts">
const project = useProjectStore()
const currentProject = computed(() => project.project.name)
</script>

<template>
  <div class="flex justify-evenly place-content-center mt-3">
    <NuxtLink to="/start" class="ml-2">
        <UBadge class="mr-2" color="red" label="Current Project" variant="outline"/>
        <UBadge color="red" :label="currentProject" />
    </NuxtLink>
  </div>
</template>