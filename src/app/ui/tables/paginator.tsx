// SearchBar.tsx
'use client';
import React, { useState } from 'react';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';

export default function Paginator ({totalPages}: {totalPages: number}){
  const [currentPage, setPage] = useState(1);

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handlePageNumber = (increase: boolean) => {
    if (increase){
        setPage(prev => prev + 1)
    } else {
        setPage(prev => prev - 1)
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
              onClick={() => handlePageNumber(true)}
            >
              Previous
            </button>
          )}
          <span>Page {currentPage}</span>
          {currentPage < totalPages && (
            <button
              className="bg-violet-600 hover:bg-violet-500 py-2 px-4 rounded-full text-white"
              onClick={() => handlePageNumber(false)}
            >
              Next
            </button>
          )}
        </div>
  );
};
