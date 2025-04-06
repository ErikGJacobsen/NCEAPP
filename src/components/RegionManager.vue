<script setup lang="ts">
import { useMapStore } from '../stores/mapStore';
import { ref, onMounted } from 'vue';

const mapStore = useMapStore();
const isVisible = ref(false);

// Toggle visibility of the region manager panel
const toggleVisibility = () => {
  isVisible.value = !isVisible.value;
};

// Function to toggle a region's visibility
const toggleRegionVisibility = (regionId: string) => {
  mapStore.toggleRegionVisibility(regionId);
};

// Function to update region name
const updateRegionName = (regionId: string, newName: string) => {
  mapStore.updateRegionName(regionId, newName);
};

// Initialize region data from SVG on mount
onMounted(() => {
  mapStore.initRegionsFromSVG();
});
</script>

<template>
  <div class="region-manager-container">
    <button class="toggle-button" @click="toggleVisibility">
      {{ isVisible ? 'Hide Regions' : 'Show Regions' }}
    </button>
    
    <div v-if="isVisible" class="region-panel">
      <h3>Region Manager</h3>
      
      <div class="region-list">
        <div v-for="region in mapStore.regionsList" :key="region.id" class="region-item">
          <div class="region-controls">
            <input 
              type="checkbox" 
              :id="'region-visibility-' + region.id" 
              :checked="!region.hidden"
              @change="toggleRegionVisibility(region.id)"
            />
            <label :for="'region-visibility-' + region.id">Show</label>
          </div>
          
          <div class="region-name-editor">
            <input 
              type="text"
              :value="region.name"
              @input="(e) => updateRegionName(region.id, (e.target as HTMLInputElement).value)"
              class="name-input"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.region-manager-container {
  position: relative;
  margin-bottom: 1rem;
}

.toggle-button {
  background-color: var(--primary-color, #2196f3);
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
}

.toggle-button:hover {
  background-color: #1976d2;
}

.region-panel {
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 10;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  padding: 1rem;
  width: 300px;
  max-height: 400px;
  overflow-y: auto;
  margin-top: 0.5rem;
}

.region-panel h3 {
  margin-top: 0;
  margin-bottom: 1rem;
  color: var(--primary-color, #2196f3);
}

.region-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.region-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem;
  border-bottom: 1px solid #eee;
}

.region-controls {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.name-input {
  padding: 0.3rem 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  width: 160px;
}

.name-input:focus {
  border-color: var(--primary-color, #2196f3);
  outline: none;
}
</style>