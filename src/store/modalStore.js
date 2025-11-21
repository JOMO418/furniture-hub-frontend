import { create } from 'zustand';

export const useModalStore = create((set) => ({
  isOpen: false,
  selectedProduct: null,
  
  openModal: (product) => set({ isOpen: true, selectedProduct: product }),
  closeModal: () => set({ isOpen: false, selectedProduct: null })
}));