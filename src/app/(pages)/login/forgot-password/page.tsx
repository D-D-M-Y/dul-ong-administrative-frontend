'use client'

import React, { useState } from 'react';
import Link from 'next/link';

interface EmailState {
  isValidEmail: boolean;
  errorMessage: string;
}

export default function Page() {
  const [emailState, setEmailState] = useState<EmailState>({
    isValidEmail: false, // Initial state for disabled button
    errorMessage: '',
  });

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const email = event.target.value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email format regex

    // Check email validity using regex
    const isValid = emailRegex.test(email);
    setEmailState({ isValidEmail: isValid, errorMessage: isValid ? '' : 'Please enter a valid email address.' });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent default form submission behavior

    if (!emailState.isValidEmail) {
      // Display error message if email is empty
      setEmailState({ ...emailState, errorMessage: 'Please enter your email address.' });
      return; // Prevent further code execution
    }
  };


  return (
      <div className="overflow-hidden bg-white w-full h-screen p-10 flex flex-col flex-grow bg-white justify-center items-center"> {/* Grid container with two columns */}
          <img src="/dulong.svg" className="w-1/6" />
          <h1 className="font-bold roboto pb-4">Forgot your password?</h1>
          <p className="text-textC pt-sans font-normal text-m w-1/3 text-center">Enter the email address associated with your account 
          and we'll send you a link to reset your password.</p>

          <div className="flex flex-col pt-4 space-y-2 w-1/3">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            id="email"
            className="w-full border rounded-lg px-2 py-4 text-textC text-lg font-ptsans"
            placeholder="Email"
            onChange={handleEmailChange}
          />
          {/* Display error message conditionally */}
          { !emailState.isValidEmail && <span className="text-red-500 text-sm">{emailState.errorMessage}</span> }
          <div className = "py-2"></div>
          <Link href ="/login/new-password"><button
            className="border rounded-lg p2 w-full bg-indigo-100 rounded-3xl text-center font-bold font-roboto py-3"
            type="submit"
            disabled={!emailState.isValidEmail} // Button initially disabled and updates on change
          >
            Continue
          </button></Link>
        </form>
      </div>
    </div>
  );
}