import { useState } from "react";
import axios from "axios";
import Suggestions from "./Suggestions";
import useStore from "../store/store";
import { getAttractions } from "../services/geo";
import { Link } from "react-router-dom";

function Search() {
  const [search, setSearch] = useState("");
  const [sugg, setSugg] = useState([]);
  const [area, setArea] = useState({});
  const setAttractions = useStore((state) => state.setAttractions);
  const setQuery = useStore((state) => state.setQuery);
  const setLoading = useStore((state) => state.setLoading);

  const handleChange = async (e) => {
    setSearch(e.target.value);

    if (e.target.value.length > 2) {
      const res = await fetch(
        `https://photon.komoot.io/api/?q=${search}&limit=5`,
        { mode: "cors" }
      );
      let data = await res.json();
      data = data.features;
      data = data.filter((item) => {
        return (item.properties.type = "city");
      });
      setSugg(data);
    }

    if (e.target.value.length <= 2) {
      setSugg([]);
    }
  };

  const handleSearch = async () => {
    setSearch(e.target.value);

    if (e.target.value.length > 2) {
      const res = await fetch(
        `https://photon.komoot.io/api/?q=${search}&limit=5`,
        { mode: "cors" }
      );
      let data = await res.json();
      data = data.features;
      data = data.filter((item) => {
        return (item.properties.type = "city");
      });
      setSugg(data);
    }

    if (e.target.value.length <= 2) {
      setSugg([]);
    }
  };

  const handleClick = async (id) => {
    let place = sugg.find((item) => {
      return item.properties.osm_id == id;
    });
    let country = place.properties.country;
    place = {
      name: place.properties.name,
      lat: place.geometry.coordinates[1],
      lon: place.geometry.coordinates[0],
    };
    console.log(place);
    setSugg([]);
    setSearch(`${place.name}, ${country}`);
    setArea(place);
    setQuery({
      lat: place.lat,
      lon: place.lon,
      radius: 1000,
    });
    setLoading(true);
    const data = await getAttractions({
      lat: place.lat,
      lon: place.lon,
      city: place.name,
    });
    setLoading(false);
    setAttractions(data);
  };

  return (
    <div className="mb-6">
      <div className="w-[70%] max-w-[1200px] mx-auto mt-6">
        <div className="w-[80%] max-w-[650px] mx-auto relative">
          <Link
            to="/submission"
            className="bg-purple text-bright py-2 px-2 min-w-20 rounded-lg mt-3 absolute right-[-120px]"
          >
            Add Location
          </Link>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="26"
            height="26"
            viewBox="0 0 24 24"
            className="absolute top-4 left-3"
          >
            <path d="M 9 2 C 5.1458514 2 2 5.1458514 2 9 C 2 12.854149 5.1458514 16 9 16 C 10.747998 16 12.345009 15.348024 13.574219 14.28125 L 14 14.707031 L 14 16 L 20 22 L 22 20 L 16 14 L 14.707031 14 L 14.28125 13.574219 C 15.348024 12.345009 16 10.747998 16 9 C 16 5.1458514 12.854149 2 9 2 z M 9 4 C 11.773268 4 14 6.2267316 14 9 C 14 11.773268 11.773268 14 9 14 C 6.2267316 14 4 11.773268 4 9 C 4 6.2267316 6.2267316 4 9 4 z"></path>
          </svg>
          <input
            type="text"
            className="w-full py-4 pl-12 shadow-[0_2px_3px_rgb(0,0,0,0.15)] rounded-full border-[2px] border-solid border-[#e0e0e0] text-lg"
            value={search}
            onChange={handleChange}
            placeholder="Places to go, things to do, hotels..."
          />
          <button
            className="font-bold bg-purple py-3 px-6 text-bright rounded-full absolute right-4 top-2"
            onClick={handleSearch}
          >
            Search
          </button>
          {!!sugg.length && (
            <Suggestions
              suggestions={sugg}
              handleClick={handleClick}
            />
          )}
        </div>
      </div>
    </div>
  );
}
export default Search;
