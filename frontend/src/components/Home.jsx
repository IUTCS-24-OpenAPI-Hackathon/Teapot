import Cards from "./Cards";
import useStore from "../store/store";
import LocationForm from "./LocationForm";
import Map from "./Map";
import Search from "./Search";

function Home() {
  const attractions = useStore((state) => state.attractions);
  return (
    <div>
      <Search />
      {!!attractions.length && <Map />}
    </div>
  );
}
export default Home;
