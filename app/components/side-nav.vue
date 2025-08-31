<script setup lang="ts">
import { navItems } from "~/constants/side-nav";
</script>

<template>
  <div class="p-5 min-w-60 bg-gray-800 min-h-screen">
    <UNavigationMenu orientation="vertical" :items="navItems" />
  </div>
</template>
