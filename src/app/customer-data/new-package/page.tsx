"use client";
import React from 'react';
import Link from 'next/link';
import dynamic from "next/dynamic";
const DynamicMapComponent = dynamic(() => import("../../components/MapComponent"), { ssr: false });

export default function Page() {
  return (
    <div>
      {/* Header */}
      <div>
        <h1 style={{ fontWeight: 'bold' }}>
          Customer Data
        </h1>

        {/* Folder */}
        <div className="flex items-baseline">
          <div className="customborder-link">
            <Link href="/customer-data">
              <h2>Manage Customers</h2>
            </Link>
          </div>
          <div className="customborder-link">
            <Link href="/customer-data/manage-packages">
              <h2>Manage Packages</h2>
            </Link>
          </div>
          <div className="customborder-active">
            <h2>New Package</h2>
          </div>
        </div>


        {/* Westside (Form) */}
        <div className='flex'>
          <div className='w-1/3 h-fit'>
            <div className="position-relative bg-white rounded-bl-lg">
              <div className="p-5">
                <div className="table">
                  <div className="p-5">
                    <div className="pb-10">
                      <h2 className="text-base font-semibold leading-7 text-gray-900">Customer Data</h2>
                      <div className="mt-2 grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-6">
                        <div className="col-span-full">
                          <div className="mt-2">
                            <input
                              type="text"
                              name="customer-name"
                              id="customer-name"
                              autoComplete="customer-name"
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-5"
                              placeholder='Name'
                            />
                          </div>
                        </div>

                        <div className="sm:col-span-3">
                          <div className="mt-2">
                            <input
                              type="text"
                              name="city"
                              id="city"
                              autoComplete="city"
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-5"
                              placeholder='City'
                            />
                          </div>
                        </div>

                        <div className="sm:col-span-3">
                          <div className="mt-2">
                            <input
                              type="text"
                              name="barangay"
                              id="barangay"
                              autoComplete="barangay"
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-5"
                              placeholder='Barangay'
                            />
                          </div>
                        </div>

                        <div className="col-span-full">
                          <div className="mt-2">
                            <input
                              type="text"
                              name="street-address"
                              id="street-address"
                              autoComplete="street-address"
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-5"
                              placeholder='Street Address'
                            />
                          </div>
                        </div>

                        <div className="sm:col-span-3">
                          <div className="mt-2">
                            <input
                              type="text"
                              name="longitude"
                              id="longitude"
                              autoComplete="longitude"
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-5"
                              placeholder='Longitude'
                            />
                          </div>
                        </div>

                        <div className="sm:col-span-3">
                          <div className="mt-2">
                            <input
                              type="text"
                              name="latitude"
                              id="latitude"
                              autoComplete="latitude"
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-5"
                              placeholder='Latitude'
                            />
                          </div>
                        </div>
                      </div>
                      <h2 className="mt-5 text-base font-semibold leading-7 text-gray-900">Package Details</h2>
                      <div className="mt-2 grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-6">
                        <div className="sm:col-span-2 sm:col-start-1">
                          <div className="mt-2">
                            <input
                              type="text"
                              name="height"
                              id="height"
                              autoComplete="height"
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-5"
                              placeholder='Height'
                            />
                          </div>
                        </div>
                        <div className="sm:col-span-2">
                          <div className="mt-2">
                            <input
                              type="text"
                              name="width"
                              id="width"
                              autoComplete="width"
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-5"
                              placeholder='Width'
                            />
                          </div>
                        </div>
                        <div className="sm:col-span-2">
                          <div className="mt-2">
                            <input
                              type="text"
                              name="length"
                              id="length"
                              autoComplete="length"
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-5"
                              placeholder='Length'
                            />
                          </div>
                        </div>
                        <div className="sm:col-span-3">
                          <div className="mt-2">
                            <input
                              type="text"
                              name="package-weight"
                              id="package-weight"
                              autoComplete="package-weight"
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-5"
                              placeholder='Package Weight'
                            />
                          </div>
                        </div>

                        <div className="sm:col-span-3">
                          <div className="mt-2">
                            <input
                              type="text"
                              name="cost"
                              id="cost"
                              autoComplete="cost"
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-5"
                              placeholder='Cost'
                            />
                          </div>
                        </div>
                      </div>
                      <h2 className="mt-5 text-base font-semibold leading-7 text-gray-900">Transaction Details</h2>
                      <div className="mt-2 grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-6">
                        <div className="sm:col-span-3">
                          <div className="mt-2">
                            <input
                              type="text"
                              name="payment-method"
                              id="payment-method"
                              autoComplete="payment-method"
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-5"
                              placeholder='Payment Method'
                            />
                          </div>
                        </div>
                        <div className="sm:col-span-3">
                          <div className="mt-2">
                            <input
                              type="text"
                              name="amount"
                              id="amount"
                              autoComplete="amount"
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-5"
                              placeholder='Amount'
                            />
                          </div>
                        </div>
                        <div className="sm:col-span-3">
                          <div className="mt-2">
                            <input
                              type="text"
                              name="date"
                              id="date"
                              autoComplete="date"
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-5"
                              placeholder='Date'
                            />
                          </div>
                        </div>
                        <div className="sm:col-span-3">
                          <div className="mt-2">
                            <input
                              type="text"
                              name="Type"
                              id="Type"
                              autoComplete="Type"
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-5"
                              placeholder='Type'
                            />
                          </div>
                        </div>
                      </div>
                      <button className="w-full h-[50px] bg-indigo-100 rounded-[40px] text-neutral-800 text-base font-bold font-roboto mt-5">Submit</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Right Side Image */}
          <div className="w-2/3 h-full flex rounded-r-lg">
            <DynamicMapComponent />
          </div>
        </div>
      </div>
    </div>
  );
}
