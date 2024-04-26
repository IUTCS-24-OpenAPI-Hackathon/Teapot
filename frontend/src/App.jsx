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

function App() {
  const attractions = useStore((state) => state.attractions);

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
          />
          <Route
            path="login"
            element={<Login />}
          />
          <Route
            path="signup"
            element={<Signup />}
          />
          <Route element={<RequireAuth />}></Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
