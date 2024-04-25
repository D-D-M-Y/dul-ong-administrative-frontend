import React from 'react';
import Link from 'next/link';

export default function Page() {
  return (
      <div className="overflow-hidden bg-white w-full h-screen p-10 flex flex-col flex-grow bg-white justify-center items-center"> {/* Grid container with two columns */}
          <img src="/dulong.svg" className="w-1/6" />
          <h1 className="font-bold roboto pb-4">Enter new password.</h1>
          <p className="text-textC pt-sans font-normal text-m w-1/3 text-center">Password must contain one lowercase letter, one number, and be atleast 6 characters long.</p>

          <div className="flex flex-col pt-4 space-y-2 w-1/3">
            <input type="password" id="password" className="border rounded-lg px-2 py-4 text-textC text-m font-ptsans" placeholder="New Password" />
            <input type="password" id="password" className="border rounded-lg px-2 py-4 text-textC text-m font-ptsans" placeholder="Confirm Password" />
            <Link href="/login"><button className="border rounded-lg p2 w-full bg-indigo-100 rounded-3xl text-center font-bold font-roboto py-3">Change Password</button> </Link>
          </div>
      </div>
  );
}

