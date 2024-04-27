import Suggestion from "./Suggestion";

function Suggestions({ suggestions, handleClick }) {
  return (
    <div className="max-h-[170px] overflow-auto">
      {suggestions.map((sugg) => (
        <Suggestion
          suggestion={sugg}
          key={sugg.properties.osm_id}
          handleClick={handleClick}
        />
      ))}
    </div>
  );
}
export default Suggestions;
