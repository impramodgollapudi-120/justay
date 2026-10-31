import React from 'react';
import { Search } from 'lucide-react';

export const SearchBar = ({ value, onChange, onSearch, placeholder = 'Search luxury hotels, resorts or palaces...' }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) onSearch();
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-full">
      <Search className="w-5 h-5 text-red-900/40 absolute left-4 top-3.5" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-12 pr-28 py-3 bg-white border border-red-900/10 rounded-2xl text-sm font-semibold text-red-950 focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-600/20 shadow-xs ring-1 ring-red-950/5"
      />
      <button
        type="submit"
        className="absolute right-2 top-2 px-4 py-1.5 bg-red-600 hover:bg-red-700 active:bg-red-800 text-white text-xs font-bold rounded-xl transition cursor-pointer shadow-xs"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;
