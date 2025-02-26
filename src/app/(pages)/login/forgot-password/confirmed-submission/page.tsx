'use client'

import React, { useState } from 'react';

export default function Page() {
  return (
      <div className="overflow-hidden bg-white w-full h-screen p-10 flex flex-col flex-grow bg-white justify-center items-center"> {/* Grid container with two columns */}
          <img src="/dulong.svg" className="w-1/6" />
          <h1 className="font-bold font-roboto pb-4">Check Your Email to Reset Password</h1>
          <p className="text-textC font-ptsans font-normal text-base w-1/3 text-center">We&apos;ve sent an email with instructions on how to reset your password to your inbox.</p>
      </div>
  );
}