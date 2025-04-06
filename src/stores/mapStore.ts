import { defineStore } from 'pinia';

interface RegionInfo {
  id: string;
  name: string;
  hidden?: boolean;
}

interface EmployeeData {
  support: number;
  dev: number;
  description: string;
}

interface RegionListItem {
  id: string;
  name: string;
  hidden: boolean;
}

export const useMapStore = defineStore('map', {
  state: () => ({
    selectedRegion: '' as string,
    regionInfo: {
      id: '',
      name: 'Select a region on the map',
    } as RegionInfo,
    regions: {} as Record<string, RegionInfo>,
    employeeData: {} as Record<string, EmployeeData>,
    regionsList: [] as RegionListItem[],
  }),
  
  actions: {
    selectRegion(regionId: string) {
      this.selectedRegion = regionId;
      
      if (regionId && this.regions[regionId]) {
        this.regionInfo = this.regions[regionId];
      } else if (regionId) {
        // Create basic region info
        this.regionInfo = {
          id: regionId,
          name: `Region ${regionId.replace('region', '')}`
        };
        
        // Store for future use
        this.regions[regionId] = this.regionInfo;
      } else {
        // No region selected
        this.regionInfo = {
          id: '',
          name: 'Select a region on the map',
        };
      }
    },
    
    saveRegionEmployeeData(regionId: string, data: EmployeeData) {
      if (regionId) {
        this.employeeData[regionId] = { ...data };
        console.log(`Saved employee data for region ${regionId}:`, data);
      }
    },
    
    getRegionEmployeeData(regionId: string): EmployeeData | null {
      return this.employeeData[regionId] || null;
    },
    
    // Additional getters/actions for the report
    getAllRegionsWithData() {
      return Object.keys(this.employeeData).map(regionId => ({
        regionId,
        region: this.regions[regionId],
        data: this.employeeData[regionId]
      }));
    },

    getSummaryData() {
      let totalSupport = 0;
      let totalDev = 0;
      
      Object.values(this.employeeData).forEach(data => {
        totalSupport += data.support;
        totalDev += data.dev;
      });
      
      return {
        support: totalSupport,
        dev: totalDev,
        total: totalSupport + totalDev,
        regionsCount: Object.keys(this.regions).length,
        regionsWithDataCount: Object.keys(this.employeeData).length
      };
    },
    
    // New methods for region management
    initRegionsFromSVG() {
      // Find all region paths in the SVG
      setTimeout(() => {
        const regionPaths = document.querySelectorAll('.country-path');
        
        // Create region list from SVG elements
        this.regionsList = [];
        
        regionPaths.forEach(path => {
          const regionId = path.getAttribute('id') || '';
          
          if (regionId) {
            // Check if we already have data for this region
            const existingRegion = this.regions[regionId];
            
            // Add to regions list
            this.regionsList.push({
              id: regionId,
              name: existingRegion?.name || `Region ${regionId.replace('region', '')}`,
              hidden: existingRegion?.hidden || false
            });
            
            // If we don't have an entry yet in regions, create one
            if (!existingRegion) {
              this.regions[regionId] = {
                id: regionId,
                name: `Region ${regionId.replace('region', '')}`,
                hidden: false
              };
            }
          }
        });
        
        // Sort by region id
        this.regionsList.sort((a, b) => {
          const numA = parseInt(a.id.replace('region', '')) || 0;
          const numB = parseInt(b.id.replace('region', '')) || 0;
          return numA - numB;
        });
      }, 100); // Wait for SVG to be loaded
    },
    
    toggleRegionVisibility(regionId: string) {
      // Update in regionsList
      const regionInList = this.regionsList.find(r => r.id === regionId);
      if (regionInList) {
        regionInList.hidden = !regionInList.hidden;
      }
      
      // Update in regions
      if (this.regions[regionId]) {
        this.regions[regionId].hidden = regionInList?.hidden || false;
      }
      
      // Update SVG element visibility
      setTimeout(() => {
        const path = document.querySelector(`#${regionId}`);
        if (path) {
          if (regionInList?.hidden) {
            path.classList.add('region-hidden');
          } else {
            path.classList.remove('region-hidden');
          }
        }
      });
    },
    
    updateRegionName(regionId: string, newName: string) {
      // Update in regionsList
      const regionInList = this.regionsList.find(r => r.id === regionId);
      if (regionInList) {
        regionInList.name = newName;
      }
      
      // Update in regions
      if (this.regions[regionId]) {
        this.regions[regionId].name = newName;
      }
      
      // If this is the selected region, update regionInfo as well
      if (this.selectedRegion === regionId) {
        this.regionInfo.name = newName;
      }
    }
  },
  
  getters: {
    isRegionSelected: (state) => !!state.selectedRegion,
  },
});