import { useState } from "react";

function AddForm() {
  const [data, setData] = useState({
    name: "",
    description: "",
    city: "",
    lat: "",
    lon: "",
  });
  return <div>AddForm</div>;
}
export default AddForm;
