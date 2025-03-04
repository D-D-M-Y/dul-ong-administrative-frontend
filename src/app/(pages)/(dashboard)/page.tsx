"use client";
import fetchMarkers from '@/app/lib/fetchmarkers';
import fetchRoutes from '@/app/lib/fetchroutes';
import { Card } from '@/app/ui/dashboard/cards';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import LoadingSpinner from "@/app/components/Loading";

const DynamicMapComponent = dynamic(() => import('@/app/components/Maps/MapComponent'), { ssr: false });

interface DashboardData {
  totalPackages: number;
  avgDeliveryTime: string;
  onTimeRate: string;
  successfulDeliveryRate: string;
  foosAvailable: number;
  foosEnRoute: number;
  foosIdling: number;
  packagesDelivered: number;
}

function Page() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [markers, setMarker] = useState([]);
  const [convertedPolyline, setConvertedPolyline] = useState<PolylineData>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/packages`;

      const [
        totalPackagesResponse,
        packagesDeliveredResponse,
        avgDeliveryTimeResponse,
        onTimeRateResponse,
        successfulRateResponse,
        foosAvailableResponse,
        foosEnRouteResponse,
        foosIdlingResponse,
      ] = await Promise.all([
        fetch(`${baseUrl}/total_num`, { cache: 'no-store' }),
        fetch(`${baseUrl}/delivered`, { cache: 'no-store' }),
        fetch(`${baseUrl}/avg_delivery_time`, { cache: 'no-store' }),
        fetch(`${baseUrl}/on_time_rate`, { cache: 'no-store' }),
        fetch(`${baseUrl}/successful_rate`, { cache: 'no-store' }),
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/foo`, { cache: 'no-store' }),
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/foo/enRoute`, { cache: 'no-store' }),
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/foo/idling`, { cache: 'no-store' }),
      ]);

      const [totalPackagesData, packagesDeliveredData, avgDeliveryTimeData, onTimeRateData, successfulDeliveryRateData, foosAvailableData, foosEnRouteData, foosIdlingData] = await Promise.all([
        totalPackagesResponse.json(),
        packagesDeliveredResponse.json(),
        avgDeliveryTimeResponse.json(),
        onTimeRateResponse.json(),
        successfulRateResponse.json(),
        foosAvailableResponse.json(),
        foosEnRouteResponse.json(),
        foosIdlingResponse.json(),
      ]);

      setData({
        totalPackages: totalPackagesData.total_packages,
        packagesDelivered: packagesDeliveredData.delivered_packages || 0,
        avgDeliveryTime: avgDeliveryTimeData.avg_delivery_time || 0,
        onTimeRate: onTimeRateData.on_time_rate || 0,
        successfulDeliveryRate: successfulDeliveryRateData.successful_rate || 0,
        foosAvailable: foosAvailableData.available || 0,
        foosEnRoute: foosEnRouteData.enroute || 0,
        foosIdling: foosIdlingData.idling || 0,
      });
    }

    async function fetchMarkerGroup(){
      const val = await fetchMarkers();
      setMarker(val);
    }

    async function fetchRouteGroup(){
      const val = await fetchRoutes();
      setConvertedPolyline(val);
    }

    fetchData();
    fetchMarkerGroup();
    fetchRouteGroup();
  }, []);

  if (!data) return  <LoadingSpinner />;

  return (
    <>
      <main>
        <div>
          <h1 className="font-roboto font-bold">Welcome back, Allana!</h1>

          <div className="flex items-baseline font-roboto">
            <h1> Delivery Overview </h1>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <Card title="Total Packages" value={data.totalPackages} type="total" />
            <Card title="Average Delivery Time" value={data.avgDeliveryTime} type="avgdeltime" />
            <Card title="On-time Rate" value={data.onTimeRate} type="ontimerate" />
            <Card title="Successful Delivery Rate" value={data.successfulDeliveryRate} type="successfulrate" />
          </div>

          <div className="m-10"></div>

          <h1 className="font-roboto"> FOO Management </h1>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <Card title="FOOs Available" value={data.foosAvailable} type="fooavailable" />
            <Card title="FOOs En-route" value={data.foosEnRoute} type="fooenroute" />
            <Card title="FOOs Idling" value={data.foosIdling} type="fooidling" />
            <Card title="Packages Delivered" value={data.packagesDelivered} type="packagedel" />
          </div>

          <div className="m-10"></div>
        </div>

        <h1 className="font-roboto"> Route Overview </h1>
      </main>
      <DynamicMapComponent markers={markers} convertedPolyline={convertedPolyline} height='80%' width='100%' />
    </>
  );
}

// Wrap the Page component with the `withAuth` HOC to protect it
export default Page;
