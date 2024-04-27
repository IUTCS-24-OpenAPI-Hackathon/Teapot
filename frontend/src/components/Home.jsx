import Cards from "./Cards";
import useStore from "../store/store";
import LocationForm from "./LocationForm";
import Map from "./Map";
import Search from "./Search";
import ModalBg from "./ModalBg";
import { Outlet } from "react-router-dom";

function Home() {
  const attractions = useStore((state) => state.attractions);
  const shouldUseSearch = useStore((state) => state.shouldUseSearch);
  const loading = useStore((state) => state.loading);
  return (
    <div>
      <Outlet />
      {shouldUseSearch ? (
        <>
          <Search />
          {loading && (
            <p className="font-semibold text-xl text-center my-4">Loading...</p>
          )}
          {!!attractions.length && <Map />}
        </>
      ) : (
        <div className="flex mt-4">
          {!!attractions.length && <Cards />}
          <LocationForm />
        </div>
      )}
    </div>
  );
}
export default Home;
