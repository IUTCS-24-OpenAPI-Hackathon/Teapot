import Cards from "./components/Cards";
import Header from "./components/Header";
import LocationForm from "./components/LocationForm";
import Map from "./components/Map";
import useStore from "./store/store";

function App() {
  const attractions = useStore((state) => state.attractions);
  return (
    <>
      <Header />
      <main>
        <div className="flex mt-6 p-4 gap-8 justify-evenly">
          {!!attractions.length && <Cards />}
          <LocationForm />
        </div>

        <Map />
      </main>
    </>
  );
}

export default App;
