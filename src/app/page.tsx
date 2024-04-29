"use client";
import { Card } from '@/app/ui/dashboard/cards';
import Dropdown from '@/app/ui/dashboard/dropdown';
import dynamic from "next/dynamic";
const DynamicMapComponent = dynamic(() => import("./components/MapComponent"), { ssr: false });

/* imports from tutorial
    import {
  fetchRevenue,
  fetchLatestInvoices,
  fetchCardData,
} from */

export default async function Page() {
  /* function from tutorial
  const revenue = await fetchRevenue();
   const latestInvoices = await fetchLatestInvoices();
   const {
     numberOfInvoices,
     numberOfCustomers,
     totalPaidInvoices,
     totalPendingInvoices,
   } = await fetchCardData(); */

  return (
    <main>
      <h1 className="font-bold">
        Welcome back, Allana!
      </h1>

      {/* Delivery Overview */}
      <div className="flex items-baseline">
        <h1> Delivery Overview </h1>
        <div className="ml-4 relative">
          <Dropdown />
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card title="Total Packages" value={"200"} type="total" />
        <Card title="Average Delivery Time" value={"45 min"} type="avgdeltime" />
        <Card title="On-time Rate" value={"82%"} type="ontimerate" />
        <Card title="Successful Delivery Rate" value={"94%"} type="successfulrate" />
      </div>

      <div className="m-10"> </div>

      {/* FOO Management */}

      <h1> FOO Management </h1>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card title="FOOs Available" value={"1"} type="fooavailable" />
        <Card title="FOOs En-route" value={"11"} type="fooenroute" />
        <Card title="FOOs Idling" value={"0"} type="fooidling" />
        <Card title="Packages Delivered" value={"162"} type="packagedel" />
      </div>


      <div className="m-10"> </div>

      {/* Route Overview */}

      <h1> Route Overview </h1>

      <DynamicMapComponent />

    </main>
  );
}