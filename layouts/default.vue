<script setup lang="ts">

const navbarlinks = [
  [{
    label: 'Installation',
    icon: 'i-heroicons-home',
    to: '/getting-started/installation'
  }, {
    label: 'Horizontal Navigation',
    icon: 'i-heroicons-chart-bar',
    to: '/components/horizontal-navigation'
  }, {
    label: 'Command Palette',
    icon: 'i-heroicons-command-line',
    to: '/components/command-palette'
  }], [{
    label: 'Github',
    icon: 'mdi:github',
    to: 'https://github.com/dustin-ww/ADPwn-UI',
    target: '_blank' 
  }, {
    label: 'More',
    icon: 'mdi:unfold-more-vertical',
    to: 'https://dw-security.com/',
    target: '_blank'
  }]
]


const sidebarlinks = [
  {
    label: 'Project',
    avatar: {
      src: 'https://avatars.githubusercontent.com/u/739984?v=4'
    },
    badge: 100
  },
  {
    label: 'Dashboard',
    icon: 'i-heroicons-home',
    to: '/'
  },
  {
    label: 'Hosts',
    icon: 'i-heroicons-chart-bar',
    to: '/hosts'
  },
  {
    label: 'Services',
    icon: 'i-heroicons-command-line',
    to: '/services'
  },
  {
    label: 'Users',
    icon: 'i-heroicons-command-line',
    to: '/users'
  },
  {
    label: 'Logs',
    icon: 'i-heroicons-command-line',
    to: '/logs'
  },
  {
    label: 'Loot',
    icon: 'i-heroicons-command-line',
    to: '/loot'
  }
]
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <!-- Navbar -->
    <NavigationNavbar :links="navbarlinks" />
    <div class="grid grid-cols-10 flex-grow">
        <div class="col-span-1">
            <NavigationSidebar :links="sidebarlinks" class="wi"/>
        </div>
        <div class="col-span-9">
            <main>
                <slot />
            </main>
        </div>
    </div>

  </div>
</template>