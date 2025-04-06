<script setup lang="ts">
import MapDisplay from '@/components/MapDisplay.vue'
</script>

<template>
  <main>
    <h1>Interactive Map</h1>
    <p>This page displays an SVG map from the assets folder.</p>
    <MapDisplay />
  </main>
</template>

<style scoped>
main {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
}

h1 {
  margin-bottom: 1rem;
}
</style>