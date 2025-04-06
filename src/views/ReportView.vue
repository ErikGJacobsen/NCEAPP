<script setup lang="ts">
import { useMapStore } from '../stores/mapStore';
import { computed } from 'vue';

// Use the map store
const mapStore = useMapStore();

// Get summary data for the report
const summaryData = computed(() => mapStore.getSummaryData());

// Get regions with data for detailed display
const regionsWithData = computed(() => {
  const regions = mapStore.getAllRegionsWithData();
  
  // Map to a more convenient format and sort by total employees (highest first)
  return regions
    .map(item => ({
      id: item.regionId,
      name: item.region?.name || `Region ${item.regionId}`,
      support: item.data.support,
      dev: item.data.dev,
      total: item.data.support + item.data.dev,
      description: item.data.description
    }))
    .sort((a, b) => b.total - a.total);
});

// Check if we have any data to display
const hasData = computed(() => regionsWithData.value.length > 0);
</script>

<template>
  <div class="report-container">
    <h1>IT Staff Report</h1>
    
    <div class="summary-card">
      <div class="summary-header">
        <h2>Summary</h2>
      </div>
      
      <div class="summary-content">
        <div class="summary-item">
          <span class="item-label">Total Support Staff:</span>
          <span class="item-value">{{ summaryData.support }}</span>
        </div>
        
        <div class="summary-item">
          <span class="item-label">Total Dev Staff:</span>
          <span class="item-value">{{ summaryData.dev }}</span>
        </div>
        
        <div class="summary-item total">
          <span class="item-label">Total IT Staff:</span>
          <span class="item-value">{{ summaryData.total }}</span>
        </div>
        
        <div class="summary-item">
          <span class="item-label">Regions with Data:</span>
          <span class="item-value">
            {{ summaryData.regionsWithDataCount }} of {{ summaryData.regionsCount }}
          </span>
        </div>
      </div>
    </div>
    
    <div class="detail-card">
      <div class="detail-header">
        <h2>Region Details</h2>
      </div>
      
      <div v-if="hasData" class="detail-table">
        <table>
          <thead>
            <tr>
              <th>Region</th>
              <th>Support</th>
              <th>Dev</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="region in regionsWithData" :key="region.id">
              <td>{{ region.name }}</td>
              <td>{{ region.support }}</td>
              <td>{{ region.dev }}</td>
              <td>{{ region.total }}</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td><strong>Totals</strong></td>
              <td><strong>{{ summaryData.support }}</strong></td>
              <td><strong>{{ summaryData.dev }}</strong></td>
              <td><strong>{{ summaryData.total }}</strong></td>
            </tr>
          </tfoot>
        </table>
      </div>
      
      <div v-else class="no-data">
        <p>No regions with employee data found.</p>
        <p>Go back to the map and add data to regions first.</p>
        <router-link to="/" class="back-button">Back to Map</router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
.report-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

h1 {
  color: var(--primary-color, #2196f3);
  margin-bottom: 1.5rem;
  text-align: center;
}

.summary-card, .detail-card {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
}

.summary-header, .detail-header {
  padding: 1rem;
  border-bottom: 1px solid var(--color-border, #ddd);
}

.summary-header h2, .detail-header h2 {
  color: var(--primary-color, #2196f3);
  margin: 0;
  font-size: 1.5rem;
}

.summary-content {
  padding: 1.5rem;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
}

.summary-item {
  display: flex;
  flex-direction: column;
}

.summary-item.total {
  grid-column: span 2;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 2px solid #f0f0f0;
}

.item-label {
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 0.25rem;
}

.item-value {
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
}

.total .item-value {
  font-size: 1.8rem;
  color: var(--primary-color, #2196f3);
}

.detail-table {
  padding: 1rem;
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  padding: 0.75rem 1rem;
  text-align: left;
}

th {
  background: #f5f5f5;
  border-bottom: 2px solid var(--color-border, #ddd);
}

td {
  border-bottom: 1px solid #eee;
}

tbody tr:hover {
  background-color: #f9f9f9;
}

tfoot td {
  border-top: 2px solid var(--color-border, #ddd);
  border-bottom: none;
}

.no-data {
  padding: 2rem;
  text-align: center;
  color: #666;
}

.back-button {
  display: inline-block;
  margin-top: 1rem;
  background-color: var(--primary-color, #2196f3);
  color: white;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-weight: 500;
}

.back-button:hover {
  background-color: #1976d2;
}
</style>