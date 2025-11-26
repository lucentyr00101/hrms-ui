<script setup lang="ts">
const searchQuery = ref<string>('')

const emit = defineEmits<{
  toggleSidebar: []
}>()

const handleSearch = (): void => {
  const query = searchQuery.value.trim()
  if (query) {
    navigateTo(`/search?q=${encodeURIComponent(query)}`)
  }
}

const handleSignOut = async (): Promise<void> => {
  const authToken = useCookie('auth_token')
  authToken.value = null
  await navigateTo('/auth/login')
}
</script>

<template>
  <header class="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 px-4 py-3 flex items-center justify-between">
    <div class="flex items-center gap-4">
      <UButton 
        variant="ghost" 
        size="sm"
        icon="i-material-symbols:menu"
        @click="emit('toggleSidebar')"
      />
    </div>

    <div class="flex-1 max-w-xl mx-4">
      <UInput
        v-model="searchQuery"
        placeholder="Search employees, interviews, or documents..."
        size="sm"
        icon="i-material-symbols:search"
        @keydown.enter="handleSearch"
      />
    </div>

    <div class="flex items-center gap-3">
      <UButton 
        variant="ghost" 
        size="sm"
        icon="i-material-symbols:notifications"
      />

      <div class="flex items-center gap-2">
        <UAvatar
          alt="User Avatar" 
          size="sm"
          icon="i-material-symbols:person"
        />
        <span class="hidden sm:block text-sm font-medium text-gray-700 dark:text-gray-300">
          Admin User
        </span>
        <UButton 
          variant="ghost" 
          size="sm"
          icon="i-material-symbols:logout"
          @click="handleSignOut"
        />
      </div>
    </div>
  </header>
</template>