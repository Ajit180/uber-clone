import { create } from 'zustand';

const useDistanceStore = create((set) => ({
  distance: null,
  setDistance: (distanceValue) => set({ distance: distanceValue }),
}));

export default useDistanceStore;