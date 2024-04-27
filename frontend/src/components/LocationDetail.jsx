function LocationDetail({ location }) {
  console.log(location);
  return (
    <div className="w-[80%] max-w-[500px] bg-bright text-dark rounded-lg p-6">
      <p className="font-bold text-xl">{location.name}</p>
      <p className="text-sm text-gray-600">{location.description}</p>
      <p className="font-semibold text-lg underline text-purple mt-2">
        Reviews
      </p>
      <div className="h-[196px] overflow-auto">
        <div className="bg-gray-300 py-2 px-4 rounded-xl mt-2">
          <p className="text-lg font-semibold">Mirza Adnan</p>
          <p className="ml-2 mt-[-4px] text-sm text-dark">Very good!</p>
        </div>
        <div className="bg-gray-300 py-2 px-4 rounded-xl mt-2">
          <p className="text-lg font-semibold">Mirza Adnan</p>
          <p className="ml-2 mt-[-4px] text-sm text-dark">Very good!</p>
        </div>
        <div className="bg-gray-300 py-2 px-4 rounded-xl mt-2">
          <p className="text-lg font-semibold">Mirza Adnan</p>
          <p className="ml-2 mt-[-4px] text-sm text-dark">Very good!</p>
        </div>
        <div className="bg-gray-300 py-2 px-4 rounded-xl mt-2">
          <p className="text-lg font-semibold">Mirza Adnan</p>
          <p className="ml-2 mt-[-4px] text-sm text-dark">Very good!</p>
        </div>
      </div>
    </div>
  );
}
export default LocationDetail;
