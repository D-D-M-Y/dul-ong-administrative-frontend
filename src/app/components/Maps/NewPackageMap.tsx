
//1. Import dependencies for React, Leaflet and other functionalities.
import React, { useState, useEffect, useRef, FC } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, useMap, Tooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css";
import "leaflet-defaulticon-compatibility";
import L from "leaflet";

//2. Define the interface for MarkerData.
interface MarkerData {
    coordinates: [number, number];
}
interface MapComponentProps {
    onMarkerChange?: (coordinates: number[]) => void;
    width: string;
    height: string;
}

const limeIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
});

const fooIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
});

//3. Loader component for showing loading animation.
const Loader = () => {
    return (
        <div className="absolute z-[10000] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <svg
                aria-hidden="true"
                className="w-24 h-24 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                />
                <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                />
            </svg>
        </div>
    );
};
//4. Main component definition.
const MapComponent: FC<MapComponentProps> = ({ onMarkerChange, height, width }) => {
    //5. Initialize local state.
    const [markers, setMarkers] = useState<MarkerData[]>([]); // Array to store markers
    const [currentMarkerIndex, setCurrentMarkerIndex] = useState<number>(-1);
    const [markerData, setMarkerData] = useState<MarkerData | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    //6. Declare useRef to reference map.
    const mapRef = useRef<any | null>(null);
    //7. ZoomHandler component for handling map zoom events.
    const ZoomHandler: FC = () => {
        //8. Use Leaflet's useMap hook.
        const map = useMap();
        //9. Function to fly map to given coordinates.
        const flyToMarker = (coordinates: [number, number], zoom: number) => {
            if (coordinates && typeof coordinates[0] !== "undefined") {
                map.flyTo(coordinates, zoom, {
                    animate: true,
                    duration: 1.5,
                });
            }
        };
        useMapEvents({
            zoomend: () => {
                setLoading(false);
            },
            click: (e) => {
                if (markers.length === 0) {
                    setLoading(true);
                    const { lat, lng } = e.latlng;
                    setMarkers([{ coordinates: [lat, lng] }]);

                    setCurrentMarkerIndex(0);
                    setLoading(false);
                }
            },
        });
        //10. useEffect to trigger the map fly when markerData changes.
        useEffect(() => {
            if (markerData) {
                if (markerData.coordinates && typeof markerData.coordinates[0] !== "undefined") {
                    flyToMarker(markerData.coordinates, 13);
                }
            }
            if (markers.length > 0) {
                setMarkerData(markers[0]); // Set initial marker data
                onMarkerChange?.(markers[0].coordinates); // Call onMarkerChange with initial coordinates
            }
        }, [markerData, markers]);
        return null;
    };
    // coordinates update when marker is dragged to a new position
    const updateMarkerPosition = (newLatLng: L.LatLng) => {
        setMarkers((prevMarkers) => {
            onMarkerChange?.([newLatLng.lat, newLatLng.lng]);
            return [{ coordinates: [newLatLng.lat, newLatLng.lng] }];
        });
    };
    //11. Return the JSX for rendering.
    return (
        <>
            {/* 12. Show the loader if loading. */}
            {loading && <Loader />}
            {/* 14. Add the map container. */}
            <MapContainer center={[10.6873430, 122.5166238]} zoom={13} style={{ height, width, borderRadius: "0 20px 20px 0" }}>
                {/* 15. Set the tile layer for the map. */}
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                {/* 16. Render the markers */}
                <Marker position={[10.713347913370217, 122.56159364827236]} icon={fooIcon}>
                    <Tooltip direction="right" permanent>
                        Field Operations Officer
                    </Tooltip>
                    <Popup>Field Operations Officer</Popup>
                </Marker>
                <Marker position={[10.6873430, 122.5166238]}>
                    <Tooltip direction="right" permanent>{`Origin Depot`}</Tooltip>
                    <Popup>Origin Depot</Popup>
                </Marker>
                {markers.map((marker, index) => (
                    <Marker
                        key={markers[0].coordinates.join(",")}
                        position={markers[0].coordinates}
                        draggable={true}
                        ref={mapRef}
                        icon={limeIcon}
                        eventHandlers={{
                            dragend: () => {
                                const marker = mapRef.current;
                                if (marker) {
                                    const newLatLng = marker.getLatLng();
                                    updateMarkerPosition(newLatLng);
                                }
                            },
                        }}
                    >
                        <Tooltip sticky>Drag me to change location!</Tooltip>
                        <Popup>{`You are currently at: ${marker.coordinates.join(",")}`}</Popup>
                    </Marker>
                ))}
                {/* 17. Include the ZoomHandler for zoom events. */}
                <ZoomHandler />
            </MapContainer>
        </>
    );
};
//18. Export the MapComponent.
export default MapComponent;
