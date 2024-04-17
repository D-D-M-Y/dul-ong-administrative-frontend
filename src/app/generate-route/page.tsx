export default function Page() {
  return (
    <div className="w-dvw h-dvh relative bg-white rounded-[20px] overflow-hidden">
      <div className="text-black text-4xl font-bold font-roboto">Generate Route</div>

      <div className="w-full h-fit relative bg-white rounded-[20px]">
        {/* Left Side Content */}
        <div className="w-fit h-fit flex flex-col space-y-6 py-4 px-16">
          <div className="text-neutral-800 text-2xl font-bold font-source-sans-pro']">
            Route Overview
          </div>

          {/* Package Information */}
          <div className="w-full h-fit flex flex-col border border-zinc-300 border-opacity-50 rounded-[20px] py-4 px-6">
            <div className="text-neutral-800 text-xl font-normal font-source-sans-pro">
              Total Packages
            </div>
            <div className="text-neutral-800 text-[52px] font-bold font-roboto mt-4">
              200
            </div>
          </div>

          {/* FOOs Available */}
          <div className="w-full flex flex-col border border-zinc-300 border-opacity-50 rounded-[20px] py-4 px-6">
            <div className="text-neutral-800 text-xl font-normal font-source-sans-pro">
              FOOs Available
            </div>
            <div className="text-neutral-800 text-[52px] font-bold font-roboto mt-4">
              11
            </div>
          </div>

          {/* Routes Constructed */}
          <div className="w-full flex flex-col border border-zinc-300 border-opacity-50 rounded-[20px] py-4 px-6">
            <div className="text-neutral-800 text-xl font-normal font-source-sans-pro">
              Routes Constructed
            </div>
            <div className="text-neutral-800 text-[52px] font-bold font-roboto mt-4">
              10
            </div>
          </div>

          {/* Button */}

          <button className="w-full h-[50px] left-[62px] top-[580px] absolute">
            <div className="w-[300px] h-[50px] left-0 top-0 absolute bg-indigo-100 rounded-[40px]" />
            <div className="left-[94px] top-[15px] absolute text-neutral-800 text-base font-bold font-roboto">Generate Route</div>
          </button>
        </div>

        {/* Right Side Image */}
        <div className="absolute top-0 right-0 h-svh w-3/4 bg-cover md:bg-contain"
          style={{ backgroundImage: "url(https://www.ncgtp.com/NCGTP_Map_Images/map-main-placeholder.jpg)" }}>
        </div>
      </div>
    </div>
  );
}
