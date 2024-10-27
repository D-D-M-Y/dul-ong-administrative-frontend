"use client";
import React, { useEffect, useState } from "react";
import Link from 'next/link';
import dynamic from "next/dynamic";

interface FormValues {
  customerName: string;
  vehicle: string;
  fuelType: string;
  consumption: string;
  foo: string;
  weight: string;
  area: string;
}

interface FormErrors {
  customerName?: string;
  vehicle?: string;
  fuelType?: string;
  consumption?: string;
  foo?: string;
  weight?: string;
  area?: string;
}

export default function Page() {
  const [markerCoords, setMarkerCoords] = useState<number[] | null>(null);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formValues, setFormValues] = useState<FormValues>({
    customerName: '',
    vehicle: '',
    fuelType: '',
    consumption: '',
    foo: '',
    weight: '',
    area: ''
  });


  useEffect(() => {
    if (submitted) {
      validateForm();
    }
  }, [formValues, submitted]);

  // Validate form
  const validateForm = () => {
    let errors: { [key: string]: string } = {};
    if (!formValues.customerName) errors.customerName = 'Name is required.';
    if (!formValues.vehicle) errors.vehicle = 'Vehicle selection is required.';
    if (!formValues.fuelType) errors.fuelType = 'Fuel type is required.';
    if (!formValues.consumption) errors.consumption = 'Consumption is required.';
    if (!formValues.foo) errors.foo = 'FOO is required.';
    if (!formValues.weight) errors.weight = 'Weight is required.';
    if (!formValues.area) errors.area = 'Area is required.';

    setErrors(errors);
    setIsFormValid(Object.keys(errors).length === 0);
  };

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
    setErrors({});
    setSubmitted(false);
  };

  // Submit
  const handleSubmit = () => {
    setSubmitted(true);
    validateForm();
    if (isFormValid) {
      console.log('Form submitted successfully!');
    } else {
      console.log('Form has errors. Please correct them.');
    }
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

        {/* Form */}
        <div className='flex font-ptsans'>
          <div className='w-full h-fit flex-none'>
            <div className="position-relative bg-white rounded-bl-lg">
              <div className="p-5">
                <div className="table">
                  <div className="p-5">
                    <div className="md:space-y-20">
                      <div className="pb-9">
                        <div className="flex items-center justify-start w-full">
                          <h2 className="text-start font-semibold leading-7 text-gray-900 flex-grow">Add Vehicle</h2>
                          <button
                            className="w-fit bg-indigo-100 rounded-[40px] text-neutral-800 text-base font-bold font-roboto py-2 px-4"
                            onClick={handleClear}
                          >
                            Clear
                          </button>
                        </div>

                        <div className="mt-2 grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-6">
                          <div className="col-span-full">
                            <div className="mt-2">
                              <input
                                required
                                type="text"
                                name="customerName"
                                id="customerName"
                                autoComplete="customerName"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-5"
                                placeholder='Name'
                                value={formValues.customerName}
                                onChange={(e) => setFormValues({ ...formValues, customerName: e.target.value })}
                              />
                              {submitted && errors.customerName && <p className="text-red-500">{errors.customerName}</p>}
                            </div>
                          </div>

                          <div className="sm:col-span-3">
                            <div className="mt-2">
                              <select
                                required
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
                              {submitted && errors.vehicle && <p className="text-red-500">{errors.vehicle}</p>}
                            </div>
                          </div>

                          <div className="sm:col-span-3">
                            <div className="mt-2">
                              <select
                                required
                                name="fuelType"
                                id="fuelType"
                                autoComplete="fuelType"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-5"
                                style={{ height: '2.3rem' }}
                                value={formValues.fuelType}
                                onChange={(e) => setFormValues({ ...formValues, fuelType: e.target.value })}
                              >
                                <option defaultValue="" hidden style={{ color: "#999" }}>Fuel Type</option>
                                <option value="diesel">Diesel</option>
                                <option value="unleaded">Unleaded</option>
                              </select>
                              {submitted && errors.fuelType && <p className="text-red-500">{errors.fuelType}</p>}

                            </div>
                          </div>
                          <div className="sm:col-span-3">
                            <div className="mt-2">
                              <input
                                required
                                type="text"
                                name="consumption"
                                id="consumption"
                                autoComplete="consumption"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-5"
                                placeholder='Consumption'
                                value={formValues.consumption}
                                onChange={(e) => setFormValues({ ...formValues, consumption: e.target.value })}
                              />
                              {submitted && errors.consumption && <p className="text-red-500">{errors.consumption}</p>}
                            </div>
                          </div>
                          <div className="sm:col-span-3">
                            <div className="mt-2">
                              <input
                                required
                                type="text"
                                name="foo"
                                id="foo"
                                autoComplete="foo"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-5"
                                placeholder='FOO'
                                value={formValues.foo}
                                onChange={(e) => setFormValues({ ...formValues, foo: e.target.value })}
                              />
                              {submitted && errors.foo && <p className="text-red-500">{errors.foo}</p>}
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
                                required
                                type="text"
                                name="weight"
                                id="weight"
                                autoComplete="weight"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-5"
                                placeholder='Weight'
                                value={formValues.weight}
                                onChange={(e) => setFormValues({ ...formValues, weight: e.target.value })}
                              />
                              {submitted && errors.weight && <p className="text-red-500">{errors.weight}</p>}
                            </div>
                          </div>
                          <div className="sm:col-span-3">
                            <div className="mt-2">
                              <input
                                required
                                type="text"
                                name="area"
                                id="area"
                                autoComplete="area"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-5"
                                placeholder='Area'
                                value={formValues.area}
                                onChange={(e) => setFormValues({ ...formValues, area: e.target.value })}
                              />
                              {submitted && errors.area && <p className="text-red-500">{errors.area}</p>}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-center items-center">
                        {/* Submit Button */}
                        <button onClick={handleSubmit} type="submit" className="w-fit h-fit align-center bg-indigo-100 rounded-[40px] text-neutral-800 text-base font-bold font-roboto py-2 px-4">
                          Submit
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
