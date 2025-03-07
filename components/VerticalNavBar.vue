<script setup lang="ts">

const props = defineProps({
  links: {
    type: Array as () => Array<{
      label: string
      avatar?: {
        src: string
      }
      icon?: string
      to?: string
      badge?: number
    }>,
    required: true
  }
})
</script>

<template>
  <UVerticalNavigation :links="links" class="border-b border-gray-200 dark:border-gray-800" />
</template>