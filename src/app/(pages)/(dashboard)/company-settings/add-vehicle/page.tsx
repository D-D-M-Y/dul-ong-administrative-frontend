"use client";
import React, { useEffect, useState } from "react";
import Link from 'next/link';

interface FormValues {
  vehicleName: string;
  vehicle: string;
  fuelType: string;
  consumption: string;
  foo: number;
  weight: string;
  area: string;
}

interface FormErrors {
  vehicleName?: string;
  vehicle?: string;
  fuelType?: string;
  consumption?: string;
  foo?: number;
  weight?: string;
  area?: string;
}

interface FOO {
  pk: number;
  fname: string;
  mname: string;
  lname: string;
}

export default function Page() {
  const [fooOptions, setFooOptions] = useState<FOO[]>([]);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [formValues, setFormValues] = useState<FormValues>({
    vehicleName: '',
    vehicle: '',
    fuelType: '',
    consumption: '',
    foo: 0,
    weight: '',
    area: ''
  });


  useEffect(() => {
    if (submitted) {
      validateForm();
    }
  }, [formValues]);

  // Validate form
  const validateForm = async () => {
    let errors: { [key: string]: string } = {};
    if (!formValues.vehicleName) errors.vehicleName = 'Please enter the vehicle name.';
    if (!formValues.vehicle) errors.vehicle = 'Please select a vehicle class.';
    if (!formValues.fuelType) errors.fuelType = 'Please select a fuel type.';
    if (!formValues.consumption) errors.consumption = "Please enter the vehicle's fuel consumption.";
    if (!formValues.foo) errors.foo = 'Please enter the name of the Field Operations Officer.';
    if (!formValues.weight) errors.weight = "Please enter the vehicle's weight.";
    if (!formValues.area) errors.area = "Please enter the vehicle's area.";

    setErrors(errors);
    // Check if there are any errors
    const isValid = Object.keys(errors).length === 0;
    setSubmitted(true); // Track submission attempt

    if (isValid) {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/vehicles/add_vehicle`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formValues),
        });

        if (response.ok) {
          console.log('Form submitted successfully!');
          alert('Vehicle added successfully!');
          // Clear the form after successful submission
          setFormValues({
            vehicleName: '',
            vehicle: '',
            fuelType: '',
            consumption: '',
            foo: 0,
            weight: '',
            area: ''
          });
          setErrors({});
          setSubmitted(false);
        } else {
          console.error('Failed to submit form:', await response.text());
          alert('Failed to add vehicle. Please try again.');
        }
      } catch (error) {
        console.error('Error submitting form:', error);
        alert('An error occurred while adding the vehicle. Please try again.');
      }
    } else {
      console.log('Form has errors. Please correct them.');
      alert('The form has blank fields. Please complete the form before submitting.');
    }
  };

  const handleClear = () => {
    setFormValues({
      vehicleName: '',
      vehicle: '',
      fuelType: '',
      consumption: '',
      foo: 0,
      weight: '',
      area: ''
    });
    setErrors({});
    setSubmitted(false);
  };

  // Fetch foo options on component mount
  useEffect(() => {
    const fetchFooOptions = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/foo`);
        if (response.ok) {
          const data = await response.json();
          // Ensure that 'results' is an array before setting it
          if (Array.isArray(data.results)) {
            setFooOptions(data.results); // Set the foo options array
          } else {
            console.error('Expected "results" to be an array:', data.results);
          }
        } else {
          console.error('Failed to fetch FOO options:', await response.text());
        }
      } catch (error) {
        console.error('Error fetching FOO options:', error);
      }
    };
    

    fetchFooOptions();
  }, []);


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
                                name="vehicleName"
                                id="vehicleName"
                                autoComplete="vehicleName"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-5"
                                placeholder='Vehicle Name'
                                value={formValues.vehicleName}
                                onChange={(e) => setFormValues({ ...formValues, vehicleName: e.target.value })}
                              />
                              {submitted && errors.vehicleName && <p className="text-red-500">{errors.vehicleName}</p>}
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
                                <option value="TRU">Truck</option>
                                <option value="VAN">Van</option>
                                <option value="TWO">Motorcycle</option>
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
                                <option value="gas">Unleaded</option>
                              </select>
                              {submitted && errors.fuelType && <p className="text-red-500">{errors.fuelType}</p>}

                            </div>
                          </div>
                          <div className="sm:col-span-3">
                            <div className="mt-2">
                              <div className="relative flex items-center">
                                <input
                                  required
                                  type="number"
                                  name="consumption"
                                  id="consumption"
                                  autoComplete="consumption"
                                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-5"
                                  placeholder='Fuel Consumption'
                                  value={formValues.consumption}
                                  onChange={(e) => setFormValues({ ...formValues, consumption: e.target.value })}
                                />
                                <span className="absolute right-3 text-gray-500 sm:text-sm pointer-events-none">
                                  km/l
                                </span>
                              </div>
                              {submitted && errors.consumption && <p className="text-red-500">{errors.consumption}</p>}
                            </div>
                          </div>
                          <div className="sm:col-span-3">
                            <div className="mt-2">
                              <select
                                required
                                name="foo"
                                id="foo"
                                autoComplete="foo"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-5"
                                style={{ height: '2.3rem' }}
                                value={formValues.foo}
                                onChange={(e) => setFormValues({ ...formValues, foo: parseInt(e.target.value) })}
                              >
                                <option defaultValue="" hidden style={{ color: "#999" }}>Field Operations Officer</option>
                                {fooOptions.map(FOO => (
                                  <option key={FOO.pk} value={FOO.pk}>
                                    {`${FOO.fname} ${FOO.mname} ${FOO.lname}`.trim()}
                                  </option>))}
                              </select>
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
                              <div className="relative flex items-center">
                                <input
                                  required
                                  type="number"
                                  name="weight"
                                  id="weight"
                                  autoComplete="weight"
                                  className="block w-full rounded-md border border-gray-300 py-2 pl-4 pr-10 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                  placeholder="Gross Vehicle Weight"
                                  value={formValues.weight}
                                  onChange={(e) => setFormValues({ ...formValues, weight: e.target.value })}
                                />
                                <span className="absolute right-3 text-gray-500 sm:text-sm pointer-events-none">
                                  kg.
                                </span>
                              </div>
                              {submitted && errors.weight && (
                                <p className="text-red-500 text-sm mt-1">{errors.weight}</p>
                              )}
                            </div>
                          </div>
                          <div className="sm:col-span-3">
                            <div className="mt-2">
                              <input
                                required
                                type="number"
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
                        <button onClick={validateForm} type="submit" className="w-1/2 h-fit align-center bg-indigo-100 rounded-[40px] text-neutral-800 text-base font-bold font-roboto py-2 px-4">
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
