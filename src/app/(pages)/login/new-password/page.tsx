'use client'

import React, { useState } from 'react';
import Link from 'next/link';

interface PasswordState {
  isValidPassword: boolean;
  errorMessage: string;
  confirmPassword: string;
  password: string; // Add password property to the interface
}

export default function Page() {
  const [passwordState, setPasswordState] = useState<PasswordState>({
    isValidPassword: false,
    errorMessage: '',
    confirmPassword: '',
    password: '', // Initialize password with an empty string
  });

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;

    // Update state based on password field (new or confirm)
    setPasswordState((prevState) => ({
      ...prevState,
      [id]: value,
      isValidPassword: prevState.password === value && value.length >= 6, // Check password match and format
      errorMessage:
        value.length >= 6 && prevState.password === value
          ? ''
          : 'Passwords do not match or do not meet requirements.',
    }));
  };

  return (
      <div className="overflow-hidden bg-white w-full h-screen p-10 flex flex-col flex-grow bg-white justify-center items-center"> {/* Grid container with two columns */}
          <img src="/dulong.svg" className="w-1/6" />
          <h1 className="font-bold roboto pb-4">Enter new password.</h1>
          <p className="text-textC pt-sans font-normal text-m w-1/3 text-center">Password must contain one uppercase letter, one number, and be atleast 6 characters long.</p>

          <div className="flex flex-col pt-4 space-y-2 w-1/3">
        <input
          type="password"
          id="password"
          className="border rounded-lg px-2 py-4 text-textC text-m font-ptsans"
          placeholder="New Password"
          onChange={handlePasswordChange}
        />
        <input
          type="password"
          id="confirmPassword"
          className="border rounded-lg px-2 py-4 text-textC text-m font-ptsans"
          placeholder="Confirm Password"
          onChange={handlePasswordChange}
        />
        {/* Display error message conditionally */}
        { !passwordState.isValidPassword && <span className="text-red-500 text-sm">{passwordState.errorMessage}</span> }
        <Link href="/login">
          <button
            className="border rounded-lg p2 w-full bg-indigo-100 rounded-3xl text-center font-bold font-roboto py-3"
            disabled={!passwordState.isValidPassword} // Disable button if passwords don't match or format is invalid
          >
            Change Password
          </button>
        </Link>
      </div>
    </div>
  );
}
