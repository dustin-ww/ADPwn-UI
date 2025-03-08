<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useStatusApi } from '~/composable/useStatusApi';

const { getStatus } = useStatusApi(); // Make sure this matches your actual function name
const apiStatus = ref('Loading...'); // Initial state
const isOnline = ref(false); // To control the icon color

// Load data when component mounts
onMounted(async () => {
  try {
    const { data, error } = await getStatus();
    
    if (error.value) {
      apiStatus.value = 'API Offline';
      isOnline.value = false;
    } else {
      apiStatus.value = 'API Online';
      isOnline.value = true;
    }
  } catch (err) {
    apiStatus.value = 'Error checking API status';
    isOnline.value = false;
  }
});
</script>

<template>
  <div class="flex self-end h-max">
    <p>Api Status: {{ apiStatus }}</p>
    <UIcon
      name="material-symbols:expand-circle-down"
      :style="{ color: isOnline ? 'green' : 'red' }"
      class="w-5 h-5"
    />
  </div>
</template>