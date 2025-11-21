import { create } from 'zustand';

export const useFilterStore = create((set) => ({
  category: null,
  priceRange: { min: 0, max: 1000000 },
  materials: [],
  colors: [],
  sortBy: 'popular',
  
  setCategory: (category) => set({ category }),
  setPriceRange: (range) => set({ priceRange: range }),
  setMaterials: (materials) => set({ materials }),
  setColors: (colors) => set({ colors }),
  setSortBy: (sortBy) => set({ sortBy }),
  resetFilters: () => set({
    category: null,
    priceRange: { min: 0, max: 1000000 },
    materials: [],
    colors: [],
    sortBy: 'popular'
  })
}));