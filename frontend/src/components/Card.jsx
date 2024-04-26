function Card({ name, description }) {
  return (
    <div className="flex bg-gray-100 p-4 rounded-xl shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] gap-3 min-h-[132px]">
      <div className="w-[100px] h-[100px] bg-purple"></div>
      <div>
        <p className="text-xl font-extrabold">{name}</p>
        <p>{description}</p>
      </div>
    </div>
  );
}
export default Card;
