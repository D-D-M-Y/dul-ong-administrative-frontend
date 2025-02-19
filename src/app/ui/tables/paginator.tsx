// SearchBar.tsx
'use client';
import React, { useState } from 'react';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';

export default function Paginator ({totalPages, currentPage}: {totalPages: number, currentPage: number}){
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handlePageNumber = (increase: boolean) => {
    if (increase){
        currentPage += 1;
    } else {
        currentPage -= 1
    }
    const params = new URLSearchParams(searchParams);
    if (currentPage){
      params.set('page', currentPage.toString());
    } else {
      params.delete('page')
    }

    if (pathname.indexOf('?') > -1){
        replace(`${pathname}&${params.toString()}`)
    } else{
        replace(`${pathname}?${params.toString()}`)
    }



  };
  return (
    <div className="pagination flex justify-between mt-4">
          {currentPage > 1 && (
            <button
              className="bg-violet-600 hover:bg-violet-500 py-2 px-4 rounded-full text-white"
              onClick={() => handlePageNumber(false)}
            >
              Previous
            </button>
          )}
          <span>Page {currentPage}</span>
          {currentPage < totalPages && (
            <button
              className="bg-violet-600 hover:bg-violet-500 py-2 px-4 rounded-full text-white"
              onClick={() => handlePageNumber(true)}
            >
              Next
            </button>
          )}
        </div>
  );
};
