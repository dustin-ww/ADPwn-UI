<script setup lang="ts">

</script>

<template>
    <div class="w-full h-screen bg-primary-red"> <!-- h-screen für 100% der Bildschirmhöhe -->
      <div class="m-1 bg-black h-full grid grid-rows-[2fr,1fr,1fr,1fr]"> <!-- grid-rows für die Zeilenaufteilung -->
        <!-- Erste Zeile: DashboardGraphOverview (größer) -->
        <div class="row-span-4"> <!-- row-span-2 für doppelte Höhe -->
          <DashboardGraphOverview />
        </div>
  
        <!-- Zweite Zeile: DashboardRunningOverview -->
        <div>
          <DashboardRunningOverview />
        </div>
     <!-- Hauptinhalt -->
    

    <!-- Footer -->
    <footer class="p-4 bg-gray-100 dark:bg-gray-800 text-center object-bottom">
      <p>&copy; 2025 ADPwn</p>
    </footer>
        <!-- Dritte Zeile: DashboardLogOverview -->
        <div>
          <DashboardLogOverview />
        </div>
  
        <!-- Vierte Zeile: DashboardModuleOverview -->
        <div>
          <DashboardModuleOverview />
        </div>
      </div>
    </div>
  </template>