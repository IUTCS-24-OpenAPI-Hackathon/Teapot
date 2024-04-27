import axios from "axios";

const baseUrl = "http://localhost:3000/api";

const signup = async (info) => {
  const res = await axios.post(`${baseUrl}/signup`, info);
  localStorage.setItem("user", JSON.stringify(res.data));
  return res.data;
};

const verifyUser = async (id) => {
  const res = await axios.get(`${baseUrl}/user/verify/${id}`);
  localStorage.setItem("user", JSON.stringify(res.data));
  return res.data;
};

const login = async (info) => {
  const res = await axios.post(`${baseUrl}/loginUser`, info);
  localStorage.setItem("user", JSON.stringify(res.data));
  return res.data;
};

const logout = async () => {
  const res = await axios.get(`${baseUrl}/logout`);
  localStorage.removeItem("user");
};

const isLoggedIn = () => {
  console.log(!!localStorage.getItem("user"));
  return !!localStorage.getItem("user");
};

const getFromLocal = () => {
  console.log(JSON.parse(localStorage.getItem("user")));
  return JSON.parse(localStorage.getItem("user"));
};

export default {
  signup,
  verifyUser,
  login,
  logout,
  isLoggedIn,
  getFromLocal,
};
