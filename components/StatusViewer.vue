<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useStatusApi } from '~/composable/useStatusApi';

const { getStatus } = useStatusApi(); 
const apiStatus = ref('Loading...'); 
const isOnline = ref(false); 

onMounted(async () => {
  try {
    const { data, error } = await getStatus();
    if (error.value) {
      apiStatus.value = 'Offline';
      isOnline.value = false;
    } else {
      apiStatus.value = 'Online';
      isOnline.value = true;
    }
  } catch (err) {
    apiStatus.value = 'Error checking API status';
    isOnline.value = false;
  }
});
</script>

<template>
  <div class="flex self-end h-max cursor-default w-full">
    <div class="flex items-center justify-center w-full gap-2">
      <p class="text-gray-400">API: {{ apiStatus }}</p>
      <UIcon
        name="material-symbols:circle"
        :style="{ color: isOnline ? 'green' : 'red' }"
        class="w-5 h-5"
      />
    </div>
  </div>
</template>