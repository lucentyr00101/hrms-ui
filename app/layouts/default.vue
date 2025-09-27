<script setup lang="ts">
const sidebarCollapsed = ref(false);

const toggleSidebar = () => {
  sidebarCollapsed.value = !sidebarCollapsed.value;
};

// Handle mobile sidebar overlay
const showMobileSidebar = ref(false);
const toggleMobileSidebar = () => {
  showMobileSidebar.value = !showMobileSidebar.value;
};

// Close mobile sidebar when clicking outside
const closeMobileSidebar = () => {
  showMobileSidebar.value = false;
};

// Handle screen size changes
const isLargeScreen = ref(true);

onMounted(() => {
  const updateScreenSize = () => {
    isLargeScreen.value = window.innerWidth >= 1024; // lg breakpoint
    if (isLargeScreen.value) {
      showMobileSidebar.value = false;
    }
  };
  
  updateScreenSize();
  window.addEventListener('resize', updateScreenSize);
  
  onUnmounted(() => {
    window.removeEventListener('resize', updateScreenSize);
  });
});
</script>

<template>
  <div class="flex min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- Mobile Sidebar Overlay -->
    <div 
      v-if="showMobileSidebar"
      class="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
      @click="closeMobileSidebar"
    />

    <!-- Sidebar -->
    <div 
      :class="[
        'fixed lg:static inset-y-0 left-0 z-50 lg:z-auto transition-transform duration-300 ease-in-out',
        showMobileSidebar ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      ]"
    >
      <SideNav :collapsed="sidebarCollapsed && isLargeScreen" />
    </div>

    <!-- Main Content Area -->
    <div class="flex-1 flex flex-col min-w-0">
      <!-- Top Bar -->
      <TopBar @toggle-sidebar="isLargeScreen ? toggleSidebar() : toggleMobileSidebar()" />

      <!-- Page Content -->
      <main class="flex-1 p-4 lg:p-6 pb-20 lg:pb-6">
        <NuxtPage />
      </main>
    </div>

    <!-- Mobile Bottom Navigation -->
    <BottomNav />
  </div>
</template>
