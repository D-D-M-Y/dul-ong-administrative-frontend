'use server';

import { Card } from '@/app/ui/dashboard/cards';
import dynamic from 'next/dynamic';
import GenerateRouteButton from '@/app/ui/generateroute';
import fetchMarkers from '@/app/lib/fetchmarkers';
import fetchRoutes from '@/app/lib/fetchroutes';


const DynamicMapComponent = dynamic(() => import("@/app/components/Maps/MapComponent"), { 
  loading: () => <p>Loading Map</p>,
  ssr: false });

export default async function Page() {
  //const [markers, setMarkers] = useState([]);
  //const [convertedPolyline, setConvertedPolyline] = useState([]);

  async function fetchData(): Promise<DashboardData> {
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

    return{
      totalPackages: totalPackagesData.total_packages || 0,
      foosAvailable: foosAvailableData.foos || 0,
      routesConstructed: routesConstructedData.routes || 0
    };
  }

  const data = await fetchData();
  const markers = await fetchMarkers();
  const convertedPolyline = await fetchRoutes();

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
          <GenerateRouteButton/>
        </div>

        <div className="flex-1 h-[50vh] lg:h-auto lg:w-2/3">
          <DynamicMapComponent markers={markers||[]} convertedPolyline={convertedPolyline||[]} height='100%' width='100%' />
        </div>
      </main>
    </>
  );
}
