"use client";
import React, { useState, useEffect, useRef, FC } from "react";
import Link from 'next/link';
import Modal from '@/app/components/Modal/Modal';
import dynamic from "next/dynamic";
const DynamicMapComponent = dynamic(() => import("@/app/components/Maps/NewPackageMap"), { ssr: false });

interface FormValues {
  customerName: string;
  city: string;
  barangay: string;
  streetAddress: string;
  zip: string;
  latitude: string;
  longitude: string;
  height: string;
  width: string;
  length: string;
  packageWeight: string;
  paymentMethod: string;
  paymentAmount: string;
  date: string;
  preferredDelivery: string;
}
interface FormErrors {
  customerName?: string;
  city?: string;
  barangay?: string;
  streetAddress?: string;
  zip?: string;
  latitude?: string;
  longitude?: string;
  height?: string;
  width?: string;
  length?: string;
  packageWeight?: string;
  paymentMethod?: string;
  paymentAmount?: string;
  date?: string;
  preferredDelivery?: string;
}

export default function Page() {
  const [markerCoords, setMarkerCoords] = useState<number[] | null>(null);
  const [name, setName] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formValues, setFormValues] = useState<FormValues>({
    customerName: '',
    city: '',
    barangay: '',
    streetAddress: '',
    zip: '',
    latitude: '',
    longitude: '',
    height: '',
    width: '',
    length: '',
    packageWeight: '',
    paymentMethod: '',
    paymentAmount: '',
    date: '',
    preferredDelivery: ''
  });

  useEffect(() => {
    // Fetch suggestions based on the name input
    const fetchSuggestions = async () => {
      if (name.length > 1) { // Only fetch if input length is more than 1 character
        try {
          const response = await fetch(`/api/customer-data=${name}`);
          const data = await response.json();
          setSuggestions(data.suggestions || []);
          setShowSuggestions(true);
        } catch (error) {
          console.error("Error fetching suggestions:", error);
        }
      } else {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    };

    fetchSuggestions();

    if (
      markerCoords &&
      (formValues.latitude !== markerCoords[0].toString() ||
        formValues.longitude !== markerCoords[1].toString())
    ) {
      setFormValues((prev) => ({
        ...prev,
        latitude: markerCoords[0].toString(),
        longitude: markerCoords[1].toString(),
      }));
    }

    if (submitted) {
      validateForm();
    }
  }, [name, formValues, markerCoords, submitted]);

  // Validate form
  const validateForm = () => {
    let errors: { [key: string]: string } = {};
    if (!formValues.customerName) errors.customerName = 'Name is required.';
    if (!formValues.city) errors.city = 'City is required.';
    if (!formValues.barangay) errors.barangay = 'Barangay is required.';
    if (!formValues.streetAddress) errors.streetAddress = 'Street Address is required.';
    if (!formValues.zip) errors.zip = 'ZIP Code is required.';
    if (!formValues.latitude) errors.latitude = 'Latitude is required.';
    if (!formValues.longitude) errors.longitude = 'Longitude is required.';
    if (!formValues.height) errors.height = 'Height is required.';
    if (!formValues.width) errors.width = 'Width is required.';
    if (!formValues.length) errors.length = 'Length is required.';
    if (!formValues.packageWeight) errors.packageWeight = 'Package Weight is required.';
    if (!formValues.paymentMethod) errors.paymentMethod = 'Payment Method is required.';
    if (!formValues.paymentAmount) errors.paymentAmount = 'Payment Amount is required.';
    if (!formValues.date) errors.date = 'Date is required.';
    if (!formValues.preferredDelivery) errors.preferredDelivery = 'Preferred Delivery is required.';
    setErrors(errors);
    setIsFormValid(Object.keys(errors).length === 0);
  };
  const handleClear = () => {
    setFormValues({
      customerName: '',
      city: '',
      barangay: '',
      streetAddress: '',
      zip: '',
      latitude: '',
      longitude: '',
      height: '',
      width: '',
      length: '',
      packageWeight: '',
      paymentMethod: '',
      paymentAmount: '',
      date: '',
      preferredDelivery: ''
    });
    setErrors({});
    setSubmitted(false);
  };

  const handleSuggestionClick = (suggestedName: string) => {
    setName(suggestedName);
    setShowSuggestions(false); // Hide suggestions after selection
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
          <div className="customborder-link">
            <Link href="/customer-data/view-transactions">
              <h2>View Transactions</h2>
            </Link>
          </div>
          <div className="customborder-active">
            <h2>New Package</h2>
          </div>
        </div>


        {/* Left Side Form */}
        <div className='flex font-ptsans'>
          <div className='w-1/3 h-fit flex-none'>
            <div className="position-relative bg-white rounded-bl-lg">
              <div className="p-5">
                <div className="table">
                  <div className="p-5">
                    <div className="pb-9">
                      <div className="flex items-center justify-start w-full">
                        <h2 className="text-start font-semibold leading-7 text-gray-900 flex-grow">Customer Data</h2>
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
                              type="text"
                              name="customerName"
                              id="customerName"
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
                            <input
                              type="text"
                              name="city"
                              id="city"
                              autoComplete="city"
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-5"
                              placeholder='City/Municipality'
                              value={formValues.city}
                              onChange={(e) => setFormValues({ ...formValues, city: e.target.value })}
                            />
                            {submitted && errors.city && <p className="text-red-500">{errors.city}</p>}

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
                              value={formValues.barangay}
                              onChange={(e) => setFormValues({ ...formValues, barangay: e.target.value })}
                            />
                            {submitted && errors.barangay && <p className="text-red-500">{errors.barangay}</p>}

                          </div>
                        </div>
                        <div className="sm:col-span-3">
                          <div className="mt-2">
                            <input
                              type="text"
                              name="streetAddress"
                              id="streetAddress"
                              autoComplete="streetAddress"
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-5"
                              placeholder='Street Address'
                              value={formValues.streetAddress}
                              onChange={(e) => setFormValues({ ...formValues, streetAddress: e.target.value })}
                            />
                            {submitted && errors.streetAddress && <p className="text-red-500">{errors.streetAddress}</p>}
                          </div>
                        </div>
                        <div className="sm:col-span-3">
                          <div className="mt-2">
                            <input
                              type="number"
                              name="zip"
                              id="zip"
                              autoComplete="zip"
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-5"
                              placeholder='Zip Code'
                              value={formValues.zip}
                              onChange={(e) => setFormValues({ ...formValues, zip: e.target.value })}
                            />
                            {submitted && errors.zip && <p className="text-red-500">{errors.zip}</p>}

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
                              value={formValues.latitude} // Access latitude from coordinates
                              readOnly
                              onChange={(e) => setFormValues({ ...formValues, latitude: e.target.value })}

                            />
                            {submitted && errors.latitude && <p className="text-red-500">{errors.latitude}</p>}

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
                              value={formValues.longitude} // Access longitude from coordinates
                              readOnly
                              onChange={(e) => setFormValues({ ...formValues, longitude: e.target.value })}
                            />
                            {submitted && errors.longitude && <p className="text-red-500">{errors.longitude}</p>}
                          </div>
                        </div>
                      </div>
                      <h2 className="mt-5 text-base font-semibold leading-7 text-gray-900">Package Details</h2>
                      <div className="mt-2 grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-6">
                        <div className="sm:col-span-2 sm:col-start-1">
                          <div className="mt-2">
                            <input
                              type="number"
                              name="height"
                              id="height"
                              autoComplete="height"
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-5"
                              placeholder='Height'
                              value={formValues.height}
                              onChange={(e) => setFormValues({ ...formValues, height: e.target.value })}
                            />
                            {submitted && errors.height && <p className="text-red-500">{errors.zip}</p>}
                          </div>
                        </div>
                        <div className="sm:col-span-2">
                          <div className="mt-2">
                            <input
                              type="number"
                              name="width"
                              id="width"
                              autoComplete="width"
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-5"
                              placeholder='Width'
                              value={formValues.width}
                              onChange={(e) => setFormValues({ ...formValues, width: e.target.value })}
                            />
                            {submitted && errors.width && <p className="text-red-500">{errors.width}</p>}
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
                              value={formValues.length}
                              onChange={(e) => setFormValues({ ...formValues, length: e.target.value })}
                            />
                            {submitted && errors.length && <p className="text-red-500">{errors.length}</p>}
                          </div>
                        </div>
                        <div className="sm:col-span-full">
                          <div className="mt-2">
                            <input
                              type="text"
                              name="packageWeight"
                              id="packageWeight"
                              autoComplete="packageWeight"
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-5"
                              placeholder='Package Weight'
                              value={formValues.packageWeight}
                              onChange={(e) => setFormValues({ ...formValues, packageWeight: e.target.value })}
                            />
                            {submitted && errors.packageWeight && <p className="text-red-500">{errors.packageWeight}</p>}
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
                              value={formValues.paymentMethod}
                              onChange={(e) => setFormValues({ ...formValues, paymentMethod: e.target.value })}
                            />
                            {submitted && errors.paymentMethod && <p className="text-red-500">{errors.paymentMethod}</p>}
                          </div>
                        </div>
                        <div className="sm:col-span-3">
                          <div className="mt-2">
                            <input
                              type="text"
                              name="paymentAmount"
                              id="paymentAmount"
                              autoComplete="paymentAmount"
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-5"
                              placeholder='Payment Amount'
                              value={formValues.paymentAmount}
                              onChange={(e) => setFormValues({ ...formValues, paymentAmount: e.target.value })}
                            />
                            {submitted && errors.paymentAmount && <p className="text-red-500">{errors.paymentAmount}</p>}
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
                              value={formValues.date}
                              onChange={(e) => setFormValues({ ...formValues, date: e.target.value })}
                            />
                            {submitted && errors.date && <p className="text-red-500">{errors.date}</p>}
                          </div>
                        </div>
                        <div className="sm:col-span-3">
                          <div className="mt-2">
                            <select
                              name="preferredDelivery"
                              id="preferredDelivery"
                              autoComplete="preferredDelivery"
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-5"
                              style={{ height: '2.3rem' }}
                              value={formValues.preferredDelivery}
                              onChange={(e) => setFormValues({ ...formValues, preferredDelivery: e.target.value })}
                            >
                              <option defaultValue={"Preferred Delivery"} hidden style={{ color: "#999" }}>Preferred Delivery</option>
                              <option value="priority" style={{ color: "text-gray-900" }}>Priority Shipping</option>
                              <option value="economy" style={{ color: "text-gray-900" }}>Economy Shipping</option>
                            </select>
                            {submitted && errors.preferredDelivery && <p className="text-red-500">{errors.preferredDelivery}</p>}
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-center items-center">
                        {/* Submit Button */}
                        <button onClick={handleSubmit} type="submit" className="w-1/2 h-fit align-center bg-indigo-100 rounded-[40px] text-neutral-800 text-base font-bold font-roboto py-2 px-4 mt-10">
                          Submit
                        </button>
                      </div>
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