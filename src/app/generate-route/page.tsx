import { Card } from '@/app/ui/dashboard/cards';

export default function Page() {
  return (
    <main>
      <h1 className="font-bold"> Generate Route</h1>
      <div className="w-full h-full relative bg-white rounded-xl">
        {/* Left Side Content */}
        <div className="w-1/4 h-full flex flex-col space-y-3 p-4">
          <h2 className="font-bold"> Route Overview</h2>

          <div className="grid gap-6 sm:grid-rows-2 lg:grid-rows-3">
            <Card title="Total Packages" value={"200"} type="total" />
            <Card title="FOOs Available" value={"11"} type="fooavailable" />
            <Card title="Routes Constructed" value={"10"} type="routegen" />
          </div>

          <button className="w-full h-[50px] bg-indigo-100 rounded-[40px] text-neutral-800 text-base font-bold font-roboto py-2">Generate Route</button>
        </div>

        {/* Right Side Image and Map */}
        <div className="w-2/3 h-auto rounded-r-lg bg-contain md:bg-contain"
            style={{ backgroundImage: "url(https://www.ncgtp.com/NCGTP_Map_Images/map-main-placeholder.jpg)" }}>
          </div>
      </div>
    </main>
  );
}
