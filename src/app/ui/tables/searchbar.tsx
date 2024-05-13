import React from 'react';
import { CiSearch } from "react-icons/ci";


const SearchBar: React.FC = () => {
  return (
    <div className="searchbar">
        <CiSearch size={24} className='pr-2'/>
      <input
        type="text"
        placeholder="Search..."
      />
    </div>
  );
};

export default SearchBar;
