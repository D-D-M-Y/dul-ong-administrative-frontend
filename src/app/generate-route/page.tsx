"use client";
import { Card } from '@/app/ui/dashboard/cards';
import dynamic from "next/dynamic";
const DynamicMapComponent = dynamic(() => import("../components/MapComponent"), { ssr: false });

export default function Page() {
  return (
    <>
      <h1 className="font-bold"> Generate Route</h1>
      <main className="flex">
        <div className="w-1/4 h-full flex flex-col space-y-3 p-4">
          <h2 className="font-bold"> Route Overview</h2>

          <div className="grid gap-6 sm:grid-rows-2 lg:grid-rows-3">
            <Card title="Total Packages" value={"200"} type="total" />
            <Card title="FOOs Available" value={"11"} type="fooavailable" />
            <Card title="Routes Constructed" value={"10"} type="routegen" />
          </div>

          <button className="w-full h-[50px] bg-indigo-100 rounded-[40px] text-neutral-800 text-base font-bold font-roboto py-2">Generate Route</button>
        </div>

        <div className="w-3/4 h-full flex space-y-3 p-4">
          <DynamicMapComponent />
        </div>
      </main>
    </>

  );
}
