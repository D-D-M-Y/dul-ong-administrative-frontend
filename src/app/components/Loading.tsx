import React from "react";

const LoadingSpinner = () => (
  <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
    <svg
      className="animate-spin size-10 text-[#6F42C1]"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v2a6 6 0 100 12v2a8 8 0 01-8-8z"
      />
    </svg>
  </div>
);

export default LoadingSpinner;