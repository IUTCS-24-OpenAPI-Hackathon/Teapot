function Suggestion({ suggestion, handleClick }) {
  return (
    <div
      className="w-[90%] mx-auto py-2 px-10 bg-gray-100 shadow-[0_2px_3px_rgb(0,0,0,0.15)] rounded-xl my-2 cursor-pointer"
      onClick={() => handleClick(suggestion.properties.osm_id)}
    >
      <div className="text-m">
        <p className="">
          {suggestion.properties.name}, {suggestion.properties.country}
        </p>
      </div>
    </div>
  );
}
export default Suggestion;
