import { create } from 'zustand';

const useFareStore = create((set) => ({
  fare: null,
  setFare: (fareValue) => set({ fare: fareValue }),
}));

export default useFareStore;