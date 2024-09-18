"use client";
import React, { useState } from "react";
import Link from 'next/link';
import Modal from '@/app/components/Modal/Modal';
import dynamic from "next/dynamic";
const DynamicMapComponent = dynamic(() => import("@/app/components/Maps/NewPackageMap"), { ssr: false });

export default function Page() {
  const [markerCoords, setMarkerCoords] = useState<number[] | null>(null);
  const [formValues, setFormValues] = useState({
    customerName: '',
    vehicle: '',
    fuelType: '',
    consumption: '',
    foo: '',
    weight: '',
    area: ''
  });

  const handleClear = () => {
    setFormValues({
      customerName: '',
      vehicle: '',
      fuelType: '',
      consumption: '',
      foo: '',
      weight: '',
      area: ''
    });
  };

  const handleModalToggle = (isOpen: boolean) => {
    console.log("Modal is", isOpen ? "Open" : "Closed");
  };

  return (
    <div>
      {/* Header */}
      <div>
        <h1 className='font-bold font-roboto'>
          Company Settings
        </h1>

        {/* Folder */}
        <div className="flex items-baseline font-source_sans_pro">
          <div className="customborder-link">
            <h2>Manage Admins</h2>
          </div>
          <div className="customborder-link">
            <Link href="/company-settings/manage-foos">
              <h2>Manage FOOs</h2>
            </Link>
          </div>
          <div className="customborder-active">
            <Link href="/company-settings/add-vehicle">
              <h2>Add Vehicle</h2>
            </Link>
          </div>
        </div>

        {/* Left Side Form */}
        <div className='flex font-ptsans'>
          <div className='w-1/3 h-fit flex-none'>
            <div className="position-relative bg-white rounded-bl-lg">
              <div className="p-5">
                <div className="table">
                  <div className="p-5">
                    <div className="md:space-y-20">
                      <div className="pb-9">
                        <div className="flex items-center justify-start w-full">
                          <h2 className="text-start font-semibold leading-7 text-gray-900 flex-grow">Add Vehicle</h2>
                          <button
                            className="w-1/2 bg-indigo-100 rounded-[40px] text-neutral-800 text-base font-bold font-roboto py-2 px-4"
                            onClick={handleClear}
                          >
                            Clear
                          </button>
                        </div>

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
                                value={formValues.customerName}
                                onChange={(e) => setFormValues({ ...formValues, customerName: e.target.value })}
                              />
                            </div>
                          </div>

                          <div className="sm:col-span-3">
                            <div className="mt-2">
                              <select
                                name="vehicle"
                                id="vehicle"
                                autoComplete="vehicle"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-5"
                                style={{ height: '2.3rem' }}
                                value={formValues.vehicle}
                                onChange={(e) => setFormValues({ ...formValues, vehicle: e.target.value })}
                              >
                                <option defaultValue="" hidden style={{ color: "#999" }}>Vehicle</option>
                                <option value="truck">Truck</option>
                                <option value="van">Van</option>
                              </select>
                            </div>
                          </div>

                          <div className="sm:col-span-3">
                            <div className="mt-2">
                              <select
                                name="fuel-type"
                                id="fuel-type"
                                autoComplete="fuel-type"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-5"
                                style={{ height: '2.3rem' }}
                                value={formValues.fuelType}
                                onChange={(e) => setFormValues({ ...formValues, fuelType: e.target.value })}
                              >
                                <option defaultValue="" hidden style={{ color: "#999" }}>Fuel Type</option>
                                <option value="diesel">Diesel</option>
                                <option value="unleaded">Unleaded</option>
                              </select>
                            </div>
                          </div>
                          <div className="sm:col-span-3">
                            <div className="mt-2">
                              <input
                                type="text"
                                name="consumption"
                                id="consumption"
                                autoComplete="consumption"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-5"
                                placeholder='Consumption'
                                value={formValues.consumption}
                                onChange={(e) => setFormValues({ ...formValues, consumption: e.target.value })}
                              />
                            </div>
                          </div>
                          <div className="sm:col-span-3">
                            <div className="mt-2">
                              <input
                                type="text"
                                name="foo"
                                id="foo"
                                autoComplete="foo"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-5"
                                placeholder='FOO'
                                value={formValues.foo}
                                onChange={(e) => setFormValues({ ...formValues, foo: e.target.value })}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="pb-9">
                        <h2 className="mt-5 text-base font-semibold leading-7 text-gray-900">Capacity</h2>
                        <div className="mt-2 grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-6">
                          <div className="sm:col-span-3">
                            <div className="mt-2">
                              <input
                                type="text"
                                name="weight"
                                id="weight"
                                autoComplete="weight"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-5"
                                placeholder='Weight'
                                value={formValues.weight}
                                onChange={(e) => setFormValues({ ...formValues, weight: e.target.value })}
                              />
                            </div>
                          </div>
                          <div className="sm:col-span-3">
                            <div className="mt-2">
                              <input
                                type="text"
                                name="area"
                                id="area"
                                autoComplete="area"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-5"
                                placeholder='Area'
                                value={formValues.area}
                                onChange={(e) => setFormValues({ ...formValues, area: e.target.value })}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <Modal onToggle={handleModalToggle} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Right Side Map */}
          <div className="w-2/3 h-fit flex">
            <DynamicMapComponent onMarkerChange={(coords) => setMarkerCoords(coords)} />
          </div>
        </div>
      </div>
    </div>
  );
}
