import Cards from "./components/Cards";
import Header from "./components/Header";
import LocationForm from "./components/LocationForm";

function App() {
  return (
    <>
      <Header />
      <main>
        <div className="flex mt-6 p-4 gap-8 justify-evenly">
          <Cards />
          <LocationForm />
        </div>
      </main>
    </>
  );
}

export default App;
