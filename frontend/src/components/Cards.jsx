import useStore from "../store/store";
import Card from "./Card";

function Cards() {
  const attractions = useStore((state) => state.attractions);
  return (
    <div className="flex flex-col gap-6 w-[60%]">
      {attractions.map((item) => (
        <Card
          name={item.name}
          description={item.description}
        />
      ))}
    </div>
  );
}

export default Cards;
