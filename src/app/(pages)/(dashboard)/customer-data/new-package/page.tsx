"use client";
import React, { useState, useEffect, useRef, FC } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import LoadingSpinner from "@/app/components/Loading";

const DynamicMapComponent = dynamic(
  () => import("@/app/components/Maps/NewPackageMap"),
  { ssr: false }
);

interface FormValues {
  customerName: string;
  city: string;
  barangay: string;
  streetAddress: string;
  zip: number | null;
  latitude: number | null;
  longitude: number | null;
  packageName: string;
  amount: number | null;
  packageSize: string;
  customLength?: number | null;
  customWidth?: number | null;
  customHeight?: number | null;
  customWeight?: number | null;
  paymentMethod: string;
  paymentAmount: number | null;
  date: string;
  preferredDelivery: boolean;
}
interface FormErrors {
  customerName?: string;
  city?: string;
  barangay?: string;
  streetAddress?: string;
  zip?: number | null;
  latitude?: number | null;
  longitude?: number | null;
  packageName?: string;
  amount?: number | null;
  packageSize?: string;
  customLength?: number | null;
  customWidth?: number | null;
  customHeight?: number | null;
  customWeight?: number | null;
  paymentMethod?: string;
  paymentAmount?: number | null;
  date?: string;
  preferredDelivery?: boolean;
}

type PackageSize = {
  pk: number;
  size_type: string;
  length: number;
  width: number;
  height: number;
  weight: number;
};

