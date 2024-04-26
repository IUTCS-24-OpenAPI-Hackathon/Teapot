import { useState } from "react";
import useStore from "./store/store";
import Button from "./components/Button";
import { getAttractions } from "./services/geo";
import Header from "./components/Header";
import LocationForm from "./components/LocationForm";

function App() {
  const location = useStore((state) => state.location);
  const setLocation = useStore((state) => state.setLocation);

  return (
    <>
      <Header />
      <main>
        <LocationForm />
      </main>
    </>
  );
}

export default App;
