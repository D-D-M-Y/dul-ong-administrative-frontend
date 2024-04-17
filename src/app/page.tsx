import { Card } from '@/app/ui/dashboard/cards';
import Dropdown from '@/app/ui/dashboard/dropdown';


/* import {
  fetchRevenue,
  fetchLatestInvoices,
  fetchCardData,
} from */
 
export default async function Page() {
 /* const revenue = await fetchRevenue();
  const latestInvoices = await fetchLatestInvoices();
  const {
    numberOfInvoices,
    numberOfCustomers,
    totalPaidInvoices,
    totalPendingInvoices,
  } = await fetchCardData(); */
 
  return (
    <main>
      <h1 className={`font-roboto mb-6 md:text-2xl`} style={{ fontWeight: 'bold', fontSize: 36}}>
        Welcome back, Allana!
      </h1>
      <div className="flex items-center mb-4">
  <h2 className={`font-roboto text-l md:text-2xl`} style={{ fontSize: 36 }}>
    Delivery Overview
  </h2>
  <div className="ml-4 relative">
    <Dropdown/> 
  </div>
</div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card title="Total Packages" value={"200"} type="total" />
        <Card title="Average Delivery Time" value={"45 min"} type="avgdeltime" />
        <Card title="On-time Rate" value={"82%"} type="ontimerate" />
        <Card
          title="Successful Delivery Rate"
          value={"94%"}
          type="successfulrate"
        />
      </div>
      <div className= "m-10"> </div>
      <h2 className={`font-roboto mb-4 text-l md:text-2xl`} style={{fontSize: 36}}>
        FOO Management
      </h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card title="FOOs Available" value={"1"} type="total" />
        <Card title="FOO En-route" value={"11"} type="avgdeltime" />
        <Card title="FOOs Idling" value={"0"} type="ontimerate" />
        <Card
          title="Packages Delivered"
          value={"162"}
          type="successfulrate"
        />
      </div>
      <div className= "m-10"> </div>
      <h2 className={`font-roboto mb-4 text-l md:text-2xl`} style={{fontSize: 36}}>
        Route Overview
      </h2>
      <div> 
      <div className=" h-full w-auto rounded-xl bg-white p-2 shadow-sm">
      <img src="/filler.png" alt="Filler Image" className=" rounded-md "/>
      </div>
      </div>
    </main>
  );
}