
"use client";
import React, { useState, useEffect, useRef, FC } from "react";
import Link from 'next/link';
import dynamic from "next/dynamic";
const DynamicMapComponent = dynamic(() => import("../../components/Maps/NewPackageMap"), { ssr: false });
export default function Page() {
  const [markerCoords, setMarkerCoords] = useState<number[] | null>(null);
  const [formData, setFormData] = useState({
    customerName: "",
    city: "",
    barangay: "",
    streetAddress: "",
    height: "",
    width: "",
    length: "",
    packageWeight: "",
    cost: "",
    paymentMethod: "",
    amount: "",
    date: "",
    Type: "",
    preferredDelivery: "",
  });
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Prepare data for the backend API
    const packageData = {
      ...formData,
      latitude: markerCoords?.[0],
      longitude: markerCoords?.[1],
    };
    try {
      const response = await fetch("http://127.0.0.1:8000/api/new_pack/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(packageData),
      });
      if (response.ok) {
        console.log("Package created successfully!");
        // Optionally reset form or handle success UI
      } else {
        console.error("Error creating package", await response.json());
      }
    } catch (error) {
      console.error("An error occurred while submitting the form", error);
    }
  };
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
        {/* Left Side Form */}
        <div className='flex'>
          <div className='w-1/3 h-fit flex-none'>
            <div className="position-relative bg-white rounded-bl-lg">
              <div className="p-5">
                <form onSubmit={handleSubmit} className="flex">
                  <div className="table">
                    <div className="p-5">
                      <div className="pb-9">
                        <h2 className="text-base font-semibold leading-7 text-gray-900">Customer Data</h2>
                        <div className="mt-2 grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-6">
                          <div className="col-span-full">
                            <div className="mt-2">
                              <input
                                type="text"
                                name="customerName"
                                id="customerName"
                                autoComplete="customerName"
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
                                name="streetAddress"
                                id="streetAddress"
                                autoComplete="streetAddress"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-5"
                                placeholder='Street Address'
                              />
                            </div>
                          </div>
                          {/* add latitude from coordinates */}
                          <div className="sm:col-span-3">
                            <div className="mt-2">
                              <input
                                type="text"
                                name="latitude"
                                id="latitude"
                                autoComplete="latitude"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-5"
                                placeholder='Latitude'
                                value={markerCoords?.[0] || ""} // Access latitude from coordinates
                                readOnly
                              />
                            </div>
                          </div>
                          {/* add longitude from coordinates */}
                          <div className="sm:col-span-3">
                            <div className="mt-2">
                              <input
                                type="text"
                                name="longitude"
                                id="longitude"
                                autoComplete="longitude"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-5"
                                placeholder='Longitude'
                                value={markerCoords?.[1] || ""} // Access longitude from coordinates
                                readOnly
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
                                name="packageWeight"
                                id="packageWeight"
                                autoComplete="packageWeight"
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
                                name="paymentMethod"
                                id="paymentMethod"
                                autoComplete="paymentMethod"
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
                        <div className="col-span-full">
                          <div className="mt-2">
                            <select
                              name="preferredDelivery"
                              id="preferredDelivery"
                              autoComplete="preferredDelivery"
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-5"
                            >
                              <option defaultValue={"Preferred Delivery"} hidden style={{ color: "#999" }}>Preferred Delivery</option>
                              <option value="priority" style={{ color: "text-gray-900" }}>Priority Shipping</option>
                              <option value="economy" style={{ color: "text-gray-900" }}>Economy Shipping</option>
                            </select>
                          </div>
                        </div>
                        {/* Submit Button */}
                        <button type="submit" className="w-full bg-indigo-100 rounded-[40px] text-neutral-800 text-base font-bold font-roboto py-2 mt-10">
                          Submit
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
          {/* Right Side Map */}
          <div className="w-2/3 h-fit flex">
            <DynamicMapComponent onMarkerChange={(coords) => setMarkerCoords(coords)} />
          </div>
        </div>
      </div>
    </div >
  );
}
