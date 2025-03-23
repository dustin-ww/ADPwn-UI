<script setup lang="ts">
const props = defineProps({
  links: {
    type: Array as () => Array<{
      label?: string
      avatar?: {
        src: string
      }
      icon?: string
      to?: string
      badge?: number
      type?: 'divider' // Erlaubt das Einfügen eines Dividers
    }>,
    required: true
  }
})
</script>
<template>
  <UNavigationMenu orientation="vertical" :items="links" class="border-b border-gray-200 dark:border-gray-800">
    <template #default="{ link }">
      <template v-if="link.type === 'divider'">
        <hr class="my-2 border-gray-300 dark:border-gray-700 pointer-events-none" />
      </template>
      <template v-else>
        <span class="relative group-hover:text-red-500">{{ link.label }}</span>
      </template>
    </template>
  </UNavigationMenu>
</template>
