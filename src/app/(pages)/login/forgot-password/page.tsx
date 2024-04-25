import React from 'react';
import Link from 'next/link';

export default function Page() {
  return (
      <div className="overflow-hidden bg-white w-full h-screen p-10 flex flex-col flex-grow bg-white justify-center items-center"> {/* Grid container with two columns */}
          <img src="/dulong.svg" className="w-1/6" />
          <h1 className="font-bold roboto pb-4">Forgot your password?</h1>
          <p className="text-textC pt-sans font-normal text-m w-1/3 text-center">Enter the email address associated with your account 
          and we'll send you a link to reset your password.</p>

          <div className="flex flex-col pt-4 space-y-2 w-1/3">
            <input type="text" id="username" className="border rounded-lg px-2 py-4 text-textC text-lg font-ptsans" placeholder="Email" />
            <Link href="/login/new-password"><button className="border rounded-lg p2 w-full bg-indigo-100 rounded-3xl text-center font-bold font-roboto py-3">Continue</button> </Link>
          </div>
      </div>
  );
}
