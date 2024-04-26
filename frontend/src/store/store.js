import { create } from "zustand";

const useStore = create((set) => ({
  location: {
    lat: "",
    lon: "",
    radius: "",
  },
  query: {
    lat: "",
    lon: "",
    radius: "",
  },
  store: "",
  attractions: [],
  setAttractions: (newAttractions) =>
    set(() => ({ attractions: newAttractions })),
  setLocation: (newLocation) => set(() => ({ location: newLocation })),
  setQuery: (newQuery) => set(() => ({ query: newQuery })),
  setSearch: (newSearch) => set(() => ({ search: newSearch })),
}));

export default useStore;
