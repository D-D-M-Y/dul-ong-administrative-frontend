// SearchBar.tsx
'use client';
import React, { useState } from 'react';
import { CiSearch } from "react-icons/ci";
import { useSearchParams, usePathname, useRouter } from 'next/navigation';

export default function SearchBar (){
  const [inputValue, setInputValue] = useState('');

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = () => {
    const params = new URLSearchParams(searchParams);
    if (inputValue && inputValue != ''){
      params.set('query', inputValue);
    } else {
      params.delete('query')
    }
    replace(`${pathname}?${params.toString()}`)



  };
  const handleClear = () => {
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="searchbar font-ptsans">
      <CiSearch size={24} className='pr-2' />
      <input
        type="text"
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Search by Name"
        className="search-input"
        defaultValue={searchParams.get('query')?.toString()}
      />
      <button
        className="bg-violet-600 hover:bg-violet-500 py-2 px-4 rounded-full text-white ml-5"
        onClick={handleSearch}
      >
        Search
      </button>
      <button
        className="bg-violet-600 hover:bg-violet-500 py-2 px-4 rounded-full text-white ml-5"
        onClick={handleClear}
      >
        Clear
      </button>
    </div>
  );
};
