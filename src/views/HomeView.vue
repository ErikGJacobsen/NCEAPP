<script setup lang="ts">
import { useMapStore } from '../stores/mapStore';
import MapDisplay from '../components/MapDisplay.vue';
import RegionManager from '../components/RegionManager.vue';
import { ref, watch } from 'vue';

// Use the map store
const mapStore = useMapStore();

// Form data
const formData = ref({
  support: 0,
  dev: 0,
  description: ''
});

// Track whether we're in edit mode
const isEditing = ref(false);

// Reset form and editing state when region changes
watch(() => mapStore.regionInfo.id, (newId) => {
  if (newId) {
    // If we have saved data, load it
    const savedData = mapStore.getRegionEmployeeData(newId);
    if (savedData) {
      formData.value = { ...savedData };
      isEditing.value = false; // Default to view mode when data exists
    } else {
      // Otherwise reset and go to edit mode
      formData.value = {
        support: 0,
        dev: 0,
        description: ''
      };
      isEditing.value = true; // Default to edit mode when no data exists
    }
  }
});

// Save data function
const saveEmployeeData = () => {
  mapStore.saveRegionEmployeeData(mapStore.regionInfo.id, { ...formData.value });
  isEditing.value = false; // Switch to view mode after saving
};

// Edit data function
const editEmployeeData = () => {
  isEditing.value = true; // Switch to edit mode
};
</script>

<template>
  <main>
    <h1 class="page-title">Map Explorer</h1>
    
    <div class="controls-container">
      <RegionManager />
    </div>
    
    <div class="content-layout">
      <section class="region-info">
        <h2>{{ mapStore.regionInfo.name }}</h2>
        
        <div v-if="mapStore.isRegionSelected">
          <!-- View Mode -->
          <div v-if="!isEditing && mapStore.getRegionEmployeeData(mapStore.regionInfo.id)" class="data-display">
            <div class="display-header">
              <h3>IT Employees</h3>
              <button @click="editEmployeeData" class="edit-button">Edit</button>
            </div>
            
            <div class="data-list">
              <div class="data-item">
                <span class="data-label">Support:</span>
                <span class="data-value">{{ formData.support }}</span>
              </div>
              
              <div class="data-item">
                <span class="data-label">Dev:</span>
                <span class="data-value">{{ formData.dev }}</span>
              </div>
              
              <div class="data-item description">
                <span class="data-label">Description:</span>
                <p class="data-value">{{ formData.description || 'No description provided' }}</p>
              </div>
            </div>
          </div>
          
          <!-- Edit Mode -->
          <div v-else class="employee-form">
            <h3>IT Employees</h3>
            
            <div class="form-group">
              <label for="support">Support:</label>
              <input 
                id="support" 
                type="number" 
                v-model="formData.support" 
                min="0"
              >
            </div>
            
            <div class="form-group">
              <label for="dev">Dev:</label>
              <input 
                id="dev" 
                type="number" 
                v-model="formData.dev" 
                min="0"
              >
            </div>
            
            <div class="form-group">
              <label for="description">Description:</label>
              <textarea 
                id="description" 
                v-model="formData.description" 
                rows="4"
              ></textarea>
            </div>
            
            <button @click="saveEmployeeData" class="save-button">Save</button>
          </div>
        </div>
        <p v-else class="select-prompt">
          Select a region on the map to add employee data.
        </p>
      </section>
      
      <div class="map-section">
        <MapDisplay />
      </div>
    </div>
  </main>
</template>

<style scoped>
.page-title {
  color: var(--primary-color);
  margin-bottom: 1.5rem;
  text-align: center;
  font-size: 24px;
}

.controls-container {
  width: 1800px;
  margin: 0 auto 1rem auto;
  text-align: right;
  padding-right: 1rem;
}

.content-layout {
  display: flex;
  flex-direction: row;
  gap: 20px;
  align-items: flex-start;
  width: 1800px;
  margin: 0 auto;
}

.region-info {
  width: 350px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 1rem;
  height: 800px;
  overflow: auto;
}

.map-section {
  width: 1400px;
}

/* Form styling */
.employee-form {
  margin-top: 1.5rem;
}

.employee-form h3 {
  margin-bottom: 1rem;
  color: var(--primary-color);
  font-size: 18px;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.3rem;
  font-weight: 500;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid var(--color-border);
  border-radius: 4px;
  font-family: inherit;
}

.save-button {
  background-color: var(--primary-color);
  color: white;
  border: none;
  padding: 0.6rem 1.2rem;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  margin-top: 0.5rem;
}

.save-button:hover {
  background-color: #1976d2;
}

/* Data display styling */
.data-display {
  margin-top: 1.5rem;
}

.display-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.display-header h3 {
  color: var(--primary-color);
  font-size: 18px;
  margin: 0;
}

.edit-button {
  background-color: #f0f0f0;
  border: 1px solid var(--color-border);
  color: #333;
  border-radius: 4px;
  padding: 0.3rem 0.8rem;
  font-size: 0.9rem;
  cursor: pointer;
}

.edit-button:hover {
  background-color: #e0e0e0;
}

.data-list {
  background-color: #f9f9f9;
  border-radius: 4px;
  padding: 1rem;
}

.data-item {
  margin-bottom: 0.75rem;
}

.data-item.description {
  margin-top: 1rem;
}

.data-label {
  font-weight: 500;
  margin-right: 0.5rem;
}

.data-value {
  color: #333;
}

.select-prompt {
  margin-top: 1.5rem;
  color: #666;
  font-style: italic;
}
</style>
