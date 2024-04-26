import { create } from "zustand";

const useStore = create((set) => ({
  location: {
    lat: "",
    lon: "",
    radius: "",
  },
  shouldUseSearch: true,
  query: {
    lat: "",
    lon: "",
    radius: "",
  },
  selectedLocation: {},
  store: "",
  attractions: [],
  user: {},
  setAttractions: (newAttractions) =>
    set(() => ({ attractions: newAttractions })),
  setLocation: (newLocation) => set(() => ({ location: newLocation })),
  setQuery: (newQuery) => set(() => ({ query: newQuery })),
  setSearch: (newSearch) => set(() => ({ search: newSearch })),
  toggleInput: () =>
    set((state) => ({ shouldUseSearch: !state.shouldUseSearch })),
  setSelectedLocation: (newLocation) =>
    set(() => ({ selectedLocation: newLocation })),
  setUser: (newUser) => set(() => ({ user: newUser })),
}));

export default useStore;
