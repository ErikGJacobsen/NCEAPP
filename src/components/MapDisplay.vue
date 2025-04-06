<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { useMapStore } from '../stores/mapStore';
import mapSvg from '../assets/map.svg';

// Use the map store
const mapStore = useMapStore();

// Fetch the SVG content
const svgContent = ref('');

// Track event listeners for cleanup
const eventListeners = ref<Array<{
  element: Element,
  listener: EventListenerOrEventListenerObject
}>>([]);

onMounted(async () => {
  try {
    const response = await fetch(mapSvg);
    const text = await response.text();
    
    // Process the SVG using fixed dimensions for 1920x1200 display
    let processedSvg = text.replace(/<svg([^>]*)>/, (match, attributes) => {
      // Extract the viewBox
      const viewBox = attributes.match(/viewBox="([^"]*)"/)?.[1] || '0 0 1920 1200';
      return `<svg viewBox="${viewBox}" width="100%" height="100%" preserveAspectRatio="xMidYMid meet">`;
    });
    
    svgContent.value = processedSvg;
    
    // Add click handlers after a short delay to ensure SVG is rendered
    setTimeout(() => {
      const countryPaths = document.querySelectorAll('.country-path');
      
      countryPaths.forEach((path: Element) => {
        const handleClick = (event: Event) => {
          // Remove selected class from all paths
          document.querySelectorAll('.country-path').forEach(p => {
            p.classList.remove('selected');
          });
          
          // Add selected class to clicked path
          const target = event.currentTarget as Element;
          target.classList.add('selected');
          
          // Update store with selected region
          const regionId = target.getAttribute('id');
          if (regionId) {
            mapStore.selectRegion(regionId);
          }
        };
        
        // Store reference for cleanup
        eventListeners.value.push({ element: path, listener: handleClick });
        
        path.addEventListener('click', handleClick);
      });
    }, 100);
  } catch (error) {
    console.error('Failed to load SVG:', error);
  }
});

onUnmounted(() => {
  eventListeners.value.forEach(({ element, listener }) => {
    element.removeEventListener('click', listener);
  });
});
</script>

<template>
  <div class="map-container">    
    <div class="svg-container" v-html="svgContent"></div>
  </div>
</template>

<style scoped>
.map-container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.svg-container {
  width: 100%;
  height: 100%;
  max-width: 1920px;
  max-height: 1200px;
}

:deep(.country-path) {
  fill: #e0e0e0;
  stroke: #ffffff;
  stroke-width: 1;
  transition: fill 0.3s ease;
  cursor: pointer;
}

:deep(.country-path:hover) {
  fill: #b0b0b0;
}

:deep(.country-path.selected) {
  fill: #4CAF50;
}
</style>