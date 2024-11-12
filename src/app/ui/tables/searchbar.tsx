// SearchBar.tsx
import React, { useState } from 'react';
import { CiSearch } from "react-icons/ci";

interface SearchBarProps {
  setSearchQuery: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ setSearchQuery }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSearch = () => {
    setSearchQuery(inputValue);
  };
  const handleClear = () => {
    setSearchQuery('');
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

export default SearchBar;
