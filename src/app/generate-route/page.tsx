"use client";
import React, { useEffect } from 'react';
import Map from '../components/Map'; // Assuming Map.js is in components folder
import { Card } from '@/app/ui/dashboard/cards';
import "leaflet/dist/leaflet.css"
import "leaflet-defaulticon-compatibility"
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css"



export default function Page() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Code that uses window object (e.g., react-leaflet initialization)
    }
  }, []);
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
          <Map />
        </div>
      </div>
    </main>
  );
}