import { useState } from "react";
import ModalBg from "./ModalBg";
import axios from "axios";
import useStore from "../store/store";

function AddForm() {
  const user = useStore((state) => state.user);
  const [data, setData] = useState({
    name: "",
    description: "",
    city: "",
    lat: "",
    lon: "",
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: [e.target.value] });
  };

  const handleSubmit = async () => {
    const res = await axios.post(
      "http://localhost:3000/api/node",
      {
        name: data.name,
        description: data.description,
        city: data.city,
        lat: Number(data.lat),
        lon: Number(data.lon),
      },
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
  };

  return (
    <ModalBg>
      <div className="w-[80%] max-w-[500px] bg-bright text-dark rounded-lg p-6 flex flex-col gap-4">
        <input
          className="bg-gray-300 py-2 px-4 rounded-xl shadow-[0_2px_3px_rgb(0,0,0,0.15)] w-full"
          placeholder="Name"
          name="name"
          value={data.name}
          onChange={handleChange}
        />
        <input
          className="bg-gray-300 py-2 px-4 rounded-xl shadow-[0_2px_3px_rgb(0,0,0,0.15)] w-full"
          placeholder="Description"
          name="description"
          value={data.description}
          onChange={handleChange}
        />
        <input
          className="bg-gray-300 py-2 px-4 rounded-xl shadow-[0_2px_3px_rgb(0,0,0,0.15)] w-full"
          placeholder="City"
          name="city"
          value={data.city}
          onChange={handleChange}
        />
        <input
          className="bg-gray-300 py-2 px-4 rounded-xl shadow-[0_2px_3px_rgb(0,0,0,0.15)] w-full"
          placeholder="Latitude"
          name="lat"
          value={data.lat}
          onChange={handleChange}
          type="number"
        />
        <input
          className="bg-gray-300 py-2 px-4 rounded-xl shadow-[0_2px_3px_rgb(0,0,0,0.15)] w-full"
          placeholder="Longitude"
          name="lon"
          value={data.lon}
          onChange={handleChange}
          type="number"
        />
        <button
          className="bg-purple text-bright py-2 px-8 min-w-20 rounded-lg mt-2"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </ModalBg>
  );
}
export default AddForm;