export default function Page() {
  const [markerCoords, setMarkerCoords] = useState<number[] | null>(null);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [packageSizes, setPackageSizes] = useState<PackageSize[]>([]);
  const [loading, setLoading] = useState(false);
  const [formValues, setFormValues] = useState<FormValues>({
    customerName: "",
    city: "",
    barangay: "",
    streetAddress: "",
    zip: null,
    latitude: null,
    longitude: null,
    packageName: "",
    amount: null,
    packageSize: "",
    customLength: null,
    customWidth: null,
    customHeight: null,
    customWeight: null,
    paymentMethod: "",
    paymentAmount: null,
    date: "",
    preferredDelivery: true || false,
  });

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/packages/sizing`)
      .then((response) => response.json())
      .then((data: PackageSize[]) => setPackageSizes(data))
      .catch((error) => console.error("Error fetching package sizes:", error));
  }, []);

  useEffect(() => {
    if (
      markerCoords &&
      (formValues.latitude !== markerCoords[0] ||
        formValues.longitude !== markerCoords[1])
    ) {
      setFormValues((prev) => ({
        ...prev,
        latitude: markerCoords[0],
        longitude: markerCoords[1],
      }));
    }

    if (submitted) {
      validateForm();
    }
  }, [formValues, markerCoords]);

  // Validate form
  const validateForm = async () => {
    setLoading(true);
    let errors: { [key: string]: string } = {};
    if (!formValues.customerName) errors.customerName = "Name is required.";
    if (!formValues.city) errors.city = "City is required.";
    if (!formValues.barangay) errors.barangay = "Barangay is required.";
    if (!formValues.streetAddress)
      errors.streetAddress = "Street Address is required.";
    if (!formValues.zip) errors.zip = "ZIP Code is required.";
    if (!formValues.latitude) errors.latitude = "Latitude is required.";
    if (!formValues.longitude) errors.longitude = "Longitude is required.";
    if (!formValues.packageName)
      errors.packageName = "Package Name is required.";
    if (!formValues.packageSize)
      errors.packageSize = "Package Size is required.";
    if (formValues.packageSize === "Custom") {
      if (!formValues.customLength) errors.customLength = "Length is required.";
      if (!formValues.customWidth) errors.customWidth = "Width is required.";
      if (!formValues.customHeight) errors.customHeight = "Height is required.";
      if (!formValues.customWeight) errors.customWeight = "Weight is required.";
    }
    if (!formValues.paymentMethod)
      errors.paymentMethod = "Payment Method is required.";
    if (!formValues.paymentAmount)
      errors.paymentAmount = "Payment Amount is required.";
    if (!formValues.date) errors.date = "Date is required.";
    if (!formValues.preferredDelivery)
      errors.preferredDelivery = "Preferred Delivery is required.";

    setErrors(errors);
    const isValid = Object.keys(errors).length === 0;
    setSubmitted(true);

    if (isValid) {
      try {
        // Generate a unique ID for custom package size
        const packageSizeId =
          formValues.packageSize === "Custom"
            ? Date.now()
            : formValues.packageSize;

        // Prepare customer data with either selected or custom package size ID
        const customerData = {
          ...formValues,
          packageSize: packageSizeId,
          ...(formValues.packageSize === "Custom" && {
            id: packageSizeId,
            size_type: "Custom",
            height: formValues.customHeight,
            length: formValues.customLength,
            width: formValues.customWidth,
            weight: formValues.customWeight,
          }),
        };

        // Post data to the add_customer endpoint
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/add_customer`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(customerData),
          }
        );

        if (response.ok) {
          console.log("Form submitted successfully!");
          alert("Customer added successfully!");
          // Clear the form after successful submission
          setFormValues({
            customerName: "",
            city: "",
            barangay: "",
            streetAddress: "",
            zip: null,
            latitude: null,
            longitude: null,
            packageName: "",
            amount: null,
            packageSize: "",
            customLength: null,
            customWidth: null,
            customHeight: null,
            customWeight: null,
            paymentMethod: "",
            paymentAmount: null,
            date: "",
            preferredDelivery: false,
          });
          setErrors({});
          setLoading(false);
          setSubmitted(false);
        } else {
          console.log("id: ", packageSizeId);
          console.log("size: ", formValues.packageSize);
          console.log("height: ", formValues.customHeight);
          console.log("width: ", formValues.customWidth);
          console.log("length: ", formValues.customLength);
          console.log("weight: ", formValues.customWeight);
          console.error("Failed to submit form:", await response.text());
          setLoading(false);
          alert("Failed to add customer. Please try again.");
        }
      } catch (error) {
        setLoading(false);
        console.error("Error submitting form:", error);
        alert("An error occurred while adding the customer. Please try again.");
      }
    } else {
      setLoading(false);
      console.log("Form has errors. Please correct them.");
      alert(
        "The form has blank fields. Please complete the form before submitting."
      );
    }
  };

  const handleClear = () => {
    setFormValues({
      customerName: "",
      city: "",
      barangay: "",
      streetAddress: "",
      zip: null,
      latitude: null,
      longitude: null,
      packageName: "",
      amount: null,
      packageSize: "",
      paymentMethod: "",
      paymentAmount: null,
      date: "",
      preferredDelivery: true || false,
    });
    setErrors({});
    setSubmitted(false);
  };

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (formValues.customerName.length > 1) {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/customer_data/${formValues.customerName}`
          );
          const data = await response.json();
          const filteredSuggestions = data
            .filter((customer: { name: string }) =>
              customer.name
                .toLowerCase()
                .includes(formValues.customerName.toLowerCase())
            )
            .map((customer: { name: string }) => customer.name);

          setSuggestions(filteredSuggestions);
          setShowSuggestions(filteredSuggestions.length > 0);
        } catch (error) {
          console.error("Error fetching suggestions:", error);
        }
      } else {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    };

    fetchSuggestions();
  }, [formValues.customerName]);

  const handleSuggestionClick = (suggestedName: string) => {
    setFormValues((prev) => ({ ...prev, customerName: suggestedName }));
    setShowSuggestions(false); // Hide suggestions after selection
  };

  return (
    <>
      {loading && <LoadingSpinner />}

      <div>
        {/* Header */}
        <div>
          <h1 className="font-bold font-roboto">Customer Data</h1>

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
          <div className="flex flex-col lg:flex-row font-ptsans">
            <div className="w-1/3 h-fit flex-none">
              <div className="position-relative bg-white rounded-bl-lg">
                <div className="p-5">
                  <div className="table">
                    <div className="p-5">
                      <div className="pb-9">
                        <div className="flex items-center justify-start w-full">
                          <h2 className="text-start font-semibold leading-7 text-gray-900 flex-grow">
                            Customer Data
                          </h2>
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
                                placeholder="Name"
                                value={formValues.customerName}
                                onChange={(e) =>
                                  setFormValues({
                                    ...formValues,
                                    customerName: e.target.value,
                                  })
                                }
                              />
                              {submitted && errors.customerName && (
                                <p className="text-red-500">
                                  {errors.customerName}
                                </p>
                              )}
                              {showSuggestions && (
                                <div className="absolute z-10 bg-white border border-gray-300 rounded-md shadow-md w-fit mt-1">
                                  {suggestions.map((suggestion, index) => (
                                    <div
                                      key={index}
                                      onClick={() =>
                                        handleSuggestionClick(suggestion)
                                      }
                                      className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                                    >
                                      {suggestion}
                                    </div>
                                  ))}
                                </div>
                              )}
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
                                placeholder="City/Municipality"
                                value={formValues.city}
                                onChange={(e) =>
                                  setFormValues({
                                    ...formValues,
                                    city: e.target.value,
                                  })
                                }
                              />
                              {submitted && errors.city && (
                                <p className="text-red-500">{errors.city}</p>
                              )}
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
                                placeholder="Barangay"
                                value={formValues.barangay}
                                onChange={(e) =>
                                  setFormValues({
                                    ...formValues,
                                    barangay: e.target.value,
                                  })
                                }
                              />
                              {submitted && errors.barangay && (
                                <p className="text-red-500">
                                  {errors.barangay}
                                </p>
                              )}
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
                                placeholder="Street Address"
                                value={formValues.streetAddress}
                                onChange={(e) =>
                                  setFormValues({
                                    ...formValues,
                                    streetAddress: e.target.value,
                                  })
                                }
                              />
                              {submitted && errors.streetAddress && (
                                <p className="text-red-500">
                                  {errors.streetAddress}
                                </p>
                              )}
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
                                placeholder="Zip Code"
                                value={formValues.zip ?? ""}
                                onChange={(e) =>
                                  setFormValues({
                                    ...formValues,
                                    zip: parseInt(e.target.value),
                                  })
                                }
                              />
                              {submitted && errors.zip && (
                                <p className="text-red-500">{errors.zip}</p>
                              )}
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
                                placeholder="Latitude"
                                value={formValues.latitude ?? ""} // Access latitude from coordinates
                                readOnly
                                onChange={(e) =>
                                  setFormValues({
                                    ...formValues,
                                    latitude: parseFloat(e.target.value),
                                  })
                                }
                              />
                              {submitted && errors.latitude && (
                                <p className="text-red-500">
                                  {errors.latitude}
                                </p>
                              )}
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
                                placeholder="Longitude"
                                value={formValues.longitude ?? ""} // Access longitude from coordinates
                                readOnly
                                onChange={(e) =>
                                  setFormValues({
                                    ...formValues,
                                    longitude: parseFloat(e.target.value),
                                  })
                                }
                              />
                              {submitted && errors.longitude && (
                                <p className="text-red-500">
                                  {errors.longitude}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                        <h2 className="mt-5 text-base font-semibold leading-7 text-gray-900">
                          Package Details
                        </h2>
                        <div className="mt-2 grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-6">
                          <div className="sm:col-span-full">
                            <div className="mt-2">
                              <input
                                type="text"
                                name="packageName"
                                id="packageName"
                                autoComplete="packageName"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-5"
                                placeholder="Package Name"
                                value={formValues.packageName}
                                onChange={(e) =>
                                  setFormValues({
                                    ...formValues,
                                    packageName: e.target.value,
                                  })
                                }
                              />
                              {submitted && errors.packageName && (
                                <p className="text-red-500">
                                  {errors.packageName}
                                </p>
                              )}
                            </div>
                          </div>
                          <div className="sm:col-span-3">
                            <div className="mt-2">
                              <input
                                type="number"
                                name="amount"
                                id="amount"
                                autoComplete="amount"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-5"
                                placeholder="Amount of Items"
                                value={formValues.amount ?? ""}
                                onChange={(e) =>
                                  setFormValues({
                                    ...formValues,
                                    amount: parseInt(e.target.value),
                                  })
                                }
                              />
                              {submitted && errors.packageName && (
                                <p className="text-red-500">
                                  {errors.packageName}
                                </p>
                              )}
                            </div>
                          </div>
                          <div className="sm:col-span-3">
                            <div className="mt-2">
                              <select
                                required
                                name="packageSize"
                                id="packageSize"
                                autoComplete="packageSize"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-5"
                                style={{ height: "2.3rem" }}
                                value={formValues.packageSize ?? ""}
                                onChange={(e) => {
                                  const selectedValue = e.target.value;
                                  setFormValues({
                                    ...formValues,
                                    packageSize: selectedValue,
                                  });
                                  if (selectedValue !== "Custom") {
                                    setFormValues((prev) => ({
                                      ...prev,
                                      customLength: null,
                                      customWidth: null,
                                      customHeight: null,
                                      customWeight: null,
                                    }));
                                  }
                                }}
                              >
                                <option
                                  defaultValue=""
                                  hidden
                                  style={{ color: "#999" }}
                                >
                                  Package Size
                                </option>
                                {packageSizes.map((size) => (
                                  <option key={size.pk} value={size.pk}>
                                    {`${size.size_type}: ${size.length} x ${size.width} x ${size.height} - ${size.weight}kg`}
                                  </option>
                                ))}
                                <option value="Custom">Custom</option>
                              </select>
                              {submitted && errors.packageSize && (
                                <p className="text-red-500">
                                  {errors.packageSize}
                                </p>
                              )}
                            </div>
                          </div>

                          <div className="sm:col-span-full">
                            <div className="mt-2">
                              {formValues.packageSize === "Custom" && (
                                <div className="mt-4">
                                  <div className="flex items-center space-x-4">
                                    <input
                                      type="number"
                                      placeholder="Height (cm)"
                                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-5"
                                      value={formValues.customHeight ?? ""}
                                      onChange={(e) =>
                                        setFormValues({
                                          ...formValues,
                                          customHeight: parseFloat(
                                            e.target.value
                                          ),
                                        })
                                      }
                                    />
                                    {submitted && errors.customHeight && (
                                      <p className="text-red-500">
                                        {errors.customHeight}
                                      </p>
                                    )}
                                    <input
                                      type="number"
                                      placeholder="Length (cm)"
                                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-5"
                                      value={formValues.customLength ?? ""}
                                      onChange={(e) =>
                                        setFormValues({
                                          ...formValues,
                                          customLength: parseFloat(
                                            e.target.value
                                          ),
                                        })
                                      }
                                    />
                                    {submitted && errors.customLength && (
                                      <p className="text-red-500">
                                        {errors.customLength}
                                      </p>
                                    )}
                                    <input
                                      type="number"
                                      placeholder="Width (cm)"
                                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-5"
                                      value={formValues.customWidth ?? ""}
                                      onChange={(e) =>
                                        setFormValues({
                                          ...formValues,
                                          customWidth: parseFloat(
                                            e.target.value
                                          ),
                                        })
                                      }
                                    />
                                    {submitted && errors.customWidth && (
                                      <p className="text-red-500">
                                        {errors.customWidth}
                                      </p>
                                    )}
                                  </div>
                                  <div className="mt-3">
                                    <input
                                      type="number"
                                      placeholder="Weight (kg)"
                                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-5"
                                      value={formValues.customWeight ?? ""}
                                      onChange={(e) =>
                                        setFormValues({
                                          ...formValues,
                                          customWeight: parseFloat(
                                            e.target.value
                                          ),
                                        })
                                      }
                                    />
                                    {submitted && errors.customWeight && (
                                      <p className="text-red-500">
                                        {errors.customWeight}
                                      </p>
                                    )}
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                        <h2 className="mt-5 text-base font-semibold leading-7 text-gray-900">
                          Transaction Details
                        </h2>
                        <div className="mt-2 grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-6">
                          <div className="sm:col-span-3">
                            <div className="mt-2">
                              <select
                                required
                                name="paymentMethod"
                                id="paymentMethod"
                                autoComplete="paymentMethod"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-5"
                                style={{ height: "2.3rem" }}
                                value={formValues.paymentMethod}
                                onChange={(e) =>
                                  setFormValues({
                                    ...formValues,
                                    paymentMethod: e.target.value,
                                  })
                                }
                              >
                                <option
                                  defaultValue=""
                                  hidden
                                  style={{ color: "#999" }}
                                >
                                  Payment Method
                                </option>
                                <option value="CAS">Cash</option>
                                <option value="CAR">Card</option>
                                <option value="GCA">GCASH</option>
                              </select>
                              {submitted && errors.paymentMethod && (
                                <p className="text-red-500">
                                  {errors.paymentMethod}
                                </p>
                              )}
                            </div>
                          </div>
                          <div className="sm:col-span-3">
                            <div className="mt-2">
                              <input
                                type="number"
                                name="paymentAmount"
                                id="paymentAmount"
                                autoComplete="paymentAmount"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-5"
                                placeholder="Payment Amount"
                                value={formValues.paymentAmount ?? ""}
                                onChange={(e) =>
                                  setFormValues({
                                    ...formValues,
                                    paymentAmount: parseFloat(e.target.value),
                                  })
                                }
                              />
                              {submitted && errors.paymentAmount && (
                                <p className="text-red-500">
                                  {errors.paymentAmount}
                                </p>
                              )}
                            </div>
                          </div>
                          <div className="sm:col-span-3">
                            <div className="mt-2">
                              <input
                                type="date"
                                name="date"
                                id="date"
                                autoComplete="date"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-5"
                                placeholder="Date"
                                value={formValues.date}
                                onChange={(e) =>
                                  setFormValues({
                                    ...formValues,
                                    date: e.target.value,
                                  })
                                }
                              />
                              {submitted && errors.date && (
                                <p className="text-red-500">{errors.date}</p>
                              )}
                            </div>
                          </div>
                          <div className="sm:col-span-3">
                            <div className="mt-2">
                              <select
                                name="preferredDelivery"
                                id="preferredDelivery"
                                autoComplete="preferredDelivery"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-5"
                                style={{ height: "2.3rem" }}
                                value={
                                  formValues.preferredDelivery
                                    ? "true"
                                    : "false"
                                }
                                onChange={(e) =>
                                  setFormValues({
                                    ...formValues,
                                    preferredDelivery:
                                      e.target.value === "true",
                                  })
                                }
                              >
                                <option
                                  defaultValue={"Preferred Delivery"}
                                  hidden
                                  style={{ color: "#999" }}
                                >
                                  Preferred Delivery
                                </option>
                                <option
                                  value="true"
                                  style={{ color: "text-gray-900" }}
                                >
                                  Priority Shipping
                                </option>
                                <option
                                  value="false"
                                  style={{ color: "text-gray-900" }}
                                >
                                  Economy Shipping
                                </option>
                              </select>
                              {submitted && errors.preferredDelivery && (
                                <p className="text-red-500">
                                  {errors.preferredDelivery}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="flex justify-center items-center">
                          {/* Submit Button */}
                          <button
                            onClick={validateForm}
                            type="submit"
                            className="w-1/2 h-fit align-center bg-indigo-100 rounded-[40px] text-neutral-800 text-base font-bold font-roboto py-2 px-4 mt-10"
                          >
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
            <div className="flex-1 h-[50vh] lg:h-auto lg:w-2/3">
              <DynamicMapComponent
                onMarkerChange={(coords) => setMarkerCoords(coords)}
                width="100%"
                height="100%"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
