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
    icon: 'mdi:unfold-more-vertical'
    to: 'https://dw-security.com/',
    target: '_blank'
  }]
]


const links = [
  {
    label: 'Profile',
    avatar: {
      src: 'https://avatars.githubusercontent.com/u/739984?v=4'
    },
    badge: 100
  },
  {
    label: 'Installation',
    icon: 'i-heroicons-home',
    to: '/'
  },
  {
    label: 'Horizontal Navigation',
    icon: 'i-heroicons-chart-bar',
    to: '/'
  },
  {
    label: 'Command Palette',
    icon: 'i-heroicons-command-line',
    to: '/'
  }
]
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <!-- Navbar -->
    <HorizontalNavBar :links="navbarlinks" />
    <div class="grid grid-cols-10 flex-grow">
        <div class="col-span-1">
            <VerticalNavBar :links="links" class="wi"/>
        </div>
        <div>
            <main>
                <slot />
            </main>
        </div>
    </div>
    

    <!-- Hauptinhalt -->
    

    <!-- Footer -->
    <footer class="p-4 bg-gray-100 dark:bg-gray-800 text-center object-bottom">
      <p>&copy; 2025 ADPwn</p>
    </footer>
  </div>
</template>