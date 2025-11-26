<script setup lang="ts">
const sidebarCollapsed = ref(false)
const showMobileSidebar = ref(false)
const isLargeScreen = ref(true)

const toggleSidebar = (): void => {
  if (isLargeScreen.value) {
    sidebarCollapsed.value = !sidebarCollapsed.value
  } else {
    showMobileSidebar.value = !showMobileSidebar.value
  }
}

const closeMobileSidebar = (): void => {
  showMobileSidebar.value = false
}

const updateScreenSize = (): void => {
  isLargeScreen.value = window.innerWidth >= 1024
  if (isLargeScreen.value) {
    showMobileSidebar.value = false
  }
}

onMounted(() => {
  updateScreenSize()
  window.addEventListener('resize', updateScreenSize)
})

onUnmounted(() => {
  window.removeEventListener('resize', updateScreenSize)
})
</script>

<template>
  <div class="flex h-screen overflow-hidden bg-gray-50 dark:bg-gray-900">
    <div 
      v-if="showMobileSidebar"
      class="lg:hidden fixed inset-0 bg-black/50 z-40"
      @click="closeMobileSidebar"
    />

    <div 
      :class="[
        'fixed lg:static inset-y-0 left-0 z-50 lg:z-auto transition-transform duration-300',
        showMobileSidebar ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      ]"
    >
      <SideNav :collapsed="sidebarCollapsed && isLargeScreen" />
    </div>

    <div class="flex-1 flex flex-col min-w-0 overflow-hidden">
      <TopBar @toggle-sidebar="toggleSidebar" />

      <main class="flex-1 p-4 lg:p-6 pb-20 lg:pb-6 overflow-y-auto">
        <NuxtPage />
      </main>
    </div>

    <BottomNav />
  </div>
</template>
