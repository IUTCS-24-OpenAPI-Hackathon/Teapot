import { create } from "zustand";

const useStore = create((set) => ({
  location: {
    lat: "",
    lon: "",
    radius: "",
  },
  setLocation: (newLocation) => set(() => ({ location: newLocation })),
}));

export default useStore;
