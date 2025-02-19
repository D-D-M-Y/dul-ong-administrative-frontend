'use client';
import React, { useState, useRef, forwardRef, useImperativeHandle } from "react";
import { MapContainer, TileLayer, Marker, Popup, Tooltip, Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css";
import "leaflet-defaulticon-compatibility";
import L from "leaflet";

interface MarkerData {
    coordinates: [number, number];
    finalcolor: boolean;
    customerNumber: number;
    height: string;
    width: string;
}

interface MapComponentProps {
    markers: MarkerData[];
    convertedPolyline: PolylineData;
    height: string;
    width: string;
}

const fooIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
});

const purpleIcon = new L.Icon({
    iconUrl: '/marker-icon-2x-violet.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  });
  
const limeIcon = new L.Icon({
iconUrl: '/marker-icon-2x-green.png',
iconSize: [25, 41],
iconAnchor: [12, 41],
popupAnchor: [1, -34],
});

// Create the functional component with forwardRef
const MapComponent = forwardRef<HTMLDivElement, MapComponentProps>(
    ({ markers, convertedPolyline, height, width }, ref) => {
        return (
            <>
                <MapContainer
                    center={[10.687343, 122.5166238]}
                    zoom={13}
                    style={{ height, width, borderRadius: "0 20px 20px 0" }}
                >
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    {markers.map((marker, index) => (
                        <Marker key={index} position={marker.coordinates} icon={marker.finalcolor ? purpleIcon : limeIcon}>
                            <Tooltip direction="bottom" permanent>{`Customer ${marker.customerNumber}`}</Tooltip>
                            <Popup>{`${marker.coordinates.join(",")}`}</Popup>
                        </Marker>
                    ))}
                    <Marker position={[10.713347913370217, 122.56159364827236]} icon={fooIcon}>
                        <Tooltip direction="right" permanent>
                            Field Operations Officer
                        </Tooltip>
                        <Popup>Field Operations Officer</Popup>
                    </Marker>
                    <Marker position={[10.687343, 122.5166238]}>
                        <Tooltip direction="right" permanent>
                            Origin Depot
                        </Tooltip>
                        <Popup>Origin Depot</Popup>
                    </Marker>
                    {convertedPolyline.map((coords, index) => (
                        <Polyline key={index} positions={coords} color={coords[0]?.finalcolor || "purple"} />
                    ))}
                </MapContainer>
            </>
        );
    }
);

MapComponent.displayName = 'MapComponent';
export default MapComponent;