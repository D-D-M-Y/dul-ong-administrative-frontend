"use client"
import { Card } from '@/app/ui/dashboard/cards';
import L from 'leaflet';
import dynamic from "next/dynamic";
import { useState, useEffect } from 'react';
import { Loader } from "@/app/components/Maps/MapComponent"

const DynamicMapComponent = dynamic(() => import("@/app/components/Maps/MapComponent"), { ssr: false });


interface DashboardData {
  totalPackages: number;
  foosAvailable: number;
  routesConstructed: number;
}

const purpleIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-violet.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

const limeIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

export default function Page() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [markers, setMarkers] = useState([]);
  const [convertedPolyline, setConvertedPolyline] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchMarkers = async () => {
    setLoading(true);
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/customers`);
    const customerCounts: { [vehicleId: string]: number } = {};
    const data = await response.json();

    setMarkers(
      data.map((item: { latitude: string; longitude: string; vehicleid: string }) => {
        const customerNumber = customerCounts[item.vehicleid] || 1;
        customerCounts[item.vehicleid] = customerNumber + 1;
        return {
          coordinates: [parseFloat(item.latitude), parseFloat(item.longitude)],
          finalcolor: parseInt(item.vehicleid) === 1 ? purpleIcon : limeIcon,
          customerNumber,
        };
      })
    );
    setLoading(false);
  };

  const fetchRoutes = async () => {
    setLoading(true);
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/`);
    const data = await response.json();

    const convertedData = data.reduce((acc: any[], item: any) => {
      const finalcolor = parseInt(item.vehicleid) === 1 ? 'purple' : 'lime';
      (acc[item.vehicleid] = acc[item.vehicleid] || []).push({
        lat: item.latitude,
        lng: item.longitude,
        finalcolor,
      });
      return acc;
    }, {});

    setConvertedPolyline(Object.values(convertedData));
    setLoading(false);
  };

  const generateRoute = async () => {
    setLoading(true);
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/generate`);
    if (response.ok) {
      await fetchMarkers();
      await fetchRoutes();
    }
    setLoading(false);
  };

  useEffect(() => {
    async function fetchData() {
      const [
        totalPackagesResponse,
        foosAvailableResponse,
        routesConstructedResponse
      ] = await Promise.all([
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/packages/total_num`, { cache: 'no-store' }),
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/foo`, { cache: 'no-store' }),
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/`, { cache: 'no-store' }),
      ]);

      const [totalPackagesData, foosAvailableData, routesConstructedData] = await Promise.all([
        totalPackagesResponse.json(),
        foosAvailableResponse.json(),
        routesConstructedResponse.json(),
      ]);

      setData({
        totalPackages: totalPackagesData.total_packages || 0,
        foosAvailable: foosAvailableData.foos || 0,
        routesConstructed: routesConstructedData.routes || 0
      });
    }

    fetchData();
  }, []);

  if (!data) return <div>Loading...</div>;

  return (
    <>
      <h1 className="font-bold"> Generate Route</h1>
      <main className="flex flex-col lg:flex-row font-ptsans">
        <div className="w-1/4 h-fit flex flex-col space-y-3 p-4">
          <h2 className="font-bold content-left"> Route Overview</h2>

          <div className="grid gap-6 sm:grid-rows-2 lg:grid-rows-3">
            <Card title="Total Packages" value={data.totalPackages} type="total" />
            <Card title="FOOs Available" value={data.foosAvailable} type="fooavailable" />
            <Card title="Routes Constructed" value={data.routesConstructed} type="routegen" />
          </div>

          <button 
            onClick={generateRoute} 
            className="w-full bg-indigo-100 rounded-lg text-textC font-bold font-roboto py-2">
            <h2>Generate Route</h2>
          </button>
        </div>

        <div className="flex-1 h-[50vh] lg:h-auto lg:w-2/3">
          {loading && <Loader />}
          <DynamicMapComponent markers={markers} convertedPolyline={convertedPolyline} loading={loading} height='100%' width='100%' />
        </div>
      </main>
    </>
  );
}
