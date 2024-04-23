"use client";
import { Card } from '@/app/ui/dashboard/cards';
import { MapContainer, TileLayer } from 'react-leaflet';

export default function Page() {
  const center = [10.7202, 122.5621]; // Iloilo coordinates
  const zoom = 13; // Adjust zoom level as needed
  return (
    <main>
      <h1 className="font-bold"> Generate Route</h1>
      <div className="w-full h-full relative bg-white rounded-xl">
        {/* Left Side Content */}
        <div className="w-1/4 h-full flex flex-col space-y-3 p-4 ">
          <h2 className="font-bold">
            Route Overview
          </h2>

          <div className="grid gap-6 sm:grid-rows-2 lg:grid-rows-3">
            <Card title="Total Packages" value={"200"} type="total" />
            <Card title="FOOs Available" value={"11"} type="fooavailable" />
            <Card title="Routes Constructed" value={"10"} type="routegen" />
          </div>

          {/* Button */}
          <button className="w-full h-[50px] bg-indigo-100 rounded-[40px] text-neutral-800 text-base font-bold font-roboto py-2">Generate Route</button>
        </div>

        {/* Right Side Image */}
        <div className="w-2/3 h-auto rounded-r-lg bg-contain md:bg-contain">
          <MapContainer zoom={zoom} style={{ height: "100%" }}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          </MapContainer>
        </div>
      </div>
    </main>
  );
}