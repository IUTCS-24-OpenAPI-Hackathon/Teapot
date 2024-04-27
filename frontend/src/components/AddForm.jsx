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
      <div>
        <input
          className="bg-gray-300 py-2 px-4 rounded-xl shadow-[0_2px_3px_rgb(0,0,0,0.15)] w-full"
          placeholder="Write a review"
          name="name"
          value={data.name}
          onChange={handleChange}
        />
        <input
          className="bg-gray-300 py-2 px-4 rounded-xl shadow-[0_2px_3px_rgb(0,0,0,0.15)] w-full"
          placeholder="Write a review"
          name="description"
          value={data.description}
          onChange={handleChange}
        />
        <input
          className="bg-gray-300 py-2 px-4 rounded-xl shadow-[0_2px_3px_rgb(0,0,0,0.15)] w-full"
          placeholder="Write a review"
          name="city"
          value={data.city}
          onChange={handleChange}
        />
        <input
          className="bg-gray-300 py-2 px-4 rounded-xl shadow-[0_2px_3px_rgb(0,0,0,0.15)] w-full"
          placeholder="Write a review"
          name="lat"
          value={data.lat}
          onChange={handleChange}
          type="number"
        />
        <input
          className="bg-gray-300 py-2 px-4 rounded-xl shadow-[0_2px_3px_rgb(0,0,0,0.15)] w-full"
          placeholder="Write a review"
          name="lon"
          value={data.lon}
          onChange={handleChange}
          type="number"
        />
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </ModalBg>
  );
}
export default AddForm;
