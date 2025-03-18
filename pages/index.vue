<script setup lang="ts">

</script>

<template>
    <div class="w-full h-screen"> <!-- h-screen für 100% der Bildschirmhöhe -->
      <SharedHeading heading="Engine"></SharedHeading>
      <div class="m-1 h-full grid grid-rows-[2fr,1fr,1fr,1fr]"> <!-- grid-rows für die Zeilenaufteilung -->
        <!-- Erste Zeile: DashboardGraphOverview (größer) -->
        <div class="row-span-4"> <!-- row-span-2 für doppelte Höhe -->
          <DashboardGraphOverview />
        </div>
  
        <!-- Zweite Zeile: DashboardRunningOverview -->
        <!-- <div>
          <DashboardRunningOverview />
        </div> -->
     <!-- Hauptinhalt -->
    
        <!-- Dritte Zeile: DashboardLogOverview -->
        <!-- <div>
          <DashboardLogOverview />
        </div> -->
  
        <!-- Vierte Zeile: DashboardModuleOverview -->
        <div>
          <DashboardModuleOverview />
        </div>
      </div>
    </div>
  </template>