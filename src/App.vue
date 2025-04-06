<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavigationBar from './components/NavigationBar.vue'
</script>

<template>
  <NavigationBar />
  <div class="page-content">
    <RouterView />
  </div>
</template>

<style>
/* Global styles */
:root {
  --primary-color: #2196f3;
  --secondary-color: #90caf9;
  --background-color: #f5f5f5;
  --text-color: #333;
  --color-border: #ddd;
  --nav-height: 64px; /* Height of our navigation bar */
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: var(--text-color);
  background-color: var(--background-color);
  line-height: 1.6;
  width: 1920px;
  margin: 0 auto;
}

.page-content {
  padding-top: var(--nav-height);
  min-height: 1200px;
}

main {
  width: 1800px;
  margin: 0 auto;
  padding: 2rem 0;
}
</style>
