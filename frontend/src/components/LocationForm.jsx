import Button from "./Button";
import useStore from "../store/store";
import Input from "./Input";
import { getAttractions } from "../services/geo";

function LocationForm() {
  const location = useStore((state) => state.location);
  const setLocation = useStore((state) => state.setLocation);

  const handleInput = (e) => {
    const newLocation = {
      ...location,
      [e.target.name]: Number([e.target.value]),
    };
    setLocation(newLocation);
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
    <div>
      <form className="flex justify-center mt-6 w-[40%] mx-auto">
        <div className="flex flex-col">
          <div className="flex gap-10">
            <div>
              <Input
                name="lat"
                type="number"
                value={location.lat}
                onChange={handleInput}
              >
                Latitude:
              </Input>
            </div>
            <div>
              <Input
                name="lon"
                type="number"
                value={location.lon}
                onChange={handleInput}
              >
                Longitude:
              </Input>
            </div>
          </div>
          <div className="flex gap-10 items-center">
            <div>
              <Input
                name="radius"
                type="number"
                value={location.radius}
                onChange={handleInput}
              >
                Radius:
              </Input>
            </div>
            <div className="flex gap-4 mt-5 w-full justify-center">
              <Button
                color="dark"
                type="submit"
                onClick={handleAutoLocate}
                classes="w-full text-dark bg-transparent border border-solid border-dark hover:bg-dark hover:text-white active:bg-dark font-bold uppercase text-xs rounded-full outline-none focus:outline-none ease-linear transition-all duration-150"
              >
                Use My Location
              </Button>
            </div>
          </div>
          <Button
            color="purple"
            type="submit"
            onClick={handleSubmit}
            classes="text-bright text-l uppercase mt-6 font-bold border border-solid border-dark hover:bg-bright hover:text-dark active:bg-dark rounded-full outline-none focus:outline-none ease-linear transition-all duration-150"
          >
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
}
export default LocationForm;
