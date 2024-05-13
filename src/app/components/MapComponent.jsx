import React, { useEffect, useState, useRef } from "react";
import L from "leaflet";
import {
  TileLayer,
  MapContainer,
  LayersControl
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
// Import the JS and CSS:
import 'leaflet-routing-machine'
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css'

const maps = {
  base: "https://tile.openstreetmap.org/{z}/{x}/{y}.png"
};

const Map = () => {
  const [map, setMap] = useState(null);

  // State vars for our routing machine instance:
  const [routingMachine, setRoutingMachine] = useState(null)

  // Start-End points for the routing machine:
  const [start, setStart] = useState([10.7202, 122.5621]); // Iloilo
  const [end, setEnd] = useState([11.1688, 122.6504]); // Passi

  // Ref for our routing machine instace:
  const RoutingMachineRef = useRef(null)

  // Create the routing-machine instance:
  useEffect(() => {
    // Check For the map instance:
    if (!map) return
    if (map) {
      // Assign Control to React Ref:
      RoutingMachineRef.current = L.Routing.control({
        position: 'topleft', // Where to position control on map
        lineOptions: { // Options for the routing line
          styles: [
            {
              color: '#757de8',
            },
          ],
        },
        waypoints: [start, end], // Point A - Point B
      })
      // Save instance to state:
      setRoutingMachine(RoutingMachineRef.current)
    }
  }, [end, map, start])

  // Once routing machine instance is ready, add to map:
  useEffect(() => {
    if (!routingMachine) return
    if (routingMachine) {
      routingMachine.addTo(map)
    }
  }, [map, routingMachine])


  return (
    <>
      <MapContainer
        center={[10.7202, 122.5621]}
        zoom={13}
        zoomControl={false}
        style={{ height: "100vh", width: "100%", borderRadius: "0 20px 0 20px" }}
        // Set the map instance to state when ready:
        whenCreated={map => setMap(map)}
      >
        <LayersControl position="topright">
          <LayersControl.BaseLayer checked name="Map">
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url={maps.base}
            />
          </LayersControl.BaseLayer>
        </LayersControl>
      </MapContainer>
    </>
  );
};

export default Map;