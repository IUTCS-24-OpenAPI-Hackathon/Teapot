import axios from "axios";
const baseURL = "";

const getAttractions = async (info) => {
  const url = "http://localhost:3000/getAttractionsFromCity";
  const res = await axios.post(url, info);
  console.log(res.data);
  return res.data;
};

export { getAttractions };
