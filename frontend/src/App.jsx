import { useState } from "react";
import useStore from "./store/store";
import Button from "./components/Button";
import { getAttractions } from "./services/geo";

function App() {
  const location = useStore((state) => state.location);
  const setLocation = useStore((state) => state.setLocation);

  const handleInput = (e) => {
    const newLocation = {
      ...location,
      [e.target.name]: Number([e.target.value]),
    };
    setLocation(newLocation);
    console.log(location);
  };

  const handleAutoLocate = (e) => {
    e.preventDefault();
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLocation({
          ...location,
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    getAttractions(location);
  };

  return (
    <main>
      <div className="w-[800px] mx-auto">
        <form className="flex flex-col gap-2">
          <div>
            <label htmlFor="">lat:</label>
            <input
              type="number"
              className="bg-slate-200 p-1"
              name="lat"
              value={location.lat ? location.lat : ""}
              onChange={handleInput}
            />
          </div>
          <div>
            <label htmlFor="">lat:</label>
            <input
              type="number"
              className="bg-gray-200 p-1"
              name="lon"
              value={location.lon ? location.lon : ""}
              onChange={handleInput}
            />
          </div>
          <div>
            <label htmlFor="">radius:</label>
            <input
              type="number"
              className="bg-gray-200 p-1"
              name="radius"
              value={location.radius ? location.radius : ""}
              onChange={handleInput}
            />
          </div>
          <div className="flex gap-4">
            <Button
              type="submit"
              onClick={handleInput}
            >
              Submit
            </Button>
            <Button
              type="submit"
              onClick={handleAutoLocate}
            >
              Auto
            </Button>
          </div>
        </form>
      </div>
    </main>
  );
}

export default App;
