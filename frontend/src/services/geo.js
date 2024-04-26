import axios from "axios";

const getAttractionsFromRadius = async (info) => {
  const url = "http://localhost:3000/getAttractions";
  const res = await axios.post(url, info);
  console.log(res.data);
  return res.data;
};

const getAttractions = async (info) => {
  const url = "http://localhost:3000/getAttractionsFromCity";
  const res = await axios.post(url, info);
  console.log(res.data);
  return res.data;
};

export { getAttractions, getAttractionsFromRadius };
