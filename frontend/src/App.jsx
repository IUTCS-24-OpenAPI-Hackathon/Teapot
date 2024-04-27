import { Route, Routes } from "react-router-dom";
import Cards from "./components/Cards";
import Header from "./components/Header";
import LocationForm from "./components/LocationForm";
import Map from "./components/Map";
import useStore from "./store/store";
import Layout from "./components/Layout";
import RequireAuth from "./components/RequireAuth";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Home from "./components/Home";
import ModalBg from "./components/ModalBg";
import LocationDetail from "./components/LocationDetail";
import { useEffect } from "react";

function App() {
  const attractions = useStore((state) => state.attractions);
  const selectedLocation = useStore((state) => state.selectedLocation);
  const setUser = useStore((state) => state.setUser);

  useEffect(() => {
    if (localStorage.getItem("user")) {
      setUser(JSON.parse(localStorage.getItem("user")));
    }
  }, []);

  return (
    <>
      <Header />
      <Routes>
        <Route
          path="/"
          element={<Layout />}
        >
          <Route
            path="/"
            element={<Home />}
          >
            <Route
              path="/location"
              element={<LocationDetail />}
            />
            <Route
              path="login"
              element={<Login />}
            />
            <Route
              path="signup"
              element={<Signup />}
            />
          </Route>
          <Route element={<RequireAuth />}></Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
