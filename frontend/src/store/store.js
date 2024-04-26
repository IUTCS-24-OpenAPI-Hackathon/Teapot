import { create } from "zustand";

const useStore = create((set) => ({
  location: {
    lat: "",
    lon: "",
    radius: "",
  },
  attractions: [],
  setAttractions: (newAttractions) =>
    set(() => ({ attractions: newAttractions })),
  setLocation: (newLocation) => set(() => ({ location: newLocation })),
}));

export default useStore;
