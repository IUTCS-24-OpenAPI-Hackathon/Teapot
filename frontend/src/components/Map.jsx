import { Icon } from "leaflet";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import marker from "../assets/marker.png";
import useStore from "../store/store";
import ChangeView from "./ChangeView";
import { Link } from "react-router-dom";

function Map() {
  const query = useStore((state) => state.query);
  const attractions = useStore((state) => state.attractions);
  const setSelectedLocation = useStore((state) => state.setSelectedLocation);

  const markers = [
    {
      geocode: [48.86, 2.3522],
      popUp: "Cox's Bazar",
    },
    {
      geocode: [48.85, 2.3522],
      popUp: "Radisson",
    },
    {
      geocode: [48.855, 2.34],
      popUp: "IUT",
    },
  ];

  const customIcon = new Icon({
    iconUrl: marker,
    iconSize: [38, 38],
  });

  const bd = [23.7946963098031, 90.40126219418919];

  const handleSeeMore = (att) => {
    setSelectedLocation(att);
  };

  return (
    <MapContainer>
      <ChangeView
        center={[query.lat, query.lon]}
        zoom={13}
      />
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <MarkerClusterGroup chunkedLoading>
        {attractions.map((att) => (
          <Marker
            key={att.id}
            position={att.coords}
            icon={customIcon}
            eventHandlers={{
              click: (e) => {
                handleSeeMore(att);
              },
            }}
          >
            <Popup>
              <h2 className="font-bold text-xl">{att.name}</h2>
              <Link
                className="text-blue-300"
                to="/location"
              >
                See more
              </Link>
            </Popup>
          </Marker>
        ))}
      </MarkerClusterGroup>
    </MapContainer>
  );
}
export default Map;
