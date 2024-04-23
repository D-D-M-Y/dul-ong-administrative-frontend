// src/components/Map.js
import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, TileLayer, Tooltip } from "react-leaflet";

function Map() {
  return (
    <MapContainer
      className="w-100% h-40rem"
      center={[10.7202, 122.5621]}
      zoom={13}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
    </MapContainer>
  );
}

export default Map;
