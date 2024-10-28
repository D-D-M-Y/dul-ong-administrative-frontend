import React from 'react';
import { CiSearch } from "react-icons/ci";

interface SearchBarProps {
  query: string;
  setQuery: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ query, setQuery }) => {
  return (
    <div className="searchbar font-ptsans">
      <CiSearch size={24} className='pr-2' />
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)} // Update the query on input change
      />
    </div>
  );
};

export default SearchBar;